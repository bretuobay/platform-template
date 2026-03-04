import type { AuthIdentity } from './auth';

export interface TenantSession<TTenantId extends string = string, TRole extends string = string> {
  id: string;
  tenantId: TTenantId;
  role: TRole;
  email: string;
}

export interface TenantResolver<TTenantId extends string = string, TRole extends string = string> {
  findByAuthUserId(authUserId: string): Promise<TenantSession<TTenantId, TRole> | null>;
  findByEmail(email: string): Promise<TenantSession<TTenantId, TRole> | null>;
  provision?(identity: AuthIdentity): Promise<TenantSession<TTenantId, TRole> | null>;
}

export interface DevelopmentBypassOptions<TTenantId extends string = string, TRole extends string = string> {
  enabledFlag?: string;
  userIdEnvVar?: string;
  tenantIdEnvVar?: string;
  roleEnvVar?: string;
  emailEnvVar?: string;
  defaultUserId?: string;
  defaultTenantId?: TTenantId;
  defaultRole?: TRole;
  defaultEmail?: string;
}

export interface MultiTenantSessionManagerOptions<TTenantId extends string = string, TRole extends string = string> {
  resolver: TenantResolver<TTenantId, TRole>;
  roles?: readonly TRole[];
  ownerRoles?: readonly TRole[];
  identityProvider?: () => Promise<AuthIdentity | null>;
  development?: DevelopmentBypassOptions<TTenantId, TRole>;
}

export interface MultiTenantSessionManager<TTenantId extends string = string, TRole extends string = string> {
  getSession(): Promise<TenantSession<TTenantId, TRole> | null>;
  requireAuth(): Promise<TenantSession<TTenantId, TRole>>;
  requireRole(roles: readonly TRole[]): Promise<TenantSession<TTenantId, TRole>>;
}

async function getDefaultNeonAuthIdentity(): Promise<AuthIdentity | null> {
  const { getNeonAuthIdentity } = await import('./auth');
  return getNeonAuthIdentity();
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isTenantSession<TTenantId extends string = string, TRole extends string = string>(
  value: unknown,
): value is TenantSession<TTenantId, TRole> {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybeSession = value as Partial<TenantSession<TTenantId, TRole>>;
  return (
    isString(maybeSession.id) &&
    isString(maybeSession.tenantId) &&
    isString(maybeSession.role) &&
    isString(maybeSession.email)
  );
}

function normalizeRole<TRole extends string>(
  rawRole: string | undefined,
  defaultRole: TRole,
  allowedRoles?: ReadonlySet<TRole>,
): TRole {
  if (!rawRole) {
    return defaultRole;
  }

  if (!allowedRoles || allowedRoles.size === 0) {
    return rawRole as TRole;
  }

  return allowedRoles.has(rawRole as TRole) ? (rawRole as TRole) : defaultRole;
}

function resolveDevelopmentDefaultRole<TTenantId extends string = string, TRole extends string = string>(
  options: MultiTenantSessionManagerOptions<TTenantId, TRole>,
  allowedRoles?: ReadonlySet<TRole>,
): TRole {
  const configuredDefaultRole = options.development?.defaultRole;
  if (configuredDefaultRole) {
    return normalizeRole(configuredDefaultRole, configuredDefaultRole, allowedRoles);
  }

  const firstAllowedRole = options.roles?.[0];
  if (firstAllowedRole) {
    return firstAllowedRole;
  }

  return 'admin' as TRole;
}

function resolveDevelopmentSession<TTenantId extends string = string, TRole extends string = string>(
  options: MultiTenantSessionManagerOptions<TTenantId, TRole>,
  allowedRoles?: ReadonlySet<TRole>,
): TenantSession<TTenantId, TRole> | null {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const bypassEnabledFlag = options.development?.enabledFlag ?? 'AUTH_DEV_BYPASS';
  if (process.env[bypassEnabledFlag] !== 'true') {
    return null;
  }

  const defaultRole = resolveDevelopmentDefaultRole(options, allowedRoles);

  const roleEnvVar = options.development?.roleEnvVar ?? 'DEV_AUTH_ROLE';
  const userIdEnvVar = options.development?.userIdEnvVar ?? 'DEV_AUTH_USER_ID';
  const tenantIdEnvVar = options.development?.tenantIdEnvVar ?? 'DEV_AUTH_TENANT_ID';
  const emailEnvVar = options.development?.emailEnvVar ?? 'DEV_AUTH_EMAIL';

  const role = normalizeRole(process.env[roleEnvVar], defaultRole, allowedRoles);
  const id = process.env[userIdEnvVar] ?? options.development?.defaultUserId ?? 'dev-user';
  const tenantId = (process.env[tenantIdEnvVar] ?? options.development?.defaultTenantId ?? 'dev-tenant') as TTenantId;
  const email = process.env[emailEnvVar] ?? options.development?.defaultEmail ?? 'dev-user@example.local';

  return { id, tenantId, role, email };
}

export function createMultiTenantSessionManager<TTenantId extends string = string, TRole extends string = string>(
  options: MultiTenantSessionManagerOptions<TTenantId, TRole>,
): MultiTenantSessionManager<TTenantId, TRole> {
  const allowedRoles = options.roles ? new Set(options.roles) : undefined;
  const ownerRoles = new Set(options.ownerRoles ?? []);
  const identityProvider = options.identityProvider ?? getDefaultNeonAuthIdentity;

  async function getSession(): Promise<TenantSession<TTenantId, TRole> | null> {
    const devSession = resolveDevelopmentSession(options, allowedRoles);
    if (devSession) {
      return devSession;
    }

    const identity = await identityProvider();
    if (!identity) {
      return devSession;
    }

    const userById = await options.resolver.findByAuthUserId(identity.id);
    if (isTenantSession<TTenantId, TRole>(userById)) {
      return userById;
    }

    const userByEmail = await options.resolver.findByEmail(identity.email);
    if (isTenantSession<TTenantId, TRole>(userByEmail)) {
      return userByEmail;
    }

    if (options.resolver.provision) {
      const provisionedUser = await options.resolver.provision(identity);
      if (isTenantSession<TTenantId, TRole>(provisionedUser)) {
        return provisionedUser;
      }
    }

    return devSession;
  }

  async function requireAuth(): Promise<TenantSession<TTenantId, TRole>> {
    const session = await getSession();
    if (!session) {
      throw new Error('Unauthorized');
    }
    return session;
  }

  async function requireRole(roles: readonly TRole[]): Promise<TenantSession<TTenantId, TRole>> {
    const session = await requireAuth();
    if (ownerRoles.has(session.role)) {
      return session;
    }
    if (!roles.includes(session.role)) {
      throw new Error('Forbidden');
    }
    return session;
  }

  return {
    getSession,
    requireAuth,
    requireRole,
  };
}

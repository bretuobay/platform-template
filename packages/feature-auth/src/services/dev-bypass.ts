import type { LocalDevBypassState } from '../model/types';

type EnvMap = Record<string, string | undefined>;

export interface LocalDevBypassOptions {
  enabledFlag?: string;
  nodeEnvVar?: string;
  userIdEnvVar?: string;
  tenantIdEnvVar?: string;
  roleEnvVar?: string;
  emailEnvVar?: string;
  defaultUserId?: string;
  defaultTenantId?: string;
  defaultRole?: string;
  defaultEmail?: string;
}

const DEFAULT_OPTIONS = {
  enabledFlag: 'AUTH_DEV_BYPASS',
  nodeEnvVar: 'NODE_ENV',
  userIdEnvVar: 'DEV_AUTH_USER_ID',
  tenantIdEnvVar: 'DEV_AUTH_TENANT_ID',
  roleEnvVar: 'DEV_AUTH_ROLE',
  emailEnvVar: 'DEV_AUTH_EMAIL',
  defaultUserId: 'dev-user',
  defaultTenantId: 'dev-tenant',
  defaultRole: 'admin',
  defaultEmail: 'dev-user@example.local',
} satisfies Required<LocalDevBypassOptions>;

export function getLocalDevBypassState(
  options: LocalDevBypassOptions = {},
  env: EnvMap = process.env as EnvMap,
): LocalDevBypassState | null {
  const config = { ...DEFAULT_OPTIONS, ...options };

  if (env[config.nodeEnvVar] === 'production') {
    return null;
  }

  if (env[config.enabledFlag] !== 'true') {
    return null;
  }

  return {
    enabled: true,
    userId: env[config.userIdEnvVar] ?? config.defaultUserId,
    tenantId: env[config.tenantIdEnvVar] ?? config.defaultTenantId,
    role: env[config.roleEnvVar] ?? config.defaultRole,
    email: env[config.emailEnvVar] ?? config.defaultEmail,
  };
}

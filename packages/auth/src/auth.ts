import { createNeonAuth } from '@neondatabase/auth/next/server';

import { getAuthEnv } from './config';

type NeonAuth = ReturnType<typeof createNeonAuth>;

export interface AuthIdentity {
  id: string;
  email: string;
  name?: string | null;
}

let neonAuthServer: NeonAuth | undefined;

function getAuthServer(): NeonAuth {
  if (!neonAuthServer) {
    const { NEON_AUTH_BASE_URL, NEON_AUTH_COOKIE_SECRET } = getAuthEnv();
    if (!NEON_AUTH_COOKIE_SECRET) {
      throw new Error('NEON_AUTH_COOKIE_SECRET is required for server runtime');
    }

    neonAuthServer = createNeonAuth({
      baseUrl: NEON_AUTH_BASE_URL,
      cookies: { secret: NEON_AUTH_COOKIE_SECRET },
    });
  }

  return neonAuthServer;
}

export const authServer: NeonAuth = new Proxy({} as NeonAuth, {
  get(_target, prop) {
    return getAuthServer()[prop as keyof NeonAuth];
  },
});

export const auth = authServer;

type AuthHandler = ReturnType<NeonAuth['handler']>;
let neonAuthHandler: AuthHandler | undefined;

function getAuthHandler(): AuthHandler {
  if (!neonAuthHandler) {
    neonAuthHandler = getAuthServer().handler();
  }
  return neonAuthHandler;
}

export const authHandler: AuthHandler = new Proxy({} as AuthHandler, {
  get(_target, prop) {
    return getAuthHandler()[prop as keyof AuthHandler];
  },
});

function isAuthIdentity(value: unknown): value is AuthIdentity {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybeUser = value as { id?: unknown; email?: unknown; name?: unknown };
  if (maybeUser.name !== undefined && maybeUser.name !== null && typeof maybeUser.name !== 'string') {
    return false;
  }

  return typeof maybeUser.id === 'string' && typeof maybeUser.email === 'string';
}

export function getAuthIdentity(sessionData: unknown): AuthIdentity | null {
  if (!sessionData || typeof sessionData !== 'object') {
    return null;
  }
  const maybeSessionData = sessionData as { user?: unknown };
  return isAuthIdentity(maybeSessionData.user) ? maybeSessionData.user : null;
}

export async function getNeonAuthIdentity(): Promise<AuthIdentity | null> {
  const { data, error } = await authServer.getSession();
  if (error) {
    return null;
  }
  return getAuthIdentity(data);
}

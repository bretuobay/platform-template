import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthIdentity } from '../auth';
import { createMultiTenantSessionManager, type TenantResolver, type TenantSession } from '../session';

type TestRole = 'owner' | 'admin' | 'member';

const identity: AuthIdentity = {
  id: 'auth-user-1',
  email: 'user@example.com',
  name: 'Demo User',
};

const mappedSession: TenantSession<string, TestRole> = {
  id: 'user-1',
  tenantId: 'tenant-1',
  role: 'member',
  email: 'user@example.com',
};

const envSnapshot = process.env;

function createResolver(overrides?: Partial<TenantResolver<string, TestRole>>): TenantResolver<string, TestRole> {
  return {
    findByAuthUserId: vi.fn().mockResolvedValue(null),
    findByEmail: vi.fn().mockResolvedValue(null),
    ...overrides,
  };
}

describe('createMultiTenantSessionManager', () => {
  beforeEach(() => {
    process.env = { ...envSnapshot };
  });

  afterEach(() => {
    process.env = envSnapshot;
    vi.clearAllMocks();
  });

  it('returns mapped tenant session by auth user id', async () => {
    const resolver = createResolver({
      findByAuthUserId: vi.fn().mockResolvedValue(mappedSession),
    });

    const manager = createMultiTenantSessionManager({
      resolver,
      identityProvider: async () => identity,
    });

    await expect(manager.getSession()).resolves.toEqual(mappedSession);
    expect(resolver.findByAuthUserId).toHaveBeenCalledWith(identity.id);
    expect(resolver.findByEmail).not.toHaveBeenCalled();
  });

  it('falls back to email lookup when id lookup misses', async () => {
    const resolver = createResolver({
      findByEmail: vi.fn().mockResolvedValue(mappedSession),
    });

    const manager = createMultiTenantSessionManager({
      resolver,
      identityProvider: async () => identity,
    });

    await expect(manager.getSession()).resolves.toEqual(mappedSession);
    expect(resolver.findByAuthUserId).toHaveBeenCalledTimes(1);
    expect(resolver.findByEmail).toHaveBeenCalledWith(identity.email);
  });

  it('uses provision callback when no existing user mapping is found', async () => {
    const resolver = createResolver({
      provision: vi.fn().mockResolvedValue(mappedSession),
    });

    const manager = createMultiTenantSessionManager({
      resolver,
      identityProvider: async () => identity,
    });

    await expect(manager.getSession()).resolves.toEqual(mappedSession);
    expect(resolver.provision).toHaveBeenCalledWith(identity);
  });

  it('supports dev bypass session for local work', async () => {
    process.env.AUTH_DEV_BYPASS = 'true';
    process.env.DEV_AUTH_USER_ID = 'dev-user-1';
    process.env.DEV_AUTH_TENANT_ID = 'dev-tenant';
    process.env.DEV_AUTH_ROLE = 'owner';
    process.env.DEV_AUTH_EMAIL = 'dev@example.com';
    process.env.NODE_ENV = 'test';

    const resolver = createResolver();
    const manager = createMultiTenantSessionManager<string, TestRole>({
      resolver,
      roles: ['owner', 'admin', 'member'],
      identityProvider: async () => null,
    });

    await expect(manager.getSession()).resolves.toEqual({
      id: 'dev-user-1',
      tenantId: 'dev-tenant',
      role: 'owner',
      email: 'dev@example.com',
    });
  });

  it('allows owner role bypass in requireRole', async () => {
    const resolver = createResolver({
      findByAuthUserId: vi.fn().mockResolvedValue({
        ...mappedSession,
        role: 'owner',
      }),
    });

    const manager = createMultiTenantSessionManager<string, TestRole>({
      resolver,
      ownerRoles: ['owner'],
      identityProvider: async () => identity,
    });

    await expect(manager.requireRole(['admin'])).resolves.toEqual({
      ...mappedSession,
      role: 'owner',
    });
  });

  it('throws forbidden when role is not allowed', async () => {
    const resolver = createResolver({
      findByAuthUserId: vi.fn().mockResolvedValue(mappedSession),
    });

    const manager = createMultiTenantSessionManager<string, TestRole>({
      resolver,
      identityProvider: async () => identity,
    });

    await expect(manager.requireRole(['admin'])).rejects.toThrow('Forbidden');
  });
});

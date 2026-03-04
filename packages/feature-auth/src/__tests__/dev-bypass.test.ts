import { describe, expect, it } from 'vitest';

import { getLocalDevBypassState } from '../services/dev-bypass';

describe('getLocalDevBypassState', () => {
  it('returns null when bypass is disabled', () => {
    expect(getLocalDevBypassState({}, { NODE_ENV: 'development', AUTH_DEV_BYPASS: 'false' })).toBeNull();
  });

  it('returns null in production mode', () => {
    expect(getLocalDevBypassState({}, { NODE_ENV: 'production', AUTH_DEV_BYPASS: 'true' })).toBeNull();
  });

  it('returns bypass identity details when enabled', () => {
    expect(
      getLocalDevBypassState({}, {
        NODE_ENV: 'development',
        AUTH_DEV_BYPASS: 'true',
        DEV_AUTH_USER_ID: 'dev-user-1',
        DEV_AUTH_TENANT_ID: 'tenant-local',
        DEV_AUTH_ROLE: 'owner',
        DEV_AUTH_EMAIL: 'dev-owner@example.com',
      }),
    ).toEqual({
      enabled: true,
      userId: 'dev-user-1',
      tenantId: 'tenant-local',
      role: 'owner',
      email: 'dev-owner@example.com',
    });
  });
});

import { describe, expect, it } from 'vitest';

import { createPermissionChecker, hasPermission } from '../permissions';

type Role = 'owner' | 'admin' | 'member';

const rolePermissions: Record<Role, readonly string[]> = {
  owner: ['*'],
  admin: ['billing', 'users'],
  member: ['projects'],
};

describe('permissions', () => {
  it('allows wildcard permissions', () => {
    expect(hasPermission(rolePermissions, 'owner', 'billing')).toBe(true);
  });

  it('validates exact permissions', () => {
    const can = createPermissionChecker(rolePermissions);
    expect(can('admin', 'users')).toBe(true);
    expect(can('member', 'billing')).toBe(false);
  });
});

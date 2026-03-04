export type PermissionMap<TRole extends string> = Record<TRole, readonly string[]>;

const WILDCARD_PERMISSION = '*';

export function hasPermission<TRole extends string>(
  rolePermissions: PermissionMap<TRole>,
  role: TRole,
  permission: string,
): boolean {
  const permissions = rolePermissions[role] ?? [];
  return permissions.includes(WILDCARD_PERMISSION) || permissions.includes(permission);
}

export function createPermissionChecker<TRole extends string>(rolePermissions: PermissionMap<TRole>) {
  return (role: TRole, permission: string): boolean => hasPermission(rolePermissions, role, permission);
}

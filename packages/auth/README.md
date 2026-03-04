# Platform Auth Package

Reusable Neon Auth server setup with a generic multi-tenant session manager for template projects.

## What It Provides

- Lazy Neon Auth server bootstrap (`authServer`, `authHandler`) for Next.js route handlers.
- Strict environment validation for Neon auth URL + cookie secret.
- Generic multi-tenant session manager with pluggable user/tenant resolver.
- Optional development bypass for local testing.
- Role-permission helpers for feature authorization checks.

## Required Environment Variables

Use either Neon-specific keys or Better Auth aliases:

- `NEON_AUTH_BASE_URL` or `BETTER_AUTH_URL`
- `NEON_AUTH_COOKIE_SECRET` or `BETTER_AUTH_SECRET` (required on server runtime)

Optional local bypass settings:

- `AUTH_DEV_BYPASS=true`
- `DEV_AUTH_USER_ID`
- `DEV_AUTH_TENANT_ID`
- `DEV_AUTH_ROLE`
- `DEV_AUTH_EMAIL`

## Usage

```ts
import { createMultiTenantSessionManager } from '@repo/auth';

type Role = 'owner' | 'admin' | 'staff';

export const sessionManager = createMultiTenantSessionManager<string, Role>({
  roles: ['owner', 'admin', 'staff'],
  ownerRoles: ['owner'],
  resolver: {
    async findByAuthUserId(authUserId) {
      // Query your tenant membership table by auth user id.
      return null;
    },
    async findByEmail(email) {
      // Fallback query by email.
      return null;
    },
    async provision(identity) {
      // Optional: create membership for first-time login.
      return {
        id: identity.id,
        tenantId: 'tenant-1',
        role: 'staff',
        email: identity.email,
      };
    },
  },
});
```

Then use:

- `await sessionManager.getSession()`
- `await sessionManager.requireAuth()`
- `await sessionManager.requireRole(['admin'])`

## Route Handler Setup

```ts
import { authHandler } from '@repo/auth';

export const { GET, POST } = authHandler;
```

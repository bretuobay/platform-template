# Feature Auth Package

Reusable Neon Auth visual layer for multi-tenant apps in this template.

## What It Provides

- `NeonAuthProvider` wrapper around Neon Auth UI provider.
- `AuthPageShell` for branded auth page layout.
- `AuthNeonView` for login/signup/reset form rendering.
- Route safety helper (`resolveAuthRedirect`) to prevent open redirects.
- Copy helper (`getAuthPageCopy`) for generic product messaging.
- Local dev bypass helpers and banner:
  - `getLocalDevBypassState`
  - `AuthDevBypassBanner`

## Local Dev Bypass

This package aligns with `@repo/auth` bypass env vars:

- `AUTH_DEV_BYPASS=true`
- `DEV_AUTH_USER_ID`
- `DEV_AUTH_TENANT_ID`
- `DEV_AUTH_ROLE`
- `DEV_AUTH_EMAIL`

Use `getLocalDevBypassState()` on the server and pass the result to `AuthPageShell` to surface a local bypass banner.

## Usage

```tsx
import { AuthNeonView, AuthPageShell, NeonAuthProvider, getLocalDevBypassState } from '@repo/feature-auth';

const devBypassState = getLocalDevBypassState();

export function LoginScreen({ authClient }: { authClient: unknown }) {
  return (
    <NeonAuthProvider authClient={authClient}>
      <AuthPageShell appName="Acme Platform" devBypassState={devBypassState}>
        <AuthNeonView
          view="login"
          fallbackRedirect="/dashboard"
          copyOptions={{ appName: 'Acme Platform', workspaceLabel: 'organization' }}
        />
      </AuthPageShell>
    </NeonAuthProvider>
  );
}
```

## Tailwind Source

When used in an app, include this source path in app-level Tailwind source config:

`../../../packages/feature-auth/src/**/*.{ts,tsx}`

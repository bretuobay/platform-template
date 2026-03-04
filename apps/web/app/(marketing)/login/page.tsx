import { AuthPageShell, getAuthPageCopy, getLocalDevBypassState, resolveAuthRedirect } from '@repo/feature-auth';
import Link from 'next/link';

import { signInTemplateAction } from '../auth-actions';

interface LoginPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function readSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : {};
  const devBypassState = getLocalDevBypassState();
  const redirectTo = resolveAuthRedirect(readSearchParam(params.redirectTo), '/dashboard');
  const error = readSearchParam(params.error);
  const resetStatus = readSearchParam(params.reset);

  return (
    <AuthPageShell
      appName="Platform Template"
      copy={getAuthPageCopy('login', {
        appName: 'Platform Template',
        workspaceLabel: 'workspace',
        supportMessage: 'Use demo credentials in development or bypass with AUTH_DEV_BYPASS=true.',
      })}
      devBypassState={devBypassState}
    >
      <div className="space-y-5">
        <form action={signInTemplateAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-medium text-text-primary">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="brand-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Use any password in simulation mode"
              className="brand-input"
            />
          </div>

          {error === 'missing_email' ? (
            <p className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
              Enter your email to continue.
            </p>
          ) : null}

          {resetStatus === 'sent' ? (
            <p className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
              Password reset simulation completed. You can sign in now.
            </p>
          ) : null}

          <button type="submit" className="brand-button w-full">
            Sign in
          </button>
        </form>

        {devBypassState ? (
          <Link href={redirectTo} className="brand-button-secondary w-full justify-center">
            Continue as bypass user
          </Link>
        ) : null}

        <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
          <Link href={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`} className="font-medium text-primary hover:text-primary-hover">
            Create account
          </Link>
          <Link href="/reset" className="font-medium text-primary hover:text-primary-hover">
            Forgot password?
          </Link>
        </div>
      </div>
    </AuthPageShell>
  );
}

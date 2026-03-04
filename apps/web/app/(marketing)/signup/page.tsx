import { AuthPageShell, getAuthPageCopy, getLocalDevBypassState, resolveAuthRedirect } from '@repo/feature-auth';
import Link from 'next/link';

import { signUpTemplateAction } from '../auth-actions';

interface SignupPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function readSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = searchParams ? await searchParams : {};
  const devBypassState = getLocalDevBypassState();
  const redirectTo = resolveAuthRedirect(readSearchParam(params.redirectTo), '/dashboard');
  const error = readSearchParam(params.error);

  return (
    <AuthPageShell
      appName="Platform Template"
      copy={getAuthPageCopy('signup', {
        appName: 'Platform Template',
        workspaceLabel: 'workspace',
        supportMessage: 'This starter uses a simulated signup flow for template onboarding.',
      })}
      devBypassState={devBypassState}
    >
      <div className="space-y-5">
        <form action={signUpTemplateAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="space-y-2">
            <label htmlFor="signup-name" className="text-sm font-medium text-text-primary">
              Full name
            </label>
            <input
              id="signup-name"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="Ada Lovelace"
              className="brand-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="text-sm font-medium text-text-primary">
              Work email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="brand-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Use any password in simulation mode"
              className="brand-input"
            />
          </div>

          {error === 'missing_fields' ? (
            <p className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
              Enter your name and email to continue.
            </p>
          ) : null}

          <button type="submit" className="brand-button w-full">
            Create account
          </button>
        </form>

        {devBypassState ? (
          <Link href={redirectTo} className="brand-button-secondary w-full justify-center">
            Skip signup with dev bypass
          </Link>
        ) : null}

        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <Link href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} className="font-medium text-primary hover:text-primary-hover">
            Sign in
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}

import { AuthPageShell, getAuthPageCopy, getLocalDevBypassState } from '@repo/feature-auth';
import Link from 'next/link';

import { resetTemplatePasswordAction } from '../auth-actions';

interface ResetPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function readSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ResetPage({ searchParams }: ResetPageProps) {
  const params = searchParams ? await searchParams : {};
  const devBypassState = getLocalDevBypassState();
  const status = readSearchParam(params.status);
  const error = readSearchParam(params.error);
  const email = readSearchParam(params.email);

  return (
    <AuthPageShell
      appName="Platform Template"
      copy={getAuthPageCopy('reset', {
        appName: 'Platform Template',
        workspaceLabel: 'workspace',
        supportMessage: 'Reset is simulated in this template. Integrate Neon email delivery in production projects.',
      })}
      devBypassState={devBypassState}
    >
      <div className="space-y-5">
        <form action={resetTemplatePasswordAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="reset-email" className="text-sm font-medium text-text-primary">
              Account email
            </label>
            <input
              id="reset-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="brand-input"
            />
          </div>

          {error === 'missing_email' ? (
            <p className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
              Enter your email to request a reset.
            </p>
          ) : null}

          {status === 'sent' ? (
            <p className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
              Reset instructions simulated for {email ?? 'your email'}. Continue to sign in.
            </p>
          ) : null}

          <button type="submit" className="brand-button w-full">
            Send reset link
          </button>
        </form>

        <div className="text-sm text-text-secondary">
          <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthPageShell>
  );
}

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import type { AuthPageCopy, LocalDevBypassState } from '../model/types';
import { AuthDevBypassBanner } from './AuthDevBypassBanner';

interface AuthPageShellProps {
  children: ReactNode;
  appName?: string;
  homeHref?: string;
  copy?: Partial<AuthPageCopy>;
  devBypassState?: LocalDevBypassState | null;
  className?: string;
}

const defaultCopy: AuthPageCopy = {
  eyebrow: 'Platform Template',
  title: 'Secure access for your workspace',
  description: 'Sign in with your Neon Auth account to continue.',
  formTitle: 'Sign in',
  assistance: 'Local development bypass is available via AUTH_DEV_BYPASS=true.',
};

export function AuthPageShell({
  children,
  appName = 'Platform Template',
  homeHref = '/',
  copy,
  devBypassState = null,
  className,
}: AuthPageShellProps) {
  const resolvedCopy = { ...defaultCopy, ...copy };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,191,255,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_40%)]" />

      <main className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass-card flex flex-col justify-between gap-8">
          <header className="space-y-4">
            <a href={homeHref} className="inline-flex items-center gap-3 text-text-primary" aria-label={`Go to ${appName} home`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-base font-semibold text-white shadow-premium">
                {appName.slice(0, 2).toUpperCase()}
              </span>
              <span className="space-y-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-primary">{resolvedCopy.eyebrow}</span>
                <span className="block text-lg font-semibold tracking-tight">{appName}</span>
              </span>
            </a>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">{resolvedCopy.title}</h1>
              <p className="max-w-lg text-sm text-text-secondary sm:text-base">{resolvedCopy.description}</p>
            </div>
          </header>

          <div className="rounded-xl border border-border/70 bg-surface/80 p-4 text-sm text-text-secondary">
            {resolvedCopy.assistance}
          </div>

          <AuthDevBypassBanner state={devBypassState} />
        </section>

        <section className={clsx('surface-card border-border/80 p-6 sm:p-8', className)}>{children}</section>
      </main>
    </div>
  );
}

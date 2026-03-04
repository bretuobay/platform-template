import { clsx } from 'clsx';

import type { LocalDevBypassState } from '../model/types';

interface AuthDevBypassBannerProps {
  state: LocalDevBypassState | null;
  className?: string;
}

export function AuthDevBypassBanner({ state, className }: AuthDevBypassBannerProps) {
  if (!state) {
    return null;
  }

  return (
    <aside
      className={clsx(
        'rounded-xl border border-warning/35 bg-warning/10 p-3 text-xs text-text-primary sm:text-sm',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <p className="font-semibold uppercase tracking-[0.14em] text-warning">Local Dev Bypass Enabled</p>
      <p className="mt-1 text-text-secondary">
        You are bypassing Neon Auth UI as <span className="font-semibold text-text-primary">{state.email}</span>.
      </p>
      <p className="mt-1 text-text-secondary">
        tenant: <span className="font-semibold text-text-primary">{state.tenantId}</span> | role:{' '}
        <span className="font-semibold text-text-primary">{state.role}</span>
      </p>
    </aside>
  );
}

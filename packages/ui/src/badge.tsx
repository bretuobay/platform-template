import type { HTMLAttributes } from 'react';

import { clsx } from 'clsx';

const badgeVariants = {
  neutral: 'bg-neutral-100 text-text-secondary',
  info: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({ children, className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex min-h-6 items-center rounded-md px-2 py-0.5 text-xs font-medium',
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

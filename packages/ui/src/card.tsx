import type { HTMLAttributes, ReactNode } from 'react';

import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({ children, className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-border bg-surface p-5 shadow-sm',
        interactive && 'transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-premium',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('mb-3 space-y-1', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={clsx('text-base font-semibold text-text-primary', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx('text-sm text-text-secondary', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('space-y-3', className)} {...props}>
      {children}
    </div>
  );
}

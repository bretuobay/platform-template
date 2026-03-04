import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { clsx } from 'clsx';

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
  secondary:
    'border border-border bg-surface text-text-primary hover:bg-neutral-100 focus-visible:ring-primary',
  outline:
    'border border-primary bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary',
  danger: 'bg-error text-white hover:brightness-95 focus-visible:ring-error',
} as const;

const buttonSizes = {
  sm: 'h-10 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

import type { InputHTMLAttributes } from 'react';

import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ className, hasError = false, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'block min-h-11 w-full rounded-xl border bg-surface px-3 py-2 text-sm text-text-primary',
        'placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2',
        hasError
          ? 'border-error focus-visible:ring-error/30'
          : 'border-border focus-visible:ring-primary/30',
        className,
      )}
      {...props}
    />
  );
}

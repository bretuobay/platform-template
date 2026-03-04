import type { HTMLAttributes } from 'react';

import { clsx } from 'clsx';

export function Code({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={clsx(
        'rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

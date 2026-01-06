'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';

const Icon = {
  Sun: (props: ComponentPropsWithoutRef<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  Moon: (props: ComponentPropsWithoutRef<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = useMemo(() => {
    if (!mounted) return 'light';
    if (theme === 'system') return systemTheme ?? 'light';
    return theme ?? 'light';
  }, [mounted, systemTheme, theme]);

  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color theme"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card p-1.5 text-muted-foreground transition-all duration-200 hover:border-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        disabled
      >
        <span className="sr-only">Toggle color theme</span>
      </button>
    );
  }

  const IconComponent = isDark ? Icon.Sun : Icon.Moon;
  const themeLabel = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${themeLabel} mode`}
      aria-pressed={isDark}
      className={clsx(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card p-1.5 text-muted-foreground',
        'transition-all duration-200 hover:border-accent hover:text-foreground hover:bg-accent/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'active:scale-95',
      )}
    >
      <IconComponent className="h-4 w-4 text-current transition-transform duration-200" aria-hidden="true" />
      <span className="sr-only">
        Current theme: {resolvedTheme}. Click to switch to {themeLabel} mode.
      </span>
    </button>
  );
}

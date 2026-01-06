'use client';

import Link from 'next/link';

import { ThemeToggle } from '@repo/brand';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
];

export function MarketingHeader() {
  return (
    <header className="border-b border-border bg-card/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 text-sm font-semibold uppercase tracking-[0.4em] text-background">
            PT
          </div>
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.5em] text-muted-foreground">Platform</p>
            <p className="text-lg font-semibold text-foreground">Connected SaaS</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-foreground px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-background transition hover:bg-foreground/90"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="h-px w-full border-t border-border md:hidden" />
      <div className="space-y-2 bg-card/70 px-4 py-4 md:hidden">
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

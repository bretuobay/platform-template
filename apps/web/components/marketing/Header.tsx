'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@repo/brand';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
];

function scrollToSection(href: string) {
  if (!href.startsWith('#')) {
    return;
  }

  const node = document.querySelector(href);
  if (!node) {
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  node.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <header className="shell-panel-soft sticky top-0 z-40 border-b border-border/70">
      <div className="brand-container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2 text-xl font-black tracking-tight text-text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30 transition-transform group-hover:rotate-12">
            P
          </span>
          Platform
          <span className="text-primary">Template</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold tracking-tight text-text-secondary transition-colors hover:text-primary"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-bold text-text-primary transition-colors hover:text-primary">
            Sign in
          </Link>
          <Link href="/signup" className="brand-button h-11 px-6 text-sm shadow-md">
            Sign up
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-text-primary transition-all hover:border-primary/50 hover:bg-primary/10 md:hidden"
          aria-controls="mobile-marketing-nav"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="shell-panel absolute left-0 top-full w-full border-t border-border p-5 md:hidden">
          <nav id="mobile-marketing-nav" className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <a
                key={`mobile-${item.href}`}
                href={item.href}
                className="rounded-2xl border border-border bg-surface px-5 py-4 text-lg font-bold text-text-primary transition-colors hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                onClick={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              className="rounded-2xl px-5 py-4 text-lg font-bold text-text-primary hover:bg-primary/10 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link href="/signup" className="brand-button h-14 w-full text-lg" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

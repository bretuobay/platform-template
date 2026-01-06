'use client';

import { ThemeToggle } from '@repo/brand';

interface AppHeaderProps {
  onOpenSidebar: () => void;
}

export function AppHeader({ onOpenSidebar }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Show navigation"
            onClick={onOpenSidebar}
            className="rounded-lg border border-border/70 p-2 text-muted-foreground transition hover:border-foreground hover:text-foreground md:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-accent/80 text-xs font-semibold uppercase tracking-[0.4em] text-background">
              UI
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.5em] text-muted-foreground">Workspace</p>
              <p className="text-sm font-semibold text-foreground">Product Ops</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border border-border/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:border-foreground hover:text-foreground"
            onClick={() => {
              console.log('Sign out clicked');
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

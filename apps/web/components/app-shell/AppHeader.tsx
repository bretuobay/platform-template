'use client';

import Link from 'next/link';
import { Bell, LogOut, Menu } from 'lucide-react';

import { ThemeToggle } from '@repo/brand';

interface AppHeaderProps {
  onOpenSidebar: () => void;
  isSidebarOpen: boolean;
  sidebarId: string;
}

export function AppHeader({ onOpenSidebar, isSidebarOpen, sidebarId }: AppHeaderProps) {
  return (
    <header className="shell-panel-soft sticky top-0 z-40 border-b border-border/70">
      <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Show navigation"
            aria-controls={sidebarId}
            aria-expanded={isSidebarOpen}
            onClick={onOpenSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:bg-neutral-100 md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2" aria-label="Platform Template dashboard">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <span className="text-sm font-black text-white">P</span>
            </div>
            <p className="hidden text-lg font-black tracking-tight text-text-primary sm:block">
              Platform<span className="text-primary">Template</span>
            </p>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard#activity"
            className="group relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface transition-all hover:bg-neutral-100"
            aria-label="Open activity"
          >
            <Bell className="h-5 w-5 text-text-secondary group-hover:text-text-primary" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Link>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="btn-secondary h-11 !rounded-xl px-3 sm:px-4"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

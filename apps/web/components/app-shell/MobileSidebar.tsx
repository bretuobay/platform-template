import Link from 'next/link';

import { navLinks } from './nav-links';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="relative h-full w-64 bg-background p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Navigation</p>
          <button
            type="button"
            aria-label="Close navigation"
            className="text-muted-foreground transition hover:text-foreground"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <nav className="mt-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-2xl border border-border/70 px-3 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/50 hover:bg-foreground/5"
              onClick={onClose}
            >
              <p>{link.label}</p>
              <p className="text-[0.55rem] uppercase tracking-[0.4em] text-muted-foreground">
                {link.description}
              </p>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}

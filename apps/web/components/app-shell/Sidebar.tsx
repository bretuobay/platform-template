import Link from 'next/link';

import { navLinks } from './nav-links';

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={[
        'flex h-full flex-col gap-6 border-r border-border bg-card/70 p-4 text-sm text-muted-foreground',
        className ?? '',
      ].join(' ')}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">App shell</p>
        <p className="text-base font-semibold text-foreground">Workspace</p>
      </div>
      <nav className="flex flex-1 flex-col gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-col gap-1 rounded-2xl border border-border/70 px-3 py-3 transition hover:border-foreground/50 hover:bg-foreground/5"
          >
            <span className="text-sm font-semibold text-foreground">{link.label}</span>
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
              {link.description}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

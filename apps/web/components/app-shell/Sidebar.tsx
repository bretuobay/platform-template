'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavIcon } from './nav-icon';
import { navLinks } from './nav-links';
import { useActiveHash } from './use-active-hash';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const hash = useActiveHash();

  return (
    <aside
      className={[
        'shell-panel-soft flex h-full flex-col gap-6 border-r border-border/70 p-5 text-sm text-text-secondary',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
          <span className="text-sm font-black text-white">P</span>
        </div>
        <p className="text-lg font-black tracking-tight text-text-primary">
          Platform<span className="text-primary">Template</span>
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Application navigation">
        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/70">Main menu</p>
        {navLinks.map((link) => {
          const [path, linkHash = 'overview'] = link.href.split('#');
          const isActive = pathname === path && hash === `#${linkHash}`;

          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-neutral-100 hover:text-text-primary',
              ].join(' ')}
            >
              {isActive ? <div className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" /> : null}
              <NavIcon
                icon={link.icon}
                className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}
              />
              <div className="flex flex-col">
                <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>{link.label}</span>
                <span className="text-[0.65rem] text-text-secondary">{link.description}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-border bg-surface/90 p-4">
        <p className="text-xs font-bold text-text-primary">Starter workspace</p>
        <p className="text-[11px] text-text-secondary">Package-first architecture with mobile-ready shell.</p>
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavIcon } from './nav-icon';
import { navLinks } from './nav-links';
import { useActiveHash } from './use-active-hash';

interface BottomNavProps {
  onOpenMenu: () => void;
  isSidebarOpen: boolean;
  sidebarId: string;
}

export function BottomNav({ onOpenMenu, isSidebarOpen, sidebarId }: BottomNavProps) {
  const pathname = usePathname();
  const links = navLinks.filter((link) => link.showInMobileBar);
  const activeHash = useActiveHash();

  if (isSidebarOpen) {
    return null;
  }

  return (
    <nav
      className="shell-panel-soft fixed inset-x-0 bottom-0 z-30 border-t border-border/70 md:hidden"
      aria-label="Primary mobile navigation"
    >
      <ul className="grid h-20 grid-cols-5">
        {links.map((link) => {
          const [path, hash = 'overview'] = link.href.split('#');
          const isActive = pathname === path && activeHash === `#${hash}`;

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 px-2 transition-all ${
                  isActive ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                <span
                  className={`flex h-10 w-16 items-center justify-center rounded-2xl transition-all ${
                    isActive ? 'bg-primary/15' : 'hover:bg-neutral-100'
                  }`}
                >
                  <NavIcon icon={link.icon} className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-tight">{link.label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-controls={sidebarId}
            aria-expanded={isSidebarOpen}
            className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-text-secondary transition-all"
            aria-label="Open navigation menu"
          >
            <span className="flex h-10 w-16 items-center justify-center rounded-2xl transition-all hover:bg-neutral-100">
              <Menu className="h-5 w-5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-tight">More</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavIcon } from './nav-icon';
import { navLinks } from './nav-links';
import { useActiveHash } from './use-active-hash';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarId: string;
}

export function MobileSidebar({ isOpen, onClose, sidebarId }: MobileSidebarProps) {
  const pathname = usePathname();
  const hash = useActiveHash();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const titleId = `${sidebarId}-title`;

  return (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="shell-overlay absolute inset-0"
        onClick={onClose}
        aria-label="Close navigation overlay"
      />

      <aside id={sidebarId} className="shell-panel relative h-full w-72 p-4 shadow-modal">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p id={titleId} className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
            Navigation
          </p>
          <button
            type="button"
            aria-label="Close navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const [path, linkHash = 'overview'] = link.href.split('#');
            const isActive = pathname === path && hash === `#${linkHash}`;

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'rounded-xl border px-3 py-3 text-sm font-semibold text-text-primary transition',
                  isActive
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/40 hover:bg-primary/5',
                ].join(' ')}
                onClick={onClose}
              >
                <p className="flex items-center gap-2">
                  <NavIcon icon={link.icon} className="h-4 w-4" />
                  {link.label}
                </p>
                <p className="mt-1 text-xs text-text-secondary">{link.description}</p>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { BottomNav } from '../BottomNav';
import { Sidebar } from '../Sidebar';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    onClick,
    ...props
  }: {
    children: ReactNode;
    href: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

function setHash(hash: string) {
  window.history.replaceState({}, '', `/dashboard${hash}`);
  window.dispatchEvent(new Event('hashchange'));
}

function getLinkByHref(href: string) {
  const link = screen.getAllByRole('link').find((node) => node.getAttribute('href') === href);

  if (!link) {
    throw new Error(`Expected link ${href} to exist`);
  }

  return link;
}

describe('hash-driven active navigation state', () => {
  it('updates active state in sidebar when hash changes', async () => {
    setHash('#overview');
    render(<Sidebar />);

    expect(getLinkByHref('/dashboard#overview').getAttribute('aria-current')).toBe('page');
    expect(getLinkByHref('/dashboard#activity').getAttribute('aria-current')).toBeNull();

    setHash('#activity');
    await waitFor(() => {
      expect(getLinkByHref('/dashboard#activity').getAttribute('aria-current')).toBe('page');
    });
    expect(getLinkByHref('/dashboard#overview').getAttribute('aria-current')).toBeNull();
  });

  it('updates active state in bottom nav when hash changes', async () => {
    setHash('#overview');
    render(<BottomNav onOpenMenu={() => undefined} isSidebarOpen={false} sidebarId="app-mobile-sidebar" />);

    expect(getLinkByHref('/dashboard#overview').getAttribute('aria-current')).toBe('page');

    setHash('#settings');
    await waitFor(() => {
      expect(getLinkByHref('/dashboard#settings').getAttribute('aria-current')).toBe('page');
    });
    expect(getLinkByHref('/dashboard#overview').getAttribute('aria-current')).toBeNull();
  });
});

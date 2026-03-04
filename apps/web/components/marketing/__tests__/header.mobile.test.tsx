import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MarketingHeader } from '../Header';

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

vi.mock('@repo/brand', () => ({
  ThemeToggle: () => <button type="button">Theme</button>,
}));

describe('MarketingHeader mobile navigation', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('opens and closes with accessible state, and closes on link click', async () => {
    const user = userEvent.setup();
    render(<MarketingHeader />);

    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('mobile-marketing-nav');

    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')).toBe('true');

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation' });
    await user.click(within(mobileNav).getByRole('link', { name: 'Product' }));

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).toBeNull();
  });

  it('closes when escape is pressed', async () => {
    const user = userEvent.setup();
    render(<MarketingHeader />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).not.toBeNull();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).toBeNull();
    });
  });
});

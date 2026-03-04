import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { AppShell } from '../AppShell';

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

vi.mock('@repo/brand', () => ({
  ThemeToggle: () => <button type="button">Theme</button>,
}));

describe('AppShell mobile navigation behavior', () => {
  it('opens and closes the drawer through controls, overlay, link click, and Escape', async () => {
    const user = userEvent.setup();
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>,
    );

    expect(screen.getByLabelText('Primary mobile navigation')).not.toBeNull();

    const openButton = screen.getByRole('button', { name: 'Show navigation' });
    expect(openButton.getAttribute('aria-controls')).toBe('app-mobile-sidebar');
    expect(openButton.getAttribute('aria-expanded')).toBe('false');

    await user.click(openButton);

    const dialog = await screen.findByRole('dialog', { name: 'Navigation' });
    expect(openButton.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.queryByLabelText('Primary mobile navigation')).toBeNull();

    await user.click(within(dialog).getByRole('link', { name: /Activity/i }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Navigation' })).toBeNull();
    });

    expect(document.body.style.overflow).toBe('');
    expect(screen.getByLabelText('Primary mobile navigation')).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'Show navigation' }));
    await user.click(screen.getByRole('button', { name: 'Close navigation overlay' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Navigation' })).toBeNull();
    });

    await user.click(screen.getByRole('button', { name: 'Show navigation' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Navigation' })).toBeNull();
    });
  });
});

import { describe, expect, it } from 'vitest';

import { resolveAuthRedirect } from '../services/redirect';

describe('resolveAuthRedirect', () => {
  it('accepts safe internal paths', () => {
    expect(resolveAuthRedirect('/dashboard')).toBe('/dashboard');
    expect(resolveAuthRedirect('/billing/invoices?status=open#latest')).toBe('/billing/invoices?status=open#latest');
  });

  it('rejects external and protocol-like values', () => {
    expect(resolveAuthRedirect('https://example.com', '/dashboard')).toBe('/dashboard');
    expect(resolveAuthRedirect('//example.com/evil', '/dashboard')).toBe('/dashboard');
    expect(resolveAuthRedirect('javascript:alert(1)', '/dashboard')).toBe('/dashboard');
  });

  it('uses fallback when input is missing or invalid', () => {
    expect(resolveAuthRedirect(undefined, '/dashboard')).toBe('/dashboard');
    expect(resolveAuthRedirect('', '/dashboard')).toBe('/dashboard');
    expect(resolveAuthRedirect('   ', '/dashboard')).toBe('/dashboard');
  });

  it('falls back to /dashboard when provided fallback is unsafe', () => {
    expect(resolveAuthRedirect(undefined, 'https://example.com')).toBe('/dashboard');
    expect(resolveAuthRedirect('https://example.com', '//evil.com')).toBe('/dashboard');
  });
});

import { describe, expect, it } from 'vitest';

import {
  dashboardSummaryQuerySchema,
  dashboardSummaryRequestSchema,
  tenantSlugSchema,
} from '../validations/dashboard';

describe('dashboard validations', () => {
  it('accepts a valid request', () => {
    const parsed = dashboardSummaryRequestSchema.parse({ tenant: 'starter-tenant', range: '7d' });
    expect(parsed.tenant).toBe('starter-tenant');
    expect(parsed.range).toBe('7d');
  });

  it('rejects malformed tenant slugs', () => {
    expect(() => tenantSlugSchema.parse('INVALID TENANT')).toThrow();
  });

  it('defaults query range when omitted', () => {
    const parsed = dashboardSummaryQuerySchema.parse({});
    expect(parsed.range).toBe('30d');
  });
});

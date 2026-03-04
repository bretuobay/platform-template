import { describe, expect, it } from 'vitest';

import { getDashboardSummary } from '../services/dashboard-service';

describe('getDashboardSummary', () => {
  it('returns deterministic metrics for a valid tenant', () => {
    const a = getDashboardSummary({ tenant: 'starter-tenant', range: '30d' });
    const b = getDashboardSummary({ tenant: 'starter-tenant', range: '30d' });

    expect(a.tenant).toBe('starter-tenant');
    expect(a.range).toBe('30d');
    expect(a.metrics).toHaveLength(4);
    expect(a.timeline.length).toBeGreaterThan(0);
    expect(a.metrics.map((metric) => metric.value)).toEqual(b.metrics.map((metric) => metric.value));
  });
});

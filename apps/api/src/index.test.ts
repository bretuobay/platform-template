import { dashboardSummaryResponseSchema } from '@repo/feature-dashboard/contracts';
import { describe, expect, it } from 'vitest';

import app from './index';

describe('api smoke tests', () => {
  it('returns a healthy response', async () => {
    const response = await app.request('/v1/health');

    expect(response.status).toBe(200);

    const json = (await response.json()) as { status: string; timestamp: string };
    expect(json.status).toBe('ok');
    expect(typeof json.timestamp).toBe('string');
  });

  it('returns a typed dashboard summary for a valid tenant', async () => {
    const response = await app.request('/v1/starter-tenant/dashboard/summary?range=30d');

    expect(response.status).toBe(200);

    const json = await response.json();
    const parsed = dashboardSummaryResponseSchema.parse(json);

    expect(parsed.tenant).toBe('starter-tenant');
    expect(parsed.range).toBe('30d');
  });

  it('rejects malformed tenant values', async () => {
    const response = await app.request('/v1/INVALID-TENANT/dashboard/summary');

    expect(response.status).toBe(400);
  });
});

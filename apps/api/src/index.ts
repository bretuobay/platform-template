import { zValidator } from '@hono/zod-validator';
import {
  dashboardSummaryQuerySchema,
  dashboardSummaryResponseSchema,
  getDashboardSummary,
  tenantSlugSchema,
} from '@repo/feature-dashboard/contracts';
import { Hono } from 'hono';
import { z } from 'zod';

export interface CloudflareBindings {
  APP_ENV?: string;
}

type AppEnv = {
  Bindings: CloudflareBindings;
};

const tenantParamSchema = z.object({
  tenant: tenantSlugSchema,
});

const app = new Hono<AppEnv>();

app.onError((error, c) => {
  console.error('[api:error]', error);
  return c.json(
    {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected API error',
    },
    500,
  );
});

app.get('/v1/health', (c) => {
  return c.json({
    status: 'ok',
    appEnv: c.env?.APP_ENV ?? 'unknown',
    timestamp: new Date().toISOString(),
  });
});

app.get(
  '/v1/:tenant/dashboard/summary',
  zValidator('param', tenantParamSchema),
  zValidator('query', dashboardSummaryQuerySchema),
  (c) => {
    const { tenant } = c.req.valid('param');
    const { range } = c.req.valid('query');

    const summary = getDashboardSummary({ tenant, range });
    const parsed = dashboardSummaryResponseSchema.parse(summary);

    return c.json(parsed);
  },
);

export default app;

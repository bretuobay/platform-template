import { z } from 'zod';

import { DASHBOARD_RANGES } from '../types/dashboard';

export const tenantSlugSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Tenant must be lowercase alphanumeric with optional hyphens');

export const dashboardRangeSchema = z.enum(DASHBOARD_RANGES);

export const dashboardSummaryQuerySchema = z.object({
  range: dashboardRangeSchema.default('30d'),
});

export const dashboardSummaryRequestSchema = z.object({
  tenant: tenantSlugSchema,
  range: dashboardRangeSchema.default('30d'),
});

export const dashboardMetricSchema = z.object({
  id: z.enum(['activeCampaigns', 'pendingApprovals', 'responseTimeHours', 'engagementScore']),
  label: z.string().min(1),
  value: z.number().finite(),
  unit: z.string().optional(),
  deltaLabel: z.string().min(1),
  trend: z.enum(['up', 'down', 'steady']),
});

export const dashboardTimelinePointSchema = z.object({
  day: z.string().min(1),
  value: z.number().min(0),
});

export const dashboardSummaryResponseSchema = z.object({
  tenant: tenantSlugSchema,
  range: dashboardRangeSchema,
  generatedAt: z.string().datetime(),
  metrics: z.array(dashboardMetricSchema).min(1),
  timeline: z.array(dashboardTimelinePointSchema).min(1),
});

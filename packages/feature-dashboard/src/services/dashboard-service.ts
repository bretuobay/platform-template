import {
  type DashboardRange,
  type DashboardSummaryResponse,
  DASHBOARD_RANGES,
} from '../types/dashboard';
import { dashboardSummaryRequestSchema } from '../validations/dashboard';

const RANGE_DAYS: Record<DashboardRange, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

function hashTenant(tenant: string): number {
  let hash = 0;
  for (let index = 0; index < tenant.length; index += 1) {
    hash = (hash * 31 + tenant.charCodeAt(index)) % 100000;
  }
  return hash;
}

function seededValue(seed: number, min: number, max: number): number {
  const next = (seed * 9301 + 49297) % 233280;
  return min + ((next / 233280) * (max - min));
}

export function getDashboardSummary(input: { tenant: string; range?: DashboardRange }): DashboardSummaryResponse {
  const parsed = dashboardSummaryRequestSchema.parse(input);
  const seed = hashTenant(parsed.tenant);
  const days = RANGE_DAYS[parsed.range] ?? 30;

  const activeCampaigns = Math.round(seededValue(seed + 1, 12, 60));
  const pendingApprovals = Math.round(seededValue(seed + 2, 1, 12));
  const responseTimeHours = Number(seededValue(seed + 3, 1.4, 8.2).toFixed(1));
  const engagementScore = Math.round(seededValue(seed + 4, 65, 96));

  const metrics: DashboardSummaryResponse['metrics'] = [
    {
      id: 'activeCampaigns',
      label: 'Active campaigns',
      value: activeCampaigns,
      deltaLabel: '+6% vs previous period',
      trend: 'up',
    },
    {
      id: 'pendingApprovals',
      label: 'Pending approvals',
      value: pendingApprovals,
      deltaLabel: '-2 since yesterday',
      trend: 'down',
    },
    {
      id: 'responseTimeHours',
      label: 'Response time',
      value: responseTimeHours,
      unit: 'h',
      deltaLabel: 'Stable this week',
      trend: 'steady',
    },
    {
      id: 'engagementScore',
      label: 'Engagement score',
      value: engagementScore,
      deltaLabel: '+3 points this month',
      trend: 'up',
    },
  ];

  const timeline = Array.from({ length: Math.min(days, 12) }, (_, index) => {
    const normalized = index + 1;
    return {
      day: `D${normalized}`,
      value: Math.round(seededValue(seed + normalized * 11, 48, 98)),
    };
  });

  return {
    tenant: parsed.tenant,
    range: parsed.range,
    generatedAt: new Date().toISOString(),
    metrics,
    timeline,
  };
}

export function listDashboardRanges() {
  return [...DASHBOARD_RANGES];
}

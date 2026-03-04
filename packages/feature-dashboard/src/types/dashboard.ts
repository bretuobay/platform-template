export const DASHBOARD_RANGES = ['7d', '30d', '90d'] as const;

export type DashboardRange = (typeof DASHBOARD_RANGES)[number];

export interface DashboardSummaryRequest {
  tenant: string;
  range?: DashboardRange;
}

export interface DashboardMetric {
  id: 'activeCampaigns' | 'pendingApprovals' | 'responseTimeHours' | 'engagementScore';
  label: string;
  value: number;
  unit?: string;
  deltaLabel: string;
  trend: 'up' | 'down' | 'steady';
}

export interface DashboardTimelinePoint {
  day: string;
  value: number;
}

export interface DashboardSummaryResponse {
  tenant: string;
  range: DashboardRange;
  generatedAt: string;
  metrics: DashboardMetric[];
  timeline: DashboardTimelinePoint[];
}

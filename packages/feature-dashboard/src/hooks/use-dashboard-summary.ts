'use client';

import { useMemo } from 'react';

import type { DashboardRange, DashboardSummaryResponse } from '../types/dashboard';
import { getDashboardSummary } from '../services/dashboard-service';

export function useDashboardSummary(tenant: string, range: DashboardRange = '30d'): DashboardSummaryResponse {
  return useMemo(() => getDashboardSummary({ tenant, range }), [tenant, range]);
}

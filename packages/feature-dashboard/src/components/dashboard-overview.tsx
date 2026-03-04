import { clsx } from 'clsx';

import type { DashboardSummaryResponse } from '../types/dashboard';

interface DashboardOverviewProps {
  summary: DashboardSummaryResponse;
  className?: string;
}

function metricValue(value: number, unit?: string) {
  if (unit) {
    return `${value}${unit}`;
  }
  return Intl.NumberFormat().format(value);
}

export function DashboardOverview({ summary, className }: DashboardOverviewProps) {
  return (
    <section className={clsx('space-y-6', className)}>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Dashboard summary</h1>
        <p className="text-sm text-text-secondary">
          Tenant <span className="font-semibold text-text-primary">{summary.tenant}</span> - Range {summary.range}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.metrics.map((metric) => (
          <article key={metric.id} className="card-base space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">{metric.label}</p>
            <p className="text-3xl font-semibold text-text-primary">{metricValue(metric.value, metric.unit)}</p>
            <p className="text-xs text-text-secondary">{metric.deltaLabel}</p>
          </article>
        ))}
      </div>

      <article className="card-base space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">Health pulse</p>
          <p className="text-sm text-text-secondary">Recent trend based on sample starter data.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-12">
          {summary.timeline.map((point) => (
            <div key={point.day} className="space-y-1 rounded-lg bg-neutral-100 p-2">
              <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full rounded-full bg-primary" style={{ width: `${point.value}%` }} />
              </div>
              <p className="text-[0.65rem] font-semibold text-text-secondary">{point.day}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

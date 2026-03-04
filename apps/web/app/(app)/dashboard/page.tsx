import { DashboardOverview, getDashboardSummary } from '@repo/feature-dashboard';

const activity = [
  'Feature package contract validated',
  'Route composition updated to package exports',
  'API smoke tests passed for health and summary routes',
];

export default function DashboardPage() {
  const summary = getDashboardSummary({ tenant: 'starter-tenant', range: '30d' });

  return (
    <div className="space-y-6">
      <section id="overview" className="space-y-4">
        <DashboardOverview summary={summary} />
      </section>

      <section id="activity" className="card-base space-y-3">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Activity</p>
          <h2 className="text-xl font-semibold text-text-primary">Workspace setup milestones</h2>
        </header>
        <ul className="space-y-2 text-sm text-text-secondary">
          {activity.map((item) => (
            <li key={item} className="rounded-lg bg-neutral-100 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="insights" className="card-base">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Insights</p>
        <p className="mt-2 text-sm text-text-secondary">
          Replace this section with domain-specific package components as soon as your first product feature is ready.
        </p>
      </section>

      <section id="settings" className="card-base">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Settings</p>
        <p className="mt-2 text-sm text-text-secondary">
          Keep app-level settings and navigation concerns in the shell, and keep domain behavior inside feature packages.
        </p>
      </section>
    </div>
  );
}

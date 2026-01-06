const metricCards = [
  { label: 'Active campaigns', value: '24', change: '+8% this week' },
  { label: 'Pending approvals', value: '6', change: '-2 since yesterday' },
  { label: 'Avg. response time', value: '4.2h', change: 'Saved 18m' },
];

const activityFeed = [
  { title: 'Creative deck uploaded', detail: 'Campaign Studio · Assets', time: '2m ago' },
  { title: 'Billing sprint approved', detail: 'Finance · Review', time: '1h ago' },
  { title: 'Insights report ready', detail: 'Analytics · Export', time: '3h ago' },
  { title: 'Theme updated', detail: 'Design system · Tokens', time: 'Yesterday' },
];

const controlCards = [
  { title: 'Team invites', detail: 'Share the workspace with new contributors.' },
  { title: 'Integration health', detail: 'Streaming & measurement connectors verified.' },
  { title: 'Security posture', detail: '2FA enforced across the workspace.' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section id="overview" className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 shadow-card">
        <header className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Overview</p>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard shell</h1>
          <p className="text-sm text-muted-foreground">
            This authenticated app shell ships with a responsive sidebar, sticky header, and mobile controls.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {metricCards.map((card) => (
            <article key={card.label} className="rounded-2xl border border-border bg-background/70 p-4 shadow-dropdown">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{card.label}</p>
              <p className="text-3xl font-semibold text-foreground">{card.value}</p>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">{card.change}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="activity" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Activity</p>
            <h2 className="text-lg font-semibold text-foreground">Recent workspace updates</h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-border/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:border-foreground"
          >
            Sync now
          </button>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card/60">
          {activityFeed.map((activity) => (
            <article key={activity.title} className="flex flex-col gap-1 px-4 py-3 text-sm text-muted-foreground odd:bg-background/40">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">{activity.title}</p>
              <p>{activity.detail}</p>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">{activity.time}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="insights" className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-accent/10 p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Insights</p>
            <h3 className="text-xl font-semibold text-foreground">Snapshot</h3>
            <p className="text-sm text-muted-foreground">
              Hook into analytics, quick actions, and reporting trends without leaving the shell.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-full border border-border/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:border-foreground"
            >
              Export
            </button>
            <button
              type="button"
              className="rounded-full bg-foreground px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-background transition hover:bg-foreground/90"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[60, 80, 45].map((value) => (
            <div key={value} className="flex flex-col gap-2 rounded-2xl border border-border bg-background/70 p-4">
              <div className="h-2 rounded-full bg-foreground/10">
                <div className="h-full rounded-full bg-foreground" style={{ width: `${value}%` }} />
              </div>
              <p className="text-sm font-semibold text-foreground">{value}% health</p>
              <p className="text-[0.55rem] uppercase tracking-[0.4em] text-muted-foreground">Pulse</p>
            </div>
          ))}
        </div>
      </section>

      <section id="settings" className="grid gap-4 md:grid-cols-3">
        {controlCards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-border bg-card/60 p-6 shadow-dropdown">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{card.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p>
            <div className="mt-4 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
              <span>Manage</span>
              <span>→</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

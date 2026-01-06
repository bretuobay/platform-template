import Link from 'next/link';

const highlights = [
  {
    title: 'Connected TV for Africa',
    copy: 'Deliver measurement-ready campaigns with real-time data, offline-first delivery, and transparent pricing modeled after the live platform.',
  },
  {
    title: 'Consistent tokens',
    copy: 'Shared colors, spacing, typography, and animations keep every experience aligned with the same design system.',
  },
  {
    title: 'Built for scale',
    copy: 'Turborepo caches, parallel pipelines, and a single Tailwind preset make it easy for every team to ship confidently.',
  },
];

const stats = [
  { label: 'Markets', value: '12' },
  { label: 'Media owners', value: '4,320' },
  { label: 'Campaigns', value: '2,100+' },
];

const plans = [
  { title: 'Launch', description: 'Perfect for new pilots and internal testing.', price: 'Starter' },
  { title: 'Scale', description: 'Deploy across teams with shared tokens and automated pipelines.', price: 'Growth' },
  { title: 'Enterprise', description: 'Run global programs, governance, and advanced analytics.', price: 'Pro' },
];

const resources = [
  { title: 'Platform architecture guide', copy: 'Learn how the marketing + app shell share tokens and layout.', href: '#resources' },
  { title: 'UX responsive checklist', copy: 'Mobile-first nav, sidebar, and theme controls ready for your SaaS.', href: '#resources' },
  { title: 'Brand system notes', copy: 'Use the shared Tailwind preset, typography, and colors everywhere.', href: '#resources' },
];

export default function MarketingHome() {
  return (
    <>
      <section
        id="product"
        className="rounded-[2rem] border border-border bg-card/60 p-8 shadow-card backdrop-blur"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Brand System</p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Marketing + app shell for modern SaaS teams
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              This Turborepo-ready template ships with the marketing hero, authenticated shell, and theme
              utilities used across the flagship platform. Build fast without rewriting the styling stack.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-background transition hover:bg-foreground/90"
              >
                Launch the dashboard
              </Link>
              <Link
                href="#resources"
                className="rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-foreground"
              >
                View docs
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-border bg-background/40 p-4 text-center shadow-dropdown"
              >
                <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="grid gap-6 md:grid-cols-3"
      >
        {highlights.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-dropdown transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
          </article>
        ))}
      </section>

      <section
        id="pricing"
        className="rounded-[2rem] border border-border bg-gradient-to-r from-primary/20 to-accent/20 p-8 shadow-card backdrop-blur"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Pricing</p>
            <h2 className="text-3xl font-semibold text-foreground">Pick the plan that matches your SaaS ship lane</h2>
            <p className="text-sm text-muted-foreground">
              Each tier reuses the marketing header/footer plus authenticated shell with responsive sidebar and
              header controls.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-foreground"
            >
              Get pricing
            </Link>
            <Link
              href="#resources"
              className="rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-background transition hover:bg-foreground/90"
            >
              Talk to sales
            </Link>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.title} className="rounded-2xl bg-background/70 p-5 shadow-card">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{plan.price}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{plan.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="resources"
        className="grid gap-6 md:grid-cols-3"
      >
        {resources.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-dropdown"
          >
            <Link href={item.href} className="text-sm font-semibold text-foreground">
              {item.title}
            </Link>
            <p className="text-sm text-muted-foreground">{item.copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}

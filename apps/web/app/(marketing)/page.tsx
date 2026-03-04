import Link from 'next/link';

const highlights = [
  {
    title: 'Token-first brand system',
    copy: 'Tailwind v4 theme tokens and reusable component classes keep product surfaces consistent.',
  },
  {
    title: 'DDD package workflow',
    copy: 'Feature modules own contracts, validation, and behavior while app routes stay intentionally thin.',
  },
  {
    title: 'Edge-ready API starter',
    copy: 'Cloudflare Hono worker includes typed health and tenant-aware summary endpoints out of the box.',
  },
];

const stats = [
  { label: 'Starter apps', value: '3' },
  { label: 'Shared packages', value: '6+' },
  { label: 'Baseline checks', value: 'Lint + Type + Test' },
];

const guides = [
  {
    title: 'Architecture boundaries',
    copy: 'Package ownership, dependency direction, and app shell responsibilities.',
  },
  {
    title: 'Feature package checklist',
    copy: 'Create and expose typed contracts before wiring route-level composition.',
  },
  {
    title: 'API starter conventions',
    copy: 'Typed route validation, edge bindings, and smoke tests for core endpoints.',
  },
];

export default function MarketingHome() {
  return (
    <div className="space-y-6 pb-12 sm:space-y-8 md:space-y-10">
      <section id="product" className="brand-container brand-section">
        <div className="shell-panel grid gap-7 rounded-3xl p-7 shadow-premium md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Platform Baseline</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Production-ready starter for your next product
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
              Build new products from a tested monorepo base with reusable feature packages, consistent styling tokens,
              and a Cloudflare API starter already wired for typed contracts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="brand-button">
                Open dashboard starter
              </Link>
              <Link href="/docs" className="brand-button-secondary">
                Read implementation playbook
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {stats.map((item) => (
              <article key={item.label} className="surface-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-text-primary">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="brand-container grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="card-interactive">
            <h2 className="text-lg font-semibold text-text-primary">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.copy}</p>
          </article>
        ))}
      </section>

      <section id="pricing" className="brand-container">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/18 via-primary/8 to-surface p-7 shadow-card md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Execution model</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Start lean, scale through packages
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-text-secondary">
            New product work starts in feature packages and routes compose those contracts. You keep reusability high
            while avoiding app-specific duplication.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/docs" className="btn-outline">
              See package conventions
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Launch starter routes
            </Link>
          </div>
        </div>
      </section>

      <section id="resources" className="brand-container grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <article key={guide.title} className="surface-card">
            <h3 className="text-base font-semibold text-text-primary">{guide.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{guide.copy}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

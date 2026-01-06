import { ThemeToggle } from '@repo/brand';

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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6">
        <header className="flex flex-col gap-6 rounded-2xl border border-border bg-card/60 p-8 shadow-card backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Brand system</p>
              <h1 className="mt-2 text-4xl font-display font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                Turborepo-ready platform template
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                Everything in this template now extends the shared Tailwind preset, imports the same CSS variables,
                and reuses the theme utilities that power the flagship ads-management web experience.
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="grid gap-6 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-dropdown transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
            </article>
          ))}
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-gradient-to-r from-primary/20 to-accent/20 p-6 shadow-md">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-foreground/70">Next steps</p>
            <p className="text-2xl font-semibold text-foreground">Import the brand package and ship in other apps.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-foreground/30 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-foreground/5">
              View docs
            </button>
            <button className="rounded-full bg-foreground/90 px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground">
              Launch experience
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

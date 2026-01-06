import { ThemeToggle } from '@repo/brand';

const resources = [
  { label: 'Tailwind preset', copy: 'Extend the shared config and keep spacing, colors, and animations aligned.' },
  { label: 'Global CSS', copy: 'Import the packaged CSS once to get the CSS variables and base styles.' },
  { label: 'Theme utilities', copy: 'Wrap with ThemeProvider and surface the ThemeToggle anywhere you need light/dark.' },
];

export default function DocsHome() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6">
        <section className="flex flex-col gap-6 rounded-3xl border border-border bg-card/50 p-8 shadow-modal backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Template docs</p>
              <h1 className="mt-2 text-4xl font-display font-bold leading-tight text-foreground md:text-5xl">
                Shared styling, documented
              </h1>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-base text-muted-foreground">
            This docs site demonstrates the same tokens and Tailwind preset that power the flagship ads-management platform.
            Install `@repo/brand`, import the CSS, and reuse the ThemeProvider to match the brand in every app.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.label}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-dropdown transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <h2 className="text-lg font-semibold text-foreground">{resource.label}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{resource.copy}</p>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-r from-secondary/20 to-accent/20 p-6 text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Publish flow</p>
          <p>
            Run `npm run build` followed by the changeset workflow to publish `@repo/brand`. Then every app can update the
            dependency and inherit the styling automatically.
          </p>
        </section>
      </div>
    </main>
  );
}

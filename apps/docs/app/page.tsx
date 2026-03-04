import { Code } from '@repo/ui';

const boundaries = [
  'Apps orchestrate routing, layouts, and auth boundaries.',
  'Feature packages own domain contracts, validation, and behavior.',
  'Shared packages expose UI primitives, brand tokens, and core utilities.',
  'API endpoints consume package contracts instead of duplicating schemas.',
];

const bootstrapChecklist = [
  'Create a feature package under packages/feature-<domain>.',
  'Define domain types and Zod validation contracts first.',
  'Implement pure service functions before route-level integration.',
  'Expose package APIs through index.ts and optional contracts subpath.',
  'Compose feature exports inside apps/web route files.',
  'Add API route validation and smoke tests for every new endpoint.',
];

const featureChecklist = [
  'No app-specific business logic in route pages.',
  'No deep imports outside documented package exports.',
  'Typecheck and check-types both pass for touched workspaces.',
  'At least one service unit test and one route smoke test are included.',
];

export default function DocsHome() {
  return (
    <main className="brand-container brand-section space-y-8">
      <section className="glass-card space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Template playbook</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">Ship new products from a stable baseline</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
          This docs app describes the default architecture and workflow for the platform template: Web + Docs +
          Cloudflare API, Tailwind v4 token-first styling, and package-first feature modules.
        </p>
      </section>

      <section className="card-base space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Architecture boundaries</h2>
        <ul className="space-y-2 text-sm text-text-secondary">
          {boundaries.map((item) => (
            <li key={item} className="rounded-lg bg-neutral-100 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="card-base space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">New product bootstrap checklist</h3>
          <ol className="space-y-2 text-sm text-text-secondary">
            {bootstrapChecklist.map((item, index) => (
              <li key={item} className="rounded-lg bg-neutral-100 px-3 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </article>

        <article className="card-base space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">New feature package checklist</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            {featureChecklist.map((item) => (
              <li key={item} className="rounded-lg bg-neutral-100 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card-base space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Common commands</h3>
        <div className="grid gap-3 text-sm text-text-secondary">
          <p>
            <Code>npm run lint</Code>
          </p>
          <p>
            <Code>npm run typecheck</Code>
          </p>
          <p>
            <Code>npm run check-types</Code>
          </p>
          <p>
            <Code>npm run test</Code>
          </p>
        </div>
      </section>
    </main>
  );
}

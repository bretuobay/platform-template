# Platform Template

Production-ready monorepo starter for new products built on:

- `apps/web` (Next.js product surface)
- `apps/docs` (implementation playbook)
- `apps/api` (Cloudflare Hono worker starter)
- Package-first domain modules in `packages/*`

## Core Principles

- Keep app routes thin and move domain behavior to `packages/feature-*`.
- Share contracts with Zod and TypeScript across web and API.
- Use centralized Tailwind v4 tokens from `@repo/brand/styles.css`.
- Keep lint, typecheck, and tests green for every touched workspace.

## Workspace Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run check-types
npm run test
```

## Package Layout

- `packages/brand`: shared tokens, utility classes, and theme helpers
- `packages/ui`: reusable UI primitives
- `packages/feature-dashboard`: reference DDD feature package used by web and API
- `packages/eslint-config`, `packages/typescript-config`: shared tooling

## API Starter Endpoints

- `GET /v1/health`
- `GET /v1/:tenant/dashboard/summary`

The dashboard summary endpoint uses shared contracts from `@repo/feature-dashboard/contracts`.

## Suggested Workflow For New Features

1. Create `packages/feature-<domain>`.
2. Define types and Zod schemas first.
3. Implement service layer.
4. Export from package entrypoint only.
5. Compose in `apps/web` routes and `apps/api` endpoints.
6. Add unit tests and route smoke tests.

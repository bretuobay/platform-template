# Monorepo Architecture & Development Guide

> **Purpose:** This document provides architectural patterns, conventions, and best practices for building scalable monorepo applications using Turborepo with vertically sliced features.

---

## Core Principles

1. **Vertical Slicing:** Features are self-contained packages with their own API, components, hooks, models, and services
2. **Explicit Boundaries:** Apps consume packages through barrel exports only—no deep imports
3. **Edge-First:** Prefer web standard APIs (Fetch, URL, Web Streams, `crypto.subtle`) for maximum portability
4. **Minimal Testing:** Focus unit tests on utils and pure logic; avoid over-testing UI components
5. **Type Safety:** Leverage TypeScript project references and strict mode throughout
6. Always use note 20+ ( nvm use 23 )

---

## Monorepo Structure

```
/
├─ apps/                   # Deployable applications
│  ├─ web-admin/           # Vite + React client apps(later)
|  |-- web                 # Vite + React client app
│  ├─ landing/             # Next.js marketing/landing pages
│  └─ edge-*/              # Cloudflare Workers (API/backend)
│
├─ packages/               # Reusable packages
│  ├─ feature-*/           # Vertically sliced features (Bulletproof React pattern)
│  ├─ ui/                  # Design system components
│  ├─ entities/            # Domain entities (pure TypeScript)
│  ├─ validation/          # Shared zod schemas
│  ├─ utils/               # Pure utility functions
│  ├─ api-client/          # HTTP client & data fetching wrappers
│  └─ config/              # Runtime configuration
│
├─ turbo.json              # Turborepo pipeline configuration
├─ tsconfig.base.json      # Base TypeScript config with path aliases
└─ package.json            # Workspace root
```

### Key Rules

- **Apps depend on packages** — never app-to-app imports
- **Packages expose minimal public APIs** via `index.ts` barrel exports
- **Workers consume non-React packages** only (entities, validation, utils)
- **Feature packages** may depend on ui, entities, validation, utils, api-client
- **No cross-feature imports** — features should be independent

---

## Package Types

### 1. Feature Packages (`packages/feature-*/`)

Vertically sliced features following Bulletproof React architecture:

```
packages/feature-example/
├─ src/
│  ├─ api/              # SWR hooks, typed fetchers
│  ├─ components/       # Feature-specific UI components
│  ├─ hooks/            # Feature-specific React hooks
│  ├─ model/            # Types, schemas, mappers
│  ├─ services/         # Pure business logic (no React)
│  ├─ index.ts          # Public API (barrel export)
│  └─ __tests__/        # Unit tests for services/utils
├─ package.json
└─ tsconfig.json
```

**Package.json template:**

```jsonc
{
  "name": "@org/feature-example",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
    },
  },
  "sideEffects": false,
  "scripts": {
    "build": "tsc -b",
    "dev": "tsc -b -w",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
  },
  "peerDependencies": {
    "react": "^18",
    "react-dom": "^18",
  },
}
```

**Barrel export (`src/index.ts`):**

```ts
// Only export public API
export * from "./components/ExampleComponent";
export * from "./hooks/useExample";
export * from "./model/types";
// Internal implementation stays private
```

### 2. Shared Packages

- **`packages/ui`**: Design system primitives (Button, Card, Modal). No app-specific state. Tailwind preferred.
- **`packages/utils`**: Pure utility functions (date, string, storage, http). Primary focus for unit tests.
- **`packages/validation`**: Zod schemas shared across apps and workers.
- **`packages/entities`**: Domain entities (pure TypeScript, no React).
- **`packages/api-client`**: Fetch wrappers, interceptors, SWR integration.
- **`packages/config`**: Runtime config readers, environment variable parsing.

---

## Application Conventions

### Vite + React Apps (`apps/web-*/`)

```
apps/web-example/
├─ src/
│  ├─ app/              # Providers, router, layouts, error boundaries
│  ├─ pages/            # Route components (optional)
│  └─ main.tsx          # Entry point
├─ index.html
├─ vite.config.ts
└─ package.json
```

**Key patterns:**

- **Routing:** React Router configured in `src/app/`
- **Data fetching:** Via `@api-client` hooks using SWR
- **Notifications:** Integrate toast library at app provider level; features use adapter
- **State management:** Prefer server state (SWR) over client state

**Toast adapter example:**

```tsx
// apps/web-example/src/app/notify.ts
import { toast } from "react-toastify";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast.info(msg),
};
```

Features import this adapter instead of toast library directly.

### Next.js Apps (`apps/landing/`)

- Standard Next.js file-based routing
- Use dynamic imports for large feature components
- Keep bundle size minimal for fast TTI
- Consume feature packages for shared presentation logic

### Cloudflare Worker Apps (`apps/edge-*/`)

```
apps/edge-api/
├─ src/
│  ├─ index.ts          # Hono app or fetch handler
│  ├─ routes/           # API routes (versioned)
│  ├─ services/         # Adapters for D1/KV/R2/Queues
│  ├─ domain/           # Pure domain logic
│  └─ utils/            # Edge-safe utilities
├─ migrations/          # D1 SQL migrations
└─ wrangler.jsonc
```

**Requirements:**

- All code must be edge-safe (no Node.js APIs)
- Use web standard APIs only
- Share validation schemas with frontend via `packages/validation`
- Type bindings for Cloudflare resources (D1, KV, R2, etc.)

**Hono example:**

```ts
import { Hono } from "hono";
import { ExampleSchema } from "@validation/example";

const app = new Hono<{ Bindings: Env }>();

app.post("/api/example", async (c) => {
  const body = await c.req.json();
  const parsed = ExampleSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid input" }, 400);
  }

  // Process request...
  return c.json({ success: true }, 201);
});

export default app;
```

---

## Turborepo Configuration

**Root `package.json`:**

```jsonc
{
  "name": "monorepo",
  "private": true,
  "packageManager": "npm@10",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
  },
  "workspaces": ["apps/*", "packages/*"],
}
```

**`turbo.json`:**

```jsonc
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**"],
    },
    "dev": {
      "cache": false,
      "persistent": true,
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
    },
    "typecheck": {
      "dependsOn": ["^build"],
    },
    "lint": {},
  },
}
```

**`tsconfig.base.json`:**

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@ui/*": ["packages/ui/src/*"],
      "@utils/*": ["packages/utils/src/*"],
      "@validation/*": ["packages/validation/src/*"],
      "@api-client/*": ["packages/api-client/src/*"],
      "@entities/*": ["packages/entities/src/*"],
      "@feature-example": ["packages/feature-example/src/index.ts"],
    },
  },
}
```

---

## Data Fetching Pattern

### SWR Wrapper (`packages/api-client`)

```ts
// packages/api-client/src/useServerState.ts
import useSWR, { SWRConfiguration } from "swr";

export function useServerState<T>({
  key,
  fetcher,
  onSuccess,
  onError,
  config,
}: {
  key: unknown[];
  fetcher: (signal?: AbortSignal) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  config?: SWRConfiguration<T>;
}) {
  return useSWR<T>(key, (_, { signal }) => fetcher(signal), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...config,
    onSuccess,
    onError,
  });
}
```

### Feature Hook Example

```ts
// packages/feature-example/src/hooks/useExample.ts
import { useServerState } from "@api-client/useServerState";
import { notify } from "@app/notify"; // App-provided adapter

export function useExample() {
  return useServerState({
    key: ["example"],
    fetcher: async (signal) => {
      const res = await fetch("/api/example", { signal });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    onSuccess: () => notify.success("Data loaded"),
    onError: () => notify.error("Failed to load data"),
  });
}
```

---

## Testing Strategy

### Focus Areas

1. **Utils packages** — pure functions (date, string, validation helpers)
2. **Service layer** — business logic in feature packages
3. **Edge cases** — only test critical paths, not exhaustive coverage

### Testing Rules

- Use **Vitest** for all tests
- Keep tests **lean**: happy path + 1-2 edge cases
- Avoid over-testing UI components
- Use MSW only when necessary for integration tests
- Mock external dependencies at service boundaries

### Example Test

```ts
// packages/utils/src/__tests__/date.test.ts
import { describe, it, expect } from "vitest";
import { formatIso } from "../date";

describe("formatIso", () => {
  it("formats Date to ISO string", () => {
    const date = new Date("2024-01-01T12:00:00Z");
    expect(formatIso(date)).toBe("2024-01-01T12:00:00Z");
  });

  it("handles invalid dates", () => {
    expect(() => formatIso(new Date("invalid"))).toThrow();
  });
});
```

---

## UX & UI Guidelines

### Design Principles

- **Mobile-First:** Responsive from 320px up, touch-optimized
- **Color Palette:** Black and white base with minimal accent colors
- **Dark Mode Ready:** Use CSS variables for colors (future-proof)
- **App-Like Experience:** Full viewport layouts, smooth transitions, no page reloads
- **Minimal Elevation:** Clear borders over heavy shadows
- **Accessibility:** WCAG AA contrast, keyboard navigation, screen reader support

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg, #000)",
        surface: "var(--color-surface, #fff)",
        textPrimary: "var(--color-text-primary, #000)",
        textSecondary: "var(--color-text-secondary, #444)",
        border: "var(--color-border, #e5e5e5)",
        accent: "var(--color-accent, #bdbdbd)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
};
```

### Component Guidelines

- Build primitives in `packages/ui` with Tailwind
- Components should be **headless** and **composable**
- Support both light and dark themes via CSS variables
- Ensure touch targets are minimum 44x44px
- Use semantic HTML and ARIA attributes

---

## Import & Boundary Enforcement

### Rules

1. **Only import from package barrels** — no deep imports
2. **Apps may depend on any packages** — but not other apps
3. **Feature packages** may depend on: ui, entities, validation, utils, api-client
4. **Workers** may only depend on non-React packages
5. **No circular dependencies** between packages

### Enforcement via `package.json`

```jsonc
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
    },
  },
  "files": ["dist"],
}
```

This prevents deep imports by only exposing the barrel export.

---

## Environment & Configuration

### Client Environment Variables

- Prefix with `VITE_PUBLIC_*` for Vite apps
- Prefix with `NEXT_PUBLIC_*` for Next.js apps
- Never expose secrets in client bundles

### Worker Secrets

- Store in `wrangler.jsonc` or use `wrangler secret put`
- Access via `env` bindings in worker context
- Share non-sensitive config via `packages/config`

### Config Package Pattern

```ts
// packages/config/src/client.ts
export const clientConfig = {
  apiUrl: import.meta.env.VITE_PUBLIC_API_URL,
  environment: import.meta.env.VITE_PUBLIC_ENV,
} as const;

// packages/config/src/server.ts
export function getServerConfig(env: Env) {
  return {
    databaseUrl: env.DATABASE_URL,
    apiKey: env.API_KEY,
  };
}
```

---

## CI/CD Pipeline

### CI Steps

1. **Install dependencies** — `npm ci`
2. **Lint** — `turbo run lint`
3. **Type check** — `turbo run typecheck`
4. **Test** — `turbo run test`
5. **Build** — `turbo run build`

### Deployment Strategy

- **Vite apps** → Cloudflare Pages (per app)
- **Next.js** → Cloudflare Pages (static export or SSR)
- **Workers** → `wrangler deploy` with D1 migrations
- **Preview deploys** for all PRs
- **Production deploys** on merge to main

### Migration Handling

- Run D1 migrations before traffic switch
- Use `wrangler d1 migrations apply` in CI
- Keep migrations idempotent and reversible

---

## AI Prompting Guide

### Effective Prompts

✅ **Good:**

- "Scaffold `packages/feature-todos` with api/components/hooks/model/services and barrel export"
- "Add POST `/api/todos` route in `apps/edge-api` validating with zod from `packages/validation`"
- "Create `packages/ui/Button` with Tailwind and accessibility attributes"
- "Add `useServerState` wrapper to `packages/api-client` with SWR defaults"

❌ **Avoid:**

- "Make the app better" (too vague)
- "Add everything for user management" (too broad)
- "Use Node.js fs module in worker" (violates edge-safe rule)
- "Import directly from feature internals" (violates boundary rules)

### Context to Provide

- Specify which package or app you're working in
- Reference existing patterns to follow
- Mention dependencies on other packages
- Clarify if it's client-side, server-side, or edge code

---

## Migration Checklist

When adopting this architecture in an existing project:

- [ ] Create `apps/*` and `packages/*` directory structure
- [ ] Move features into `packages/feature-*` with Bulletproof layout
- [ ] Extract shared UI to `packages/ui`
- [ ] Extract utilities to `packages/utils`
- [ ] Extract domain entities to `packages/entities`
- [ ] Centralize schemas in `packages/validation`
- [ ] Create `packages/api-client` with SWR wrapper
- [ ] Add barrel exports to all packages
- [ ] Configure TypeScript project references
- [ ] Set up Turborepo pipeline
- [ ] Add `exports` fences to prevent deep imports
- [ ] Update all imports to use barrel exports
- [ ] Configure CI/CD for monorepo
- [ ] Write unit tests for utils and services
- [ ] Document package APIs and dependencies

---

## Definition of Done

A feature or package is complete when:

- ✅ Exposes stable barrel API with no deep imports
- ✅ Type-safe with strict TypeScript
- ✅ Edge-safe (if applicable to workers)
- ✅ Unit tests for utils and pure logic
- ✅ Lint and format clean
- ✅ CI pipeline passes
- ✅ Documentation updated
- ✅ D1 migrations applied (if storage changes)
- ✅ Apps integrate via barrels and adapters

---

## Common Patterns

### Error Handling

```ts
// packages/utils/src/result.ts
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}
```

### API Response Types

```ts
// packages/validation/src/api.ts
import { z } from "zod";

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
```

### Feature Service Pattern

```ts
// packages/feature-example/src/services/exampleService.ts
import type { Example } from "../model/types";

export class ExampleService {
  constructor(private apiClient: ApiClient) {}

  async getExample(id: string): Promise<Example> {
    const response = await this.apiClient.get(`/api/examples/${id}`);
    return ExampleSchema.parse(response);
  }

  async createExample(data: CreateExampleInput): Promise<Example> {
    const response = await this.apiClient.post("/api/examples", data);
    return ExampleSchema.parse(response);
  }
}
```

---

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [SWR Documentation](https://swr.vercel.app/)
- [Vitest Documentation](https://vitest.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Version

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-30  
**Node Version:** 23.x (use `nvm us

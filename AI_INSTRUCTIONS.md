# AI Coding Agent Instructions

> **For:** Claude, OpenAI Codex, Google Jules, Amazon Kiro, GitHub Copilot, and other AI coding assistants
> **Purpose:** Single source of truth for working with this Turborepo monorepo template
> **Architecture:** Bulletproof React with vertically sliced feature packages

---

## 🎯 Core Rules (Read First)

### Critical Requirements

1. **Node Version:** Always use Node 20+ (preferably 24.x via `nvm use 24`)
2. **No Deep Imports:** Only import from package barrel exports (`index.ts`)
3. **Vertical Slicing:** Features are self-contained packages
4. **Edge-First:** Use web standard APIs (Fetch, URL, Web Streams, `crypto.subtle`)
5. **Type Safety:** Strict TypeScript everywhere
6. **Minimal Testing:** Focus on utils and pure logic, not UI

### Boundary Rules

```
✅ Apps → Packages (allowed)
✅ Packages → Shared packages (ui, utils, entities, validation, api-client)
❌ Apps → Apps (forbidden)
❌ Features → Features (forbidden)
❌ Deep imports from packages (forbidden)
❌ Node.js APIs in Workers (forbidden)
```

---

## 📁 Project Structure

```
/
├─ apps/                          # Deployable applications
│  ├─ web/                         # Vite + React SPA
│  ├─ web-admin/                   # Admin dashboard (future)
│  ├─ landing/                     # Next.js marketing site
│  └─ edge-*/                      # Cloudflare Workers (API) / AWS Lambda
│
├─ packages/                       # Reusable packages
│  ├─ feature-*/                   # Vertical slices (Bulletproof pattern)
│  ├─ ui/                          # Design system components
│  ├─ entities/                    # Domain models (pure TS)
│  ├─ validation/                  # Zod schemas
│  ├─ utils/                       # Pure functions
│  ├─ api-client/                  # HTTP client + SWR wrappers
│  └─ config/                      # Runtime config
│
├─ AI_INSTRUCTIONS.md              # This file (AI reference)
├─ base-repo-architecture.md       # Detailed architecture doc
├─ turbo.json                      # Pipeline config
├─ tsconfig.base.json              # Shared TS config
└─ package.json                    # Workspace root
```

---

## 🤖 AI Agent Quick Start

### Before Starting Any Task

1. **Check Node version:** Ensure Node 20+ is active
2. **Read the context:** If adding/modifying features, read existing similar packages first
3. **Follow patterns:** Match existing code style and structure exactly
4. **Use TodoWrite:** For multi-step tasks, create a todo list to track progress

### When Asked To...

#### "Create a new feature"

```bash
# 1. Scaffold structure
mkdir -p packages/feature-{name}/src/{api,components,hooks,model,services,__tests__}

# 2. Create package.json (see template below)

# 3. Create barrel export (src/index.ts)
# Only export public API, keep internals private

# 4. Add to tsconfig.base.json paths:
# "@feature-{name}": ["packages/feature-{name}/src/index.ts"]
```

#### "Add a UI component"

```bash
# If feature-specific → packages/feature-{name}/src/components/
# If reusable → packages/ui/src/

# Always:
# - Use Tailwind CSS
# - Support light/dark mode via CSS variables
# - Ensure 44x44px minimum touch targets
# - Add ARIA attributes for accessibility
```

#### "Add an API endpoint"

```bash
# 1. Add route in apps/edge-*/src/routes/
# 2. Import validation from @validation/*
# 3. Use Hono for routing
# 4. Ensure edge-safe (no Node.js APIs)
```

#### "Add shared utility"

```bash
# Location: packages/utils/src/
# MUST include unit tests in __tests__/
# Export from packages/utils/src/index.ts
```

---

## 📦 Package Templates

### Feature Package (`packages/feature-example/`)

**Directory Structure:**

```
packages/feature-example/
├─ src/
│  ├─ api/              # SWR hooks, typed fetchers
│  ├─ components/       # React components
│  ├─ hooks/            # Custom hooks
│  ├─ model/            # Types, schemas, mappers
│  ├─ services/         # Pure business logic (no React)
│  ├─ index.ts          # Barrel export (public API)
│  └─ __tests__/        # Tests for services/utils
├─ package.json
└─ tsconfig.json
```

**package.json:**

```json
{
  "name": "@repo/feature-example",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "sideEffects": false,
  "scripts": {
    "build": "tsc -b",
    "dev": "tsc -b -w",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18",
    "react-dom": "^18"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/utils": "workspace:*",
    "@repo/validation": "workspace:*",
    "@repo/api-client": "workspace:*"
  }
}
```

**src/index.ts (Barrel Export):**

```ts
// Only export public API
export * from "./components/ExampleComponent";
export * from "./hooks/useExample";
export * from "./model/types";
// Internal implementation stays private (api/, services/)
```

### Shared Package (`packages/utils/`)

**package.json:**

```json
{
  "name": "@repo/utils",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js"
  },
  "sideEffects": false,
  "scripts": {
    "build": "tsc -b",
    "dev": "tsc -b -w",
    "test": "vitest run"
  }
}
```

---

## 🎨 UI/UX Standards

### Design System Rules

**Colors (Tailwind + CSS Variables):**

```js
// tailwind.config.js
colors: {
  background: "var(--color-bg, #000)",
  surface: "var(--color-surface, #fff)",
  textPrimary: "var(--color-text-primary, #000)",
  textSecondary: "var(--color-text-secondary, #444)",
  border: "var(--color-border, #e5e5e5)",
  accent: "var(--color-accent, #bdbdbd)",
}
```

**Component Checklist:**

- [ ] Mobile-first (320px+)
- [ ] Touch targets 44x44px minimum
- [ ] Dark mode support via CSS variables
- [ ] WCAG AA contrast compliance
- [ ] Keyboard navigation
- [ ] Screen reader friendly (ARIA labels)
- [ ] Semantic HTML

**Preferred Patterns:**

- Headless, composable components
- Minimal shadows, clear borders instead
- App-like feel (no page reloads, smooth transitions)

---

## 🔌 Data Fetching Pattern

### SWR Wrapper (`packages/api-client`)

**Create wrapper:**

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
// packages/feature-example/src/api/useExample.ts
import { useServerState } from "@repo/api-client";
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
    onError: () => notify.error("Failed to load"),
  });
}
```

---

## ⚡ Cloudflare Workers (Edge)

### Rules for Edge Code

**Allowed:**

- ✅ Fetch API
- ✅ Web Streams
- ✅ URL API
- ✅ crypto.subtle
- ✅ Hono framework
- ✅ Zod validation
- ✅ @repo/validation, @repo/entities, @repo/utils

**Forbidden:**

- ❌ Node.js `fs`, `path`, `crypto` modules
- ❌ React (no JSX in workers)
- ❌ Any package with React peer dependencies

### Worker Template (Hono)

```ts
// apps/edge-api/src/index.ts
import { Hono } from "hono";
import { ExampleSchema } from "@repo/validation";

type Bindings = {
  DB: D1Database;
  KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/api/example", async (c) => {
  const body = await c.req.json();
  const parsed = ExampleSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid input", issues: parsed.error.issues }, 400);
  }

  // Use bindings: c.env.DB, c.env.KV
  const result = await c.env.DB.prepare("SELECT * FROM examples WHERE id = ?")
    .bind(parsed.data.id)
    .first();

  return c.json({ success: true, data: result }, 200);
});

export default app;
```

---

## 🧪 Testing Strategy

### What to Test

**High Priority (MUST test):**

- Pure utility functions (`packages/utils`)
- Service layer business logic (`packages/feature-*/services`)
- Validation schemas edge cases

**Low Priority (optional):**

- React components (only if complex logic)
- Simple UI interactions

### Test Template (Vitest)

```ts
// packages/utils/src/__tests__/formatDate.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("formats date to ISO string", () => {
    const date = new Date("2024-01-01T12:00:00Z");
    expect(formatDate(date)).toBe("2024-01-01");
  });

  it("handles invalid dates", () => {
    expect(() => formatDate(new Date("invalid"))).toThrow();
  });
});
```

**Test Coverage Rules:**

- Happy path + 1-2 edge cases
- No need for 100% coverage
- Avoid over-testing

---

## 🚀 Common Commands

### Development

```bash
# Install dependencies
npm install

# Start all apps in dev mode
npm run dev

# Start specific app
npm run dev --filter=web

# Build all packages
npm run build

# Type check
npm run typecheck

# Run tests
npm run test
```

### Adding Dependencies

```bash
# Add to specific package
npm install <package> --workspace=packages/feature-example

# Add to root (dev dependencies)
npm install -D <package>

# Add workspace dependency
# In package.json: "@repo/utils": "workspace:*"
```

### Creating New Package

```bash
# 1. Create directory
mkdir -p packages/feature-example/src

# 2. Copy package.json template from this doc

# 3. Add to tsconfig.base.json:
# "@repo/feature-example": ["packages/feature-example/src/index.ts"]

# 4. Run install
npm install
```

---

## ✅ AI Task Checklists

### Before Writing Code

- [ ] Read existing similar packages/components
- [ ] Check if pattern exists elsewhere to follow
- [ ] Verify Node version (20+)
- [ ] Understand which package type is needed

### Creating Feature Package

- [ ] Scaffold directory structure (api, components, hooks, model, services, **tests**)
- [ ] Create package.json with correct name and dependencies
- [ ] Add tsconfig.json extending base config
- [ ] Create barrel export (src/index.ts)
- [ ] Add path alias to tsconfig.base.json
- [ ] Run `npm install`
- [ ] Verify it builds: `npm run build --workspace=packages/feature-{name}`

### Creating UI Component

- [ ] Determine if feature-specific or shared (ui package)
- [ ] Use Tailwind CSS with design system colors
- [ ] Add dark mode support via CSS variables
- [ ] Ensure 44x44px minimum touch targets
- [ ] Add ARIA labels and semantic HTML
- [ ] Export from barrel (index.ts)
- [ ] Test mobile responsiveness

### Creating API Endpoint (Worker)

- [ ] Add route in apps/edge-{name}/src/routes/
- [ ] Import validation schema from @repo/validation
- [ ] Use Hono for routing
- [ ] Verify no Node.js APIs used
- [ ] Add error handling with proper status codes
- [ ] Type Cloudflare bindings (D1, KV, R2)
- [ ] Test locally with `wrangler dev`

### Adding Utility Function

- [ ] Add to packages/utils/src/
- [ ] Write unit tests in **tests**/
- [ ] Export from packages/utils/src/index.ts
- [ ] Run tests: `npm run test --workspace=packages/utils`
- [ ] Ensure pure function (no side effects)

---

## 🚫 Common Mistakes to Avoid

### Imports

```ts
// ❌ Bad: Deep imports
import { Button } from "@repo/ui/src/components/Button";

// ✅ Good: Barrel imports
import { Button } from "@repo/ui";
```

### Feature Dependencies

```ts
// ❌ Bad: Cross-feature import
import { useAuth } from "@repo/feature-auth";
// in packages/feature-profile

// ✅ Good: Share via entities/utils
import { User } from "@repo/entities";
```

### Worker Code

```ts
// ❌ Bad: Node.js API
import * as fs from "fs";
import crypto from "crypto";

// ✅ Good: Web standard APIs
const hash = await crypto.subtle.digest("SHA-256", data);
```

### Component Styling

```tsx
// ❌ Bad: Hardcoded colors
<button className="bg-black text-white">Click</button>

// ✅ Good: Design system tokens
<button className="bg-background text-textPrimary">Click</button>
```

---

## 📝 Code Patterns Reference

### Result Type (Error Handling)

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

// Usage
const result = await someOperation();
if (!result.ok) {
  return { error: result.error };
}
return { data: result.value };
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

### Service Pattern

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

### Notification Adapter Pattern

```ts
// apps/web/src/app/notify.ts
import { toast } from "react-toastify";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast.info(msg),
};

// Features import this adapter instead of toast library directly
```

---

## 🎯 AI-Specific Instructions

### For Claude Code/Sonnet/Opus

- Use `TodoWrite` tool for multi-step tasks
- Read similar packages before creating new ones
- Use `Glob` to find existing patterns
- Always verify imports use barrel exports

### For GitHub Copilot

- Read this file and base-repo-architecture.md for context
- Follow Bulletproof React structure strictly
- Match existing code style
- Use workspace dependencies format: `"workspace:*"`

### For Cursor/Codex

- Reference existing packages in the same category
- Follow naming conventions exactly
- Ensure all exports go through index.ts
- Use web standard APIs in edge functions

### For Google Jules/Amazon Kiro

- Parse directory structure to understand package types
- Cross-reference with existing similar packages
- Follow dependency rules (apps → packages, no circular deps)
- Verify TypeScript strict mode compliance

---

## 🔗 File Naming Conventions

### Packages

```
packages/
├─ feature-{name}/          # Features use kebab-case with "feature-" prefix
├─ ui/                      # Single word, lowercase
├─ utils/                   # Plural form
└─ validation/              # Descriptive, lowercase
```

### Components

```tsx
// PascalCase for component files
Button.tsx;
UserProfile.tsx;
AuthForm.tsx;

// camelCase for utilities
formatDate.ts;
httpClient.ts;
storage.ts;
```

### Tests

```
// Match source file name with .test.ts suffix
formatDate.ts → formatDate.test.ts
UserService.ts → UserService.test.ts
```

---

## 📚 Quick Reference Links

**Internal Docs:**

- Full architecture: `base-repo-architecture.md`
- Package list: `packages/*/package.json`
- TypeScript paths: `tsconfig.base.json`
- Build pipeline: `turbo.json`

**External Resources:**

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [SWR Docs](https://swr.vercel.app/)
- [Hono Framework](https://hono.dev/)
- [Vitest](https://vitest.dev/)

---

## 🎓 Example Prompts for AI Agents

### Good Prompts ✅

```
"Create packages/feature-todos with Bulletproof structure including api, components, hooks, model, services, and barrel export"

"Add POST /api/todos endpoint in apps/edge-api validating input with TodoSchema from @repo/validation"

"Create Button component in packages/ui with Tailwind, dark mode support, and accessibility"

"Add useServerState wrapper to packages/api-client with SWR and error handling"

"Write unit tests for formatDate in packages/utils covering happy path and edge cases"
```

### Bad Prompts ❌

```
"Make the app better" (too vague)

"Add user management" (too broad, unclear scope)

"Use fs module to read files in worker" (violates edge-safe rule)

"Import UserCard from feature-users in feature-profile" (violates no cross-feature rule)

"Install lodash globally" (unclear which package needs it)
```

---

## 📋 Definition of Done

A task is complete when:

- [ ] **Code Quality**
  - [ ] TypeScript strict mode passes
  - [ ] No linting errors
  - [ ] Follows existing patterns in similar packages
  - [ ] Uses barrel exports only (no deep imports)

- [ ] **Testing**
  - [ ] Unit tests for utils and services
  - [ ] Tests pass: `npm run test`
  - [ ] Edge cases covered (if applicable)

- [ ] **Build & Deploy**
  - [ ] Builds successfully: `npm run build`
  - [ ] Type checks pass: `npm run typecheck`
  - [ ] CI pipeline would pass

- [ ] **Documentation**
  - [ ] Exported functions have JSDoc comments
  - [ ] README updated (if package is new)
  - [ ] Breaking changes noted

- [ ] **Integration**
  - [ ] Apps consume via barrel exports
  - [ ] Adapters created for app-specific dependencies
  - [ ] No circular dependencies

---

## 🔄 Version Control

**Current Template Version:** 1.0.0
**Node Version:** 23.x (use `nvm use 23`)
**Last Updated:** 2025-01-06

---

## 💡 Tips for AI Agents

1. **Read before writing:** Always read existing similar code to match patterns
2. **Follow the structure:** Don't deviate from established directory layouts
3. **Import discipline:** Only use barrel exports, never deep imports
4. **Edge-safe check:** If it's for a worker, verify no Node.js APIs
5. **Test coverage:** Write tests for utils and services, skip UI unless complex
6. **Mobile-first:** All UI should work from 320px up
7. **Dark mode:** Always support via CSS variables
8. **Accessibility:** 44px touch targets, ARIA labels, semantic HTML
9. **TypeScript strict:** Enable strict mode, no `any` types
10. **Keep it simple:** Don't over-engineer, match existing complexity level

---

**End of AI Instructions**

For detailed architectural context, see `base-repo-architecture.md`

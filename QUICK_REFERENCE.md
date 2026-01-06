# Quick Reference Card

> **1-page cheatsheet for developers and AI agents**

## 🎯 Core Rules

```
✅ Barrel exports only          ❌ No deep imports
✅ Apps → Packages              ❌ Apps → Apps
✅ Features → Shared libs       ❌ Features → Features
✅ Web standard APIs in workers ❌ Node.js APIs in workers
✅ TypeScript strict mode       ❌ any types
```

## 📁 Structure

```
apps/          → web, web-admin, landing, edge-*
packages/
├─ feature-*/ → api, components, hooks, model, services
├─ ui/        → Design system
├─ utils/     → Pure functions (MUST TEST)
├─ entities/  → Domain models
├─ validation/→ Zod schemas
└─ api-client/→ SWR wrappers
```

## 🚀 Commands

```bash
npm run dev              # All apps
npm run build            # All packages
npm run typecheck        # Type check
npm run test             # Tests
npm install <pkg> -w packages/feature-x  # Add dep
```

## 📦 New Feature Package

```bash
# 1. Create
mkdir -p packages/feature-x/src/{api,components,hooks,model,services,__tests__}

# 2. package.json
{
  "name": "@repo/feature-x",
  "type": "module",
  "main": "./dist/index.js",
  "exports": { ".": "./dist/index.js" },
  "scripts": { "build": "tsc -b", "dev": "tsc -b -w" },
  "peerDependencies": { "react": "^18" }
}

# 3. src/index.ts (barrel)
export * from "./components/X"
export * from "./hooks/useX"

# 4. tsconfig.base.json
"@repo/feature-x": ["packages/feature-x/src/index.ts"]

# 5. Install
npm install
```

## 🎨 UI Component

```tsx
// packages/ui/src/Button.tsx
export function Button({ children, ...props }) {
  return (
    <button
      className="bg-background text-textPrimary px-4 py-2 rounded"
      {...props}
    >
      {children}
    </button>
  )
}

// Checklist:
// [ ] Tailwind with design tokens
// [ ] Dark mode via CSS vars
// [ ] 44x44px touch target
// [ ] ARIA labels
```

## 🔌 SWR Hook

```ts
// packages/feature-x/src/api/useData.ts
import { useServerState } from "@repo/api-client"
import { notify } from "@app/notify"

export function useData() {
  return useServerState({
    key: ["data"],
    fetcher: async (signal) => {
      const res = await fetch("/api/data", { signal })
      if (!res.ok) throw new Error("Failed")
      return res.json()
    },
    onSuccess: () => notify.success("Loaded"),
    onError: () => notify.error("Failed")
  })
}
```

## ⚡ Worker Route (Hono)

```ts
// apps/edge-api/src/index.ts
import { Hono } from "hono"
import { Schema } from "@repo/validation"

const app = new Hono<{ Bindings: Env }>()

app.post("/api/resource", async (c) => {
  const result = Schema.safeParse(await c.req.json())
  if (!result.success) {
    return c.json({ error: result.error.issues }, 400)
  }
  // Use c.env.DB, c.env.KV
  return c.json({ success: true }, 200)
})

export default app
```

## 🧪 Test Template

```ts
// packages/utils/src/__tests__/fn.test.ts
import { describe, it, expect } from "vitest"
import { fn } from "../fn"

describe("fn", () => {
  it("happy path", () => {
    expect(fn("input")).toBe("output")
  })

  it("edge case", () => {
    expect(() => fn(null)).toThrow()
  })
})
```

## 🎨 Design Tokens

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

## 🚫 Common Mistakes

```ts
// ❌ Deep import
import { Button } from "@repo/ui/src/components/Button"

// ✅ Barrel import
import { Button } from "@repo/ui"

// ❌ Cross-feature
import { useAuth } from "@repo/feature-auth" // in feature-profile

// ✅ Share via entities
import { User } from "@repo/entities"

// ❌ Node.js in worker
import fs from "fs"

// ✅ Web standard
await crypto.subtle.digest("SHA-256", data)

// ❌ Hardcoded color
<div className="bg-black text-white">

// ✅ Design token
<div className="bg-background text-textPrimary">
```

## 📝 Naming Conventions

```
packages/feature-todo/     # kebab-case with prefix
components/TodoList.tsx    # PascalCase
utils/formatDate.ts        # camelCase
__tests__/formatDate.test.ts  # Match source + .test.ts
```

## ✅ Definition of Done

```
[ ] Barrel exports only
[ ] TypeScript strict passes
[ ] Tests for utils/services
[ ] No Node.js APIs in workers
[ ] Design tokens used
[ ] npm run build succeeds
[ ] npm run typecheck passes
[ ] Mobile responsive (320px+)
[ ] Dark mode support
[ ] Accessibility (ARIA)
```

## 🎯 Good AI Prompts

```
✅ "Create packages/feature-todos with Bulletproof structure"
✅ "Add POST /api/todos in apps/edge-api with Zod validation"
✅ "Create Button in packages/ui with Tailwind and a11y"
✅ "Add formatDate to packages/utils with tests"

❌ "Make it better" (vague)
❌ "Add users" (too broad)
❌ "Use fs in worker" (violates rules)
```

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `AI_INSTRUCTIONS.md` | Complete guide |
| `.cursorrules` | Cursor/Windsurf |
| `.clinerules` | Claude Code |
| `base-repo-architecture.md` | Detailed architecture |
| `QUICK_REFERENCE.md` | This file |

## 🔗 Package Dependencies

```
Feature packages can depend on:
├─ @repo/ui
├─ @repo/utils
├─ @repo/entities
├─ @repo/validation
└─ @repo/api-client

Workers can only depend on:
├─ @repo/utils
├─ @repo/entities
└─ @repo/validation
```

## 💡 Pro Tips

1. **Read first:** Check similar code before writing
2. **Match patterns:** Follow existing structure exactly
3. **Test utils:** Always test pure functions
4. **Skip UI tests:** Unless complex logic
5. **Mobile-first:** 320px minimum
6. **Dark mode:** CSS variables
7. **44px targets:** Touch-friendly
8. **Edge-safe:** Web APIs only in workers

---

**Node:** 20+ (23.x preferred) | **Docs:** AI_INSTRUCTIONS.md | **Version:** 1.0.0

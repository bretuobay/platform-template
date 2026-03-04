# Platform Brand Package

Shared brand tokens, Tailwind v4 utility classes, and theme primitives used by template apps.

## What It Provides

- Token-first color, typography, spacing, and shadow primitives via CSS.
- Reusable component utility classes for marketing and dashboard surfaces.
- `ThemeProvider` and `ThemeToggle` wrappers based on `next-themes`.

## Usage

### 1. Install package

```bash
npm install @repo/brand
```

### 2. Import brand CSS in app globals

```css
@import "tailwindcss";
@import "@repo/brand/styles.css";
```

### 3. Wrap app with theme provider

```tsx
import { ThemeProvider } from '@repo/brand';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

### 4. Use utility classes

Examples: `brand-button`, `brand-input`, `surface-card`, `card-base`, `btn-primary`, `badge-info`.

## Development

```bash
npm run build
npm run lint
npm run typecheck
npm run test
```

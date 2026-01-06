# Platform Brand Package

Shared design tokens, Tailwind preset, and theme utilities that keep every app visually aligned with the Connected TV branding.

## Installation

```bash
npm install @repo/brand
```

## Usage

### Tailwind

Extend the preset from your `tailwind.config.ts`:

```ts
import brandPreset from '@repo/brand/tailwind-preset';

const config: Config = {
  presets: [brandPreset],
  content: [...],
  darkMode: 'class',
};

export default config;
```

### Global styles

Import the packaged CSS once in your `app/globals.css`:

```css
@import '@repo/brand/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Theme provider

Wrap your app with the bundled theme provider:

```tsx
import { ThemeProvider } from '@repo/brand';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

### Theme toggle (optional)

`ThemeToggle` is exported from the same entry point and relies on `next-themes` under the hood.

## Development

```bash
npm run build   # compiles ESM/CJS bundles
npm run lint    # runs eslint
npm run typecheck
npm run test    # noop filler
```

## Publishing

1. `npm run build`
2. Ensure a changeset exists (`npm run changeset` at repo root)
3. `npm run publish --workspace=@repo/brand`

The package ships both JS modules (`dist/`) and the shared CSS (`src/styles/globals.css`).

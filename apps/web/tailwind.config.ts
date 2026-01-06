import type { Config } from 'tailwindcss';
import brandPreset from '@repo/brand/tailwind-preset';

const config: Config = {
  presets: [brandPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx,mdx}',
    '../../packages/brand/src/**/*.{ts,tsx}',
  ],
};

export default config;

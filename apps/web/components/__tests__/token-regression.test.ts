import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const filesToCheck = [
  'components/marketing/Header.tsx',
  'components/marketing/Footer.tsx',
  'components/app-shell/AppHeader.tsx',
  'components/app-shell/Sidebar.tsx',
  'components/app-shell/MobileSidebar.tsx',
  'components/app-shell/BottomNav.tsx',
  'app/(marketing)/page.tsx',
];

const disallowedSurfacePatterns = /(bg-white(?:\/[\d.]+)?|bg-slate-\d+|text-slate-\d+|border-slate-\d+)/g;

describe('token regression guard', () => {
  it('does not use hardcoded white/slate color classes in key shell components', () => {
    for (const file of filesToCheck) {
      const absolutePath = join(process.cwd(), file);
      const source = readFileSync(absolutePath, 'utf8');
      const matches = source.match(disallowedSurfacePatterns);

      expect(matches, `${file} contains disallowed classes: ${matches?.join(', ')}`).toBeNull();
    }
  });
});

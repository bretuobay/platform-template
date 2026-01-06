import type { ReactNode } from 'react';

import { AppShell } from '../../components/app-shell/AppShell';

export const metadata = {
  title: 'Dashboard',
  description: 'Authenticated shell built for the platform template.',
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

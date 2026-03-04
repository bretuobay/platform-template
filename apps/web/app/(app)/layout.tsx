import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AppShell } from '../../components/app-shell/AppShell';
import { getTemplateAuthState } from '../../lib/template-auth';

export const metadata = {
  title: 'Dashboard',
  description: 'Authenticated shell built for the platform template.',
};

export default async function AppLayout({ children }: { children: ReactNode }) {
  const authState = await getTemplateAuthState();
  if (!authState) {
    redirect('/login?redirectTo=%2Fdashboard');
  }

  return <AppShell>{children}</AppShell>;
}

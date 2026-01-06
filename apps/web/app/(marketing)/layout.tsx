import type { ReactNode } from 'react';

import { MarketingFooter } from '../../components/marketing/Footer';
import { MarketingHeader } from '../../components/marketing/Header';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MarketingHeader />
      <main className="flex flex-1 flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      <MarketingFooter />
    </div>
  );
}

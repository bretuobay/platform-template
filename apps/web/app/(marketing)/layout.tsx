import type { ReactNode } from 'react';

import { MarketingFooter } from '../../components/marketing/Footer';
import { MarketingHeader } from '../../components/marketing/Header';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}

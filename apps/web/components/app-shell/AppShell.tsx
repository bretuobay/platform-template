'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { MobileSidebar } from './MobileSidebar';
import { Sidebar } from './Sidebar';

const MOBILE_SIDEBAR_ID = 'app-mobile-sidebar';

export function AppShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <div className="hidden h-full md:flex md:w-72 md:flex-shrink-0">
        <Sidebar className="h-full" />
      </div>

      <div className="flex flex-1 flex-col">
        <AppHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          isSidebarOpen={isSidebarOpen}
          sidebarId={MOBILE_SIDEBAR_ID}
        />
        <main className="flex-1 overflow-y-auto bg-background/70 pb-24 md:pb-0">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} sidebarId={MOBILE_SIDEBAR_ID} />
      <BottomNav
        onOpenMenu={() => setSidebarOpen(true)}
        isSidebarOpen={isSidebarOpen}
        sidebarId={MOBILE_SIDEBAR_ID}
      />
    </div>
  );
}

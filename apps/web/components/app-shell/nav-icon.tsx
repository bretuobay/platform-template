'use client';

import { Activity, BarChart3, LayoutDashboard, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { AppNavLink } from './nav-links';

const icons: Record<AppNavLink['icon'], LucideIcon> = {
  overview: LayoutDashboard,
  activity: Activity,
  insights: BarChart3,
  settings: Settings,
};

export function NavIcon({ icon, className }: { icon: AppNavLink['icon']; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden="true" />;
}

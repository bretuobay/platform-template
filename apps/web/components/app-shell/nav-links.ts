export interface AppNavLink {
  label: string;
  description: string;
  href: string;
  icon: 'overview' | 'activity' | 'insights' | 'settings';
  showInMobileBar?: boolean;
}

export const navLinks: AppNavLink[] = [
  {
    label: 'Overview',
    description: 'Live health and stats',
    href: '/dashboard#overview',
    icon: 'overview',
    showInMobileBar: true,
  },
  {
    label: 'Activity',
    description: 'Recent workspace updates',
    href: '/dashboard#activity',
    icon: 'activity',
    showInMobileBar: true,
  },
  {
    label: 'Insights',
    description: 'Analytics and reporting',
    href: '/dashboard#insights',
    icon: 'insights',
    showInMobileBar: true,
  },
  {
    label: 'Settings',
    description: 'Team and billing',
    href: '/dashboard#settings',
    icon: 'settings',
    showInMobileBar: true,
  },
];

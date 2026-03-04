'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react';
import type { ReactNode } from 'react';

interface ViewPaths {
  SIGN_IN: string;
  SIGN_UP: string;
  FORGOT_PASSWORD: string;
}

interface NeonAuthProviderProps {
  authClient: unknown;
  children: ReactNode;
  redirectTo?: string;
  basePath?: string;
  viewPaths?: ViewPaths;
}

const defaultViewPaths: ViewPaths = {
  SIGN_IN: 'login',
  SIGN_UP: 'signup',
  FORGOT_PASSWORD: 'reset',
};

export function NeonAuthProvider({
  authClient,
  children,
  redirectTo = '/dashboard',
  basePath = '/',
  viewPaths = defaultViewPaths,
}: NeonAuthProviderProps) {
  return (
    <NeonAuthUIProvider
      authClient={authClient as never}
      redirectTo={redirectTo}
      basePath={basePath}
      viewPaths={viewPaths}
    >
      {children}
    </NeonAuthUIProvider>
  );
}

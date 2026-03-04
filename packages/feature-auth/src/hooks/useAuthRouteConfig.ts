'use client';

import { useMemo } from 'react';

import type { AuthPageView, AuthRouteViewConfig } from '../model/types';
import { getAuthPageCopy, type AuthCopyOptions } from '../services/copy';
import { resolveAuthRedirect } from '../services/redirect';

interface UseAuthRouteConfigOptions {
  view: AuthPageView;
  redirectTo?: string;
  fallbackRedirect?: string;
  copyOptions?: AuthCopyOptions;
}

export function useAuthRouteConfig({
  view,
  redirectTo,
  fallbackRedirect = '/dashboard',
  copyOptions,
}: UseAuthRouteConfigOptions): AuthRouteViewConfig {
  return useMemo(
    () => ({
      path: view,
      copy: getAuthPageCopy(view, copyOptions),
      redirectTo: resolveAuthRedirect(redirectTo, fallbackRedirect),
    }),
    [copyOptions, fallbackRedirect, redirectTo, view],
  );
}

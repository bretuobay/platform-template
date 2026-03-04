export type AuthPageView = 'login' | 'signup' | 'reset';

export interface AuthPageCopy {
  eyebrow: string;
  title: string;
  description: string;
  formTitle: string;
  assistance: string;
}

export interface AuthRouteViewConfig {
  path: AuthPageView;
  redirectTo: string;
  copy: AuthPageCopy;
}

export interface LocalDevBypassState {
  enabled: true;
  userId: string;
  tenantId: string;
  role: string;
  email: string;
}

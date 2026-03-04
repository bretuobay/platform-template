'use client';

import { AuthView } from '@neondatabase/auth/react';
import type { AuthLocalization, AuthViewClassNames } from '@neondatabase/auth/react/ui';
import { clsx } from 'clsx';

import { useAuthRouteConfig } from '../hooks/useAuthRouteConfig';
import type { AuthPageView } from '../model/types';
import type { AuthCopyOptions } from '../services/copy';

interface AuthNeonViewProps {
  view: AuthPageView;
  redirectTo?: string;
  fallbackRedirect?: string;
  copyOptions?: AuthCopyOptions;
  className?: string;
}

export const authViewClassNames: AuthViewClassNames = {
  base: 'auth-form-view-root',
  header: 'auth-form-header',
  title: 'auth-form-title',
  description: 'auth-form-description',
  content: 'auth-form-content',
  continueWith: 'auth-form-continue-with',
  separator: 'auth-form-separator',
  footer: 'auth-form-footer',
  footerLink: 'auth-form-footer-link',
  form: {
    base: 'auth-form-stack',
    button: 'auth-form-button',
    checkbox: 'auth-form-checkbox',
    description: 'auth-form-helper',
    error: 'auth-form-error',
    forgotPasswordLink: 'auth-form-forgot-link',
    icon: 'auth-form-icon',
    input: 'auth-form-input',
    label: 'auth-form-label',
    otpInput: 'auth-form-otp-input',
    otpInputContainer: 'auth-form-otp-container',
    outlineButton: 'auth-form-button-outline',
    primaryButton: 'auth-form-button-primary',
    providerButton: 'auth-form-provider-button',
    qrCode: 'auth-form-qr',
    secondaryButton: 'auth-form-button-secondary',
  },
};

export const authLocalizationOverrides: Partial<AuthLocalization> = {
  APP: 'Platform Template',
  SIGN_IN_ACTION: 'Sign in',
  SIGN_IN_DESCRIPTION: 'Enter your email and password to continue.',
  SIGN_UP_ACTION: 'Create account',
  SIGN_UP_DESCRIPTION: 'Enter your details to create your account.',
  FORGOT_PASSWORD: 'Reset password',
  FORGOT_PASSWORD_ACTION: 'Send reset link',
  FORGOT_PASSWORD_DESCRIPTION: 'Enter your account email to reset your password.',
  RESET_PASSWORD_ACTION: 'Save new password',
  RESET_PASSWORD_DESCRIPTION: 'Set a new password to continue securely.',
  DONT_HAVE_AN_ACCOUNT: "Don't have an account yet?",
  ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
  FORGOT_PASSWORD_LINK: 'Forgot your password?',
  OR_CONTINUE_WITH: 'Or continue with',
};

export function AuthNeonView({ view, redirectTo, fallbackRedirect, copyOptions, className }: AuthNeonViewProps) {
  const { path, redirectTo: resolvedRedirect, copy } = useAuthRouteConfig({
    view,
    redirectTo,
    fallbackRedirect,
    copyOptions,
  });

  return (
    <section className={clsx('space-y-5', className)}>
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{copy.eyebrow}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">{copy.formTitle}</h2>
      </header>

      <AuthView path={path} redirectTo={resolvedRedirect} className="w-full max-w-none" />

      <p className="text-sm text-text-secondary">{copy.assistance}</p>
    </section>
  );
}

'use server';

import { resolveAuthRedirect } from '@repo/feature-auth';
import { redirect } from 'next/navigation';

import { createTemplateAuthSession } from '../../lib/template-auth';

function getFormValue(formData: FormData, field: string): string {
  const raw = formData.get(field);
  return typeof raw === 'string' ? raw.trim() : '';
}

function buildRedirectTarget(input: string): string {
  return resolveAuthRedirect(input, '/dashboard');
}

export async function signInTemplateAction(formData: FormData): Promise<never> {
  const email = getFormValue(formData, 'email').toLowerCase();
  const redirectTo = buildRedirectTarget(getFormValue(formData, 'redirectTo'));

  if (!email) {
    redirect(`/login?error=missing_email&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  await createTemplateAuthSession({
    email,
    flow: 'signin',
  });

  redirect(redirectTo);
}

export async function signUpTemplateAction(formData: FormData): Promise<never> {
  const fullName = getFormValue(formData, 'fullName');
  const email = getFormValue(formData, 'email').toLowerCase();
  const redirectTo = buildRedirectTarget(getFormValue(formData, 'redirectTo'));

  if (!fullName || !email) {
    redirect(`/signup?error=missing_fields&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  await createTemplateAuthSession({
    email,
    fullName,
    flow: 'signup',
  });

  redirect(redirectTo);
}

export async function resetTemplatePasswordAction(formData: FormData): Promise<never> {
  const email = getFormValue(formData, 'email');

  if (!email) {
    redirect('/reset?error=missing_email');
  }

  redirect(`/reset?status=sent&email=${encodeURIComponent(email)}`);
}

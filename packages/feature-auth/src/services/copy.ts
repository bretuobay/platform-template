import type { AuthPageCopy, AuthPageView } from '../model/types';

export interface AuthCopyOptions {
  appName?: string;
  workspaceLabel?: string;
  supportMessage?: string;
}

const DEFAULT_APP_NAME = 'Platform Template';
const DEFAULT_WORKSPACE_LABEL = 'workspace';

function buildDefaultSupportMessage(appName: string): string {
  return `Need help? Contact your ${appName} administrator.`;
}

export function getAuthPageCopy(view: AuthPageView, options: AuthCopyOptions = {}): AuthPageCopy {
  const appName = options.appName?.trim() || DEFAULT_APP_NAME;
  const workspaceLabel = options.workspaceLabel?.trim() || DEFAULT_WORKSPACE_LABEL;
  const supportMessage = options.supportMessage?.trim() || buildDefaultSupportMessage(appName);

  if (view === 'signup') {
    return {
      eyebrow: appName,
      title: `Create your ${workspaceLabel} account`,
      description: `Set up your ${appName} account to access your organization data.`,
      formTitle: 'Create account',
      assistance: supportMessage,
    };
  }

  if (view === 'reset') {
    return {
      eyebrow: appName,
      title: 'Reset your password',
      description: `We will send a reset link so you can securely access your ${workspaceLabel}.`,
      formTitle: 'Reset password',
      assistance: supportMessage,
    };
  }

  return {
    eyebrow: appName,
    title: `Sign in to your ${workspaceLabel}`,
    description: `Use your ${appName} account credentials to continue.`,
    formTitle: 'Sign in',
    assistance: supportMessage,
  };
}

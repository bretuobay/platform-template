import { getLocalDevBypassState } from '@repo/feature-auth';
import { cookies } from 'next/headers';

const TEMPLATE_AUTH_COOKIE = 'platform_template_auth_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SessionFlow = 'signin' | 'signup';

interface StoredTemplateSession {
  email: string;
  fullName: string;
  flow: SessionFlow;
  createdAt: string;
}

export interface TemplateAuthState {
  mode: 'session' | 'bypass';
  email: string;
  fullName: string;
  flow: SessionFlow | 'bypass';
  role?: string;
  tenantId?: string;
}

export interface CreateTemplateAuthSessionInput {
  email: string;
  fullName?: string;
  flow: SessionFlow;
}

function parseSessionCookie(rawValue: string | undefined): StoredTemplateSession | null {
  if (!rawValue) {
    return null;
  }

  try {
    const decodedValue = decodeURIComponent(rawValue);
    const parsed = JSON.parse(decodedValue) as Partial<StoredTemplateSession>;
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    if (typeof parsed.email !== 'string' || typeof parsed.fullName !== 'string') {
      return null;
    }

    if (parsed.flow !== 'signin' && parsed.flow !== 'signup') {
      return null;
    }

    if (typeof parsed.createdAt !== 'string') {
      return null;
    }

    return {
      email: parsed.email,
      fullName: parsed.fullName,
      flow: parsed.flow,
      createdAt: parsed.createdAt,
    };
  } catch {
    return null;
  }
}

function resolveFullName(email: string, fullName?: string): string {
  const configuredName = fullName?.trim();
  if (configuredName) {
    return configuredName;
  }

  const [localPart] = email.split('@');
  if (!localPart) {
    return 'Template User';
  }

  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export async function getTemplateAuthState(): Promise<TemplateAuthState | null> {
  const devBypassState = getLocalDevBypassState();
  if (devBypassState) {
    return {
      mode: 'bypass',
      flow: 'bypass',
      email: devBypassState.email,
      fullName: resolveFullName(devBypassState.email),
      role: devBypassState.role,
      tenantId: devBypassState.tenantId,
    };
  }

  const cookieStore = await cookies();
  const storedSession = parseSessionCookie(cookieStore.get(TEMPLATE_AUTH_COOKIE)?.value);
  if (!storedSession) {
    return null;
  }

  return {
    mode: 'session',
    flow: storedSession.flow,
    email: storedSession.email,
    fullName: storedSession.fullName,
  };
}

export async function createTemplateAuthSession({ email, fullName, flow }: CreateTemplateAuthSessionInput): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const resolvedName = resolveFullName(normalizedEmail, fullName);

  const cookieStore = await cookies();
  const value = encodeURIComponent(
    JSON.stringify({
      email: normalizedEmail,
      fullName: resolvedName,
      flow,
      createdAt: new Date().toISOString(),
    } satisfies StoredTemplateSession),
  );

  cookieStore.set(TEMPLATE_AUTH_COOKIE, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearTemplateAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TEMPLATE_AUTH_COOKIE);
}

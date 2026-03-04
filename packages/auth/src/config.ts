import { z } from 'zod';

export const authEnvSchema = z.object({
  NEON_AUTH_BASE_URL: z.string().url(),
  NEON_AUTH_COOKIE_SECRET: z.string().min(32).optional(),
});

export interface AuthEnv {
  NEON_AUTH_BASE_URL: string;
  NEON_AUTH_COOKIE_SECRET?: string;
}

export function getAuthEnv(): AuthEnv {
  const parsed = authEnvSchema.safeParse({
    NEON_AUTH_BASE_URL: process.env.NEON_AUTH_BASE_URL ?? process.env.BETTER_AUTH_URL,
    NEON_AUTH_COOKIE_SECRET: process.env.NEON_AUTH_COOKIE_SECRET ?? process.env.BETTER_AUTH_SECRET,
  });

  if (!parsed.success) {
    throw new Error(`Invalid Neon auth configuration: ${parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')}`);
  }

  const env = parsed.data;

  if (process.env.NODE_ENV === 'production' && !env.NEON_AUTH_BASE_URL.startsWith('https://')) {
    throw new Error('NEON_AUTH_BASE_URL must use HTTPS in production');
  }

  if (typeof globalThis.window === 'undefined' && !env.NEON_AUTH_COOKIE_SECRET) {
    throw new Error('NEON_AUTH_COOKIE_SECRET is required for server runtime');
  }

  return env;
}

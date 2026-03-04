const DEFAULT_AUTH_REDIRECT = '/dashboard';

function containsControlCharacters(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 31 || code === 127) {
      return true;
    }
  }

  return false;
}

function isSafeInternalPath(value: string): boolean {
  if (!value.startsWith('/')) {
    return false;
  }

  if (value.startsWith('//')) {
    return false;
  }

  if (containsControlCharacters(value)) {
    return false;
  }

  return true;
}

export function resolveAuthRedirect(input: string | null | undefined, fallback = DEFAULT_AUTH_REDIRECT): string {
  const normalizedFallback = fallback.trim();
  const safeFallback = isSafeInternalPath(normalizedFallback) ? normalizedFallback : DEFAULT_AUTH_REDIRECT;

  if (!input) {
    return safeFallback;
  }

  const candidate = input.trim();
  if (!isSafeInternalPath(candidate)) {
    return safeFallback;
  }

  return candidate;
}

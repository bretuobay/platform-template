'use client';

import { useEffect, useState } from 'react';

const DEFAULT_HASH = '#overview';

function getHash(defaultHash: string) {
  if (typeof window === 'undefined') {
    return defaultHash;
  }

  return window.location.hash || defaultHash;
}

export function useActiveHash(defaultHash = DEFAULT_HASH) {
  const [hash, setHash] = useState(() => getHash(defaultHash));

  useEffect(() => {
    const syncHash = () => {
      setHash(getHash(defaultHash));
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => {
      window.removeEventListener('hashchange', syncHash);
    };
  }, [defaultHash]);

  return hash;
}

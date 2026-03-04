'use client';

import { useEffect, useState } from 'react';

const DEFAULT_HASH = '#overview';

export function useActiveHash(defaultHash = DEFAULT_HASH) {
  const [hash, setHash] = useState(defaultHash);

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash || defaultHash);
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => {
      window.removeEventListener('hashchange', syncHash);
    };
  }, [defaultHash]);

  return hash;
}

'use client';

import { useCallback, useEffect, useState } from 'react';

const EVENT_NAME = 'kariera-preference-changed';

// localStorage-backed value that stays in sync across components on the same page
// (avatar in header + settings, plan badge in sidebar + pricing).
export function usePreference(key: string, fallback: string): [string, (value: string) => void] {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const stored = window.localStorage.getItem(key);
      setValue(stored ?? fallback);
    };
    read();
    const onChange = (event: Event) => {
      if ((event as CustomEvent<string>).detail === key) read();
    };
    window.addEventListener(EVENT_NAME, onChange);
    return () => window.removeEventListener(EVENT_NAME, onChange);
  }, [key, fallback]);

  const update = useCallback(
    (next: string) => {
      window.localStorage.setItem(key, next);
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: key }));
    },
    [key],
  );

  return [value, update];
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import { SEED_APPLICATIONS, type JobApplication } from '~/shared/data/applications';

const STORAGE_KEY = 'kariera-applications';

function load(): JobApplication[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as JobApplication[];
  } catch {
    /* corrupted storage — fall back to seed */
  }
  return SEED_APPLICATIONS;
}

export function useApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setApplications(load());
    setReady(true);
  }, []);

  const persist = useCallback((next: JobApplication[]) => {
    setApplications(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addApplication = useCallback(
    (application: Omit<JobApplication, 'id'>) => {
      const id = `app-${Math.random().toString(36).slice(2, 10)}`;
      persist([{ ...application, id }, ...load()]);
    },
    [persist],
  );

  const updateApplication = useCallback(
    (id: string, changes: Partial<JobApplication>) => {
      persist(load().map((application) => (application.id === id ? { ...application, ...changes } : application)));
    },
    [persist],
  );

  const removeApplication = useCallback(
    (id: string) => {
      persist(load().filter((application) => application.id !== id));
    },
    [persist],
  );

  return { applications, ready, addApplication, updateApplication, removeApplication };
}

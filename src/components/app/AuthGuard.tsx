'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '~/components/app/AuthProvider';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50/50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl animate-bounce">🚀</span>
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading your recruitment hub…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

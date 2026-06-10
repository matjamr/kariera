import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';

// Minimal frame for the static info pages (privacy, terms).
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-violet-50/50 dark:bg-slate-900">
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 gap-6">
        <Link href="/login" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          Kariera
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <IconArrowLeft size={16} />
          Back to sign in
        </Link>
      </header>
      <main className="py-10">{children}</main>
    </div>
  );
}

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-violet-50/50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl mb-6">🚀</p>
        <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Page not found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

interface AuthShellProps {
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

// Shared frame for the auth screens: brand heading, centered card, helper links.
export default function AuthShell({ subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-violet-50/50 dark:bg-slate-900 relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Background decorations */}
      <div className="absolute top-[-100px] right-[-50px] w-[512px] h-[410px] rounded-full bg-purple-100/40 dark:bg-purple-900/10 blur-3xl" />
      <div className="absolute bottom-[200px] left-[-100px] w-[384px] h-[307px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Kariera</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
          {children}
        </div>

        {footer}

        <div className="mt-6 flex items-center justify-center gap-10 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/faqs" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Help center
          </Link>
          <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}

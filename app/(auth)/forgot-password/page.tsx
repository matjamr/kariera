'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IconMail } from '@tabler/icons-react';
import { useAuth } from '~/components/app/AuthProvider';
import AuthShell from '~/components/app/AuthShell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the reset link. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      subtitle="Enter your email and we'll send you a link to reset your password."
      footer={
        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      }
    >
      {sent ? (
        <div className="text-center space-y-3">
          <span className="text-4xl">📬</span>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Check your inbox</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            If an account exists for <span className="font-medium">{email}</span>, a password reset link is on its
            way.
          </p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email address
            </label>
            <div className="relative">
              <IconMail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              We&apos;ll send a password reset link to this email address.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {submitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthShell>
  );
}

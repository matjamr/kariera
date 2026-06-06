'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-violet-50/50 dark:bg-slate-900 relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Decorations */}
      <div className="absolute top-[-100px] right-[-50px] w-[512px] h-[410px] rounded-full bg-purple-100/40 dark:bg-purple-900/10 blur-3xl" />
      <div className="absolute bottom-[200px] left-[-100px] w-[384px] h-[307px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Logo */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl">🚀</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Kariera</h1>
          </div>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Zapomniałeś hasła? 🔑
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Nie martw się! Podaj swój email, a wyślemy Ci link do resetowania hasła.
          </p>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="twoj@email.com"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Wyślij link resetujący
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6">
            <Link
              href="/login"
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 inline-flex items-center"
            >
              ← Powrót do logowania
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

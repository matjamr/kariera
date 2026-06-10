'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconLogout, IconSearch, IconSettings } from '@tabler/icons-react';
import { useAuth } from '~/components/app/AuthProvider';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
import NotificationsMenu from '~/components/app/NotificationsMenu';
import ToggleDarkMode from '~/components/atoms/ToggleDarkMode';

function initialsOf(name: string | null, email: string | null): string {
  if (name && name.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  return (email ?? 'U')[0].toUpperCase();
}

export default function AppHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-30">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: logo + search */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <Link href="/dashboard" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
            Kariera
          </Link>
          <div className="relative hidden sm:block w-full max-w-xs">
            <IconSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ToggleDarkMode />
          <NotificationsMenu />
          <Link
            href="/settings"
            aria-label="Settings"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <IconSettings size={20} className="text-slate-600 dark:text-slate-400" />
          </Link>

          {/* Avatar + menu */}
          <div className="relative ml-1" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Account menu"
              className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              {initialsOf(user?.displayName ?? null, user?.email ?? null)}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg py-1 z-40">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {user?.displayName ?? 'User'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <IconLogout size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

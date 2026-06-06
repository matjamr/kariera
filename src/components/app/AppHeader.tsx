'use client';

import { IconBell, IconSearch } from '@tabler/icons-react';
import ToggleDarkMode from '../atoms/ToggleDarkMode';

export default function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-bold text-lg">Kariera</span>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">/ Dashboard</div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <IconSearch size={20} className="text-slate-600 dark:text-slate-400" />
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
            <IconBell size={20} className="text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {/* Dark Mode Toggle */}
          <ToggleDarkMode />

          {/* User Avatar */}
          <div className="ml-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

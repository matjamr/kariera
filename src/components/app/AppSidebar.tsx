'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconHome,
  IconBriefcase,
  IconChartBar,
  IconCalendar,
  IconCreditCard,
  IconSettings,
  IconLogout
} from '@tabler/icons-react';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: IconHome },
  { name: 'Moje aplikacje', href: '/app/applications', icon: IconBriefcase },
  { name: 'Analityka', href: '/app/analytics', icon: IconChartBar },
  { name: 'Kalendarz', href: '/app/calendar', icon: IconCalendar },
  { name: 'Pricing', href: '/pricing', icon: IconCreditCard },
];

const bottomNavigation = [
  { name: 'Ustawienia', href: '/app/settings', icon: IconSettings },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <span className="font-bold text-lg text-slate-900 dark:text-white">Kariera</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-2 py-4 border-t border-slate-200 dark:border-slate-800">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-1"
        >
          <IconLogout size={20} />
          Wyloguj
        </button>
      </div>
    </aside>
  );
}

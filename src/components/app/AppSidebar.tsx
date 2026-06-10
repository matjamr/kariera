'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconLayoutGrid,
  IconFileDescription,
  IconChartBar,
  IconSettings,
  IconRocket,
  IconStarFilled,
  IconPlus,
} from '@tabler/icons-react';
import { usePreference } from '~/hooks/usePreference';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: IconLayoutGrid },
  { name: 'My Applications', href: '/applications', icon: IconFileDescription },
  { name: 'Analytics', href: '/analytics', icon: IconChartBar },
  { name: 'Settings', href: '/settings', icon: IconSettings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [plan] = usePreference('kariera-plan', 'standard');

  return (
    <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col z-20">
      {/* Brand / plan block */}
      <div className="px-6 py-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <IconRocket size={22} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white leading-tight">Kariera</div>
            <div
              className={`text-[10px] font-semibold tracking-widest uppercase ${
                plan === 'pro' ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400'
              }`}
            >
              {plan === 'pro' ? 'Pro plan' : 'Free plan'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              {item.name}
              {isActive && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-l bg-indigo-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      <div className="px-4 py-5">
        {plan === 'pro' ? (
          <Link
            href="/pricing"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold"
          >
            <IconStarFilled size={14} />
            Pro active
          </Link>
        ) : (
          <Link
            href="/pricing"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <IconPlus size={16} />
            <IconStarFilled size={14} />
            Upgrade to Pro
          </Link>
        )}
      </div>
    </aside>
  );
}

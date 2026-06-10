'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconLayoutGrid, IconFileDescription, IconChartBar, IconCalendarCheck } from '@tabler/icons-react';

const tabs = [
  { name: 'Home', href: '/dashboard', icon: IconLayoutGrid },
  { name: 'Apps', href: '/applications', icon: IconFileDescription },
  { name: 'Analytics', href: '/analytics', icon: IconChartBar },
  { name: 'Calendar', href: '/calendar', icon: IconCalendarCheck },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-30">
      <div className="grid grid-cols-4">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon size={22} />
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

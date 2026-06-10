'use client';

import { useEffect, useRef, useState } from 'react';
import { IconBell, IconCalendarEvent, IconFileDescription, IconGift, IconChecks } from '@tabler/icons-react';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';

const STORAGE_KEY = 'kariera-notifications-read';

const NOTIFICATIONS = [
  {
    id: 'n1',
    icon: IconCalendarEvent,
    iconClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    title: 'Upcoming interview',
    description: 'Design Sync with Airbnb tomorrow at 10:00 AM',
    time: '1h ago',
  },
  {
    id: 'n2',
    icon: IconGift,
    iconClass: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    title: 'Offer received',
    description: 'Spotify sent you an offer for Product Designer',
    time: '2 days ago',
  },
  {
    id: 'n3',
    icon: IconFileDescription,
    iconClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    title: 'Application status changed',
    description: 'Figma moved your application to the interview stage',
    time: '3 days ago',
  },
];

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setOpen(false));

  useEffect(() => {
    try {
      setReadIds(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]);
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const unreadCount = NOTIFICATIONS.filter((notification) => !readIds.includes(notification.id)).length;

  const markAllAsRead = () => {
    const allIds = NOTIFICATIONS.map((notification) => notification.id);
    setReadIds(allIds);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="Notifications"
        onClick={() => setOpen((current) => !current)}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
      >
        <IconBell size={20} className="text-slate-600 dark:text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:top-auto sm:right-0 sm:mt-2 sm:w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-40 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                <IconChecks size={14} />
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {NOTIFICATIONS.map((notification) => {
              const Icon = notification.icon;
              const isRead = readIds.includes(notification.id);
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 ${
                    isRead ? 'opacity-60' : 'bg-indigo-50/40 dark:bg-indigo-900/10'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${notification.iconClass}`}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{notification.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{notification.description}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{notification.time}</p>
                  </div>
                  {!isRead && <span className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

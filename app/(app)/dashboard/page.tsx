'use client';

import Link from 'next/link';
import {
  IconCalendarEvent,
  IconCircleX,
  IconFileDescription,
  IconGift,
  IconMessages,
  IconReportAnalytics,
  IconTargetArrow,
} from '@tabler/icons-react';
import { useAuth } from '~/components/app/AuthProvider';
import StatusBadge from '~/components/app/StatusBadge';
import { useApplications } from '~/hooks/useApplications';
import { formatAppliedDate } from '~/shared/data/applications';

const stats = [
  {
    label: 'Total Applications',
    value: '1,284',
    badge: '+12%',
    badgeClass: 'text-green-600 dark:text-green-400',
    icon: IconFileDescription,
    iconClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  },
  {
    label: 'Active Interviews',
    value: '48',
    badge: 'Pending',
    badgeClass: 'text-amber-600 dark:text-amber-400',
    icon: IconMessages,
    iconClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  {
    label: 'Offers Received',
    value: '14',
    badge: 'High Rate',
    badgeClass: 'text-green-600 dark:text-green-400',
    icon: IconGift,
    iconClass: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    label: 'Rejections',
    value: '92',
    badge: 'Standard',
    badgeClass: 'text-slate-500 dark:text-slate-400',
    icon: IconCircleX,
    iconClass: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  },
];

const recentActivity = [
  {
    title: 'You applied to Google',
    subtitle: 'Senior UX Designer • Mountain View, CA',
    time: '2h ago',
    initial: 'G',
  },
  {
    title: 'Interview scheduled with Netflix',
    subtitle: 'Creative Lead • Los Angeles, CA',
    time: '5h ago',
    initial: 'N',
  },
  {
    title: 'Assessment received from Spotify',
    subtitle: 'Product Design Challenge',
    time: 'Yesterday',
    initial: 'S',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { applications } = useApplications();
  const firstName = (user?.displayName ?? user?.email ?? 'there').split(/[\s@]/)[0];
  const recentApplications = applications.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Welcome back, {firstName}</h1>
          <p className="text-slate-600 dark:text-slate-400">
            You have 3 active interviews scheduled for this week.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/calendar"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <IconCalendarEvent size={18} />
            Calendar
          </Link>
          <Link
            href="/report"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <IconReportAnalytics size={18} />
            Reports
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconClass}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-semibold ${stat.badgeClass}`}>{stat.badge}</span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Activity + upcoming interview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
            <Link
              href="/applications"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0"
              >
                <div className="w-11 h-11 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                  {activity.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 dark:text-white truncate">{activity.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{activity.subtitle}</p>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming interview */}
        <div className="bg-indigo-600 rounded-xl p-6 text-white flex flex-col">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-indigo-200 mb-3">
            <IconTargetArrow size={16} />
            Upcoming Interview
          </div>
          <h2 className="text-xl font-bold mb-2">Design Sync with Airbnb</h2>
          <p className="text-sm text-indigo-200 mb-6">Tomorrow at 10:00 AM • Zoom Meeting</p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-indigo-600 flex items-center justify-center text-xs font-semibold">
                SJ
              </span>
              <span className="w-8 h-8 rounded-full bg-purple-400 border-2 border-indigo-600 flex items-center justify-center text-xs font-semibold">
                MK
              </span>
              <span className="w-8 h-8 rounded-full bg-indigo-300 border-2 border-indigo-600 flex items-center justify-center text-xs font-semibold text-indigo-900">
                +2
              </span>
            </div>
          </div>

          <button className="mt-auto w-full py-2.5 px-4 bg-white text-indigo-600 font-semibold text-sm rounded-lg hover:bg-indigo-50 transition-colors">
            Join Meeting
          </button>
        </div>
      </div>

      {/* Recent applications table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Applications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Position
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Company
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Date Applied
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-slate-100 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="py-4 px-4 font-medium text-slate-900 dark:text-white">{application.position}</td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{application.company}</td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {formatAppliedDate(application.appliedAt)}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={application.status} uppercase />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 text-center border-t border-slate-100 dark:border-slate-700 mt-2">
          <Link
            href="/applications"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
          >
            View All {applications.length} Applications
          </Link>
        </div>
      </div>
    </div>
  );
}

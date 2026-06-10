'use client';

import { IconDownload } from '@tabler/icons-react';
import StatusBadge from '~/components/app/StatusBadge';
import { useAuth } from '~/components/app/AuthProvider';
import { useApplications } from '~/hooks/useApplications';
import { formatAppliedDate } from '~/shared/data/applications';

const summary = [
  { label: 'Total Applications', value: '1,284', note: '+12% this month', noteClass: 'text-green-600' },
  { label: 'Interviews', value: '48', note: '3.7% response rate', noteClass: 'text-slate-500' },
  { label: 'Offers Received', value: '14', note: '29% offer rate', noteClass: 'text-green-600' },
  { label: 'Rejections', value: '92', note: '7.1% rejection rate', noteClass: 'text-red-600' },
];

const pipeline = [
  { label: 'Applied', value: 52, color: 'bg-indigo-600' },
  { label: 'Screened', value: 18, color: 'bg-blue-500' },
  { label: 'Interview', value: 12, color: 'bg-amber-500' },
  { label: 'Offer', value: 7, color: 'bg-green-500' },
  { label: 'Rejected', value: 11, color: 'bg-red-500' },
];

const topCompanies = [
  { name: 'Google', count: '142 applications' },
  { name: 'Netflix', count: '98 applications' },
  { name: 'Spotify', count: '76 applications' },
  { name: 'Airbnb', count: '54 applications' },
];

export default function ReportPage() {
  const { user } = useAuth();
  const { applications } = useApplications();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Search Performance Report</h1>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
        >
          <IconDownload size={18} />
          Export PDF
        </button>
      </div>

      {/* Printable report card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden print:border-0">
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-8 text-white flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Kariera</h2>
            <p className="text-indigo-200 mt-1">Job Search Performance Report</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{user?.displayName ?? user?.email ?? 'Candidate'}</p>
            <p className="text-sm text-indigo-200">June 2026 • Generated via Kariera</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Summary tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</p>
                <p className={`text-xs mt-1 ${item.noteClass}`}>{item.note}</p>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-4">
              <span className="w-1 h-5 rounded bg-indigo-600" />
              Application Pipeline
            </h3>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-5">
              <div className="flex h-6 rounded-full overflow-hidden mb-4">
                {pipeline.map((segment) => (
                  <div key={segment.label} className={segment.color} style={{ width: `${segment.value}%` }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
                {pipeline.map((segment) => (
                  <span key={segment.label} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${segment.color}`} />
                    {segment.label} {segment.value}%
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Recent applications */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-4">
              <span className="w-1 h-5 rounded bg-indigo-600" />
              Recent Applications
            </h3>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Position
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Company
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Date Applied
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 5).map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                    >
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                        {application.position}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{application.company}</td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        {formatAppliedDate(application.appliedAt)}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={application.status} uppercase />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top companies */}
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-4">
              <span className="w-1 h-5 rounded bg-indigo-600" />
              Top Companies Applied To
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {topCompanies.map((company) => (
                <div
                  key={company.name}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">{company.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{company.count}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="px-8 py-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
          <span>Generated by Kariera • kariera.app</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

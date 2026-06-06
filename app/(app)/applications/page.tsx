'use client';

import { IconPlus, IconSearch, IconBriefcase, IconMapPin, IconClock } from '@tabler/icons-react';
import { useState } from 'react';

export default function ApplicationsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const applications = [
    {
      id: 1,
      company: 'Google',
      position: 'Senior Frontend Developer',
      location: 'Warszawa, Polska',
      salary: '25 000 - 35 000 PLN',
      status: 'interview',
      appliedDate: '2024-06-10',
      logo: '🔵',
    },
    {
      id: 2,
      company: 'Meta',
      position: 'Software Engineer',
      location: 'Zdalna',
      salary: '30 000 - 40 000 PLN',
      status: 'applied',
      appliedDate: '2024-06-08',
      logo: '🔷',
    },
    {
      id: 3,
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Kraków, Polska',
      salary: '28 000 - 38 000 PLN',
      status: 'rejected',
      appliedDate: '2024-06-05',
      logo: '🍎',
    },
    {
      id: 4,
      company: 'Amazon',
      position: 'Backend Developer',
      location: 'Wrocław, Polska',
      salary: '22 000 - 32 000 PLN',
      status: 'applied',
      appliedDate: '2024-06-03',
      logo: '📦',
    },
    {
      id: 5,
      company: 'Netflix',
      position: 'Full Stack Developer',
      location: 'Zdalna',
      salary: '32 000 - 42 000 PLN',
      status: 'interview',
      appliedDate: '2024-06-01',
      logo: '🎬',
    },
    {
      id: 6,
      company: 'Microsoft',
      position: 'Cloud Engineer',
      location: 'Gdańsk, Polska',
      salary: '26 000 - 36 000 PLN',
      status: 'offer',
      appliedDate: '2024-05-28',
      logo: '🪟',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      applied: { label: 'Aplikowano', className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
      interview: { label: 'Rozmowa', className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' },
      offer: { label: 'Oferta', className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
      rejected: { label: 'Odrzucone', className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
    };

    const { label, className } = statusMap[status] || statusMap.applied;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${className}`}>{label}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Moje aplikacje</h1>
          <p className="text-slate-600 dark:text-slate-400">Zarządzaj wszystkimi swoimi aplikacjami w jednym miejscu</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
          <IconPlus size={20} />
          Dodaj aplikację
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <IconSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Szukaj aplikacji..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              Wszystkie
            </button>
            <button className="px-4 py-2.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 text-sm font-medium text-indigo-600 dark:text-indigo-400 transition-colors">
              Aktywne
            </button>
            <button className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              Zakończone
            </button>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl">
                  {app.logo}
                </div>
                {getStatusBadge(app.status)}
              </div>

              {/* Company & Position */}
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{app.company}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{app.position}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <IconMapPin size={16} />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <IconBriefcase size={16} />
                  <span>{app.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <IconClock size={16} />
                  <span>Aplikowano {app.appliedDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                  Szczegóły
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  Edytuj
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">Firma</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">Pozycja</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">Lokalizacja</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">Wynagrodzenie</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">Data</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg">
                        {app.logo}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{app.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{app.position}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{app.location}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{app.salary}</td>
                  <td className="py-4 px-6">{getStatusBadge(app.status)}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{app.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { IconStarFilled, IconTrendingDown, IconTrendingUp, IconExternalLink } from '@tabler/icons-react';

const RANGES = ['Last 30 Days', 'Last 90 Days', 'Custom Range'] as const;
type Range = (typeof RANGES)[number];

interface Kpi {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

const KPIS: Record<Range, Kpi[]> = {
  'Last 30 Days': [
    { label: 'Total Applications', value: '2,482', delta: '+10.8%', up: true },
    { label: 'Interviews', value: '156', delta: '+4.2%', up: true },
    { label: 'Offers Extended', value: '34', delta: '+2.1%', up: true },
    { label: 'Rejections', value: '915', delta: '-1.5%', up: false },
  ],
  'Last 90 Days': [
    { label: 'Total Applications', value: '6,914', delta: '+18.3%', up: true },
    { label: 'Interviews', value: '402', delta: '+9.7%', up: true },
    { label: 'Offers Extended', value: '88', delta: '+5.4%', up: true },
    { label: 'Rejections', value: '2,610', delta: '+0.8%', up: true },
  ],
  'Custom Range': [
    { label: 'Total Applications', value: '11,037', delta: '+24.6%', up: true },
    { label: 'Interviews', value: '633', delta: '+12.1%', up: true },
    { label: 'Offers Extended', value: '141', delta: '+8.9%', up: true },
    { label: 'Rejections', value: '4,180', delta: '-2.3%', up: false },
  ],
};

const TRENDS: Record<Range, { month: string; value: number; highlight?: boolean }[]> = {
  'Last 30 Days': [
    { month: 'W1', value: 48 },
    { month: 'W2', value: 64 },
    { month: 'W3', value: 92, highlight: true },
    { month: 'W4', value: 71 },
  ],
  'Last 90 Days': [
    { month: 'Mar', value: 58 },
    { month: 'Apr', value: 74 },
    { month: 'May', value: 92, highlight: true },
  ],
  'Custom Range': [
    { month: 'Jan', value: 42 },
    { month: 'Feb', value: 58 },
    { month: 'Mar', value: 50 },
    { month: 'Apr', value: 65 },
    { month: 'May', value: 92, highlight: true },
    { month: 'Jun', value: 60 },
    { month: 'Jul', value: 48 },
  ],
};

const pipeline = [
  { label: 'Submitted', value: 65, color: '#4f46e5', dot: 'bg-indigo-600' },
  { label: 'In Review', value: 15, color: '#f59e0b', dot: 'bg-amber-500' },
  { label: 'Interviewed', value: 10, color: '#10b981', dot: 'bg-emerald-500' },
  { label: 'Others', value: 10, color: '#94a3b8', dot: 'bg-slate-400' },
];

const topCompanies = [
  { name: 'TechNova', location: 'San Francisco, CA', industry: 'Software & AI', candidates: '1,240', rating: 4.9, trend: '+12%', up: true },
  { name: 'Aetheria', location: 'Berlin, DE', industry: 'E-commerce', candidates: '890', rating: 4.7, trend: '+9%', up: true },
  { name: 'GlobalLogix', location: 'New York, NY', industry: 'Logistics', candidates: '406', rating: 4.5, trend: '-3%', up: false },
  { name: 'Quantix Labs', location: 'London, UK', industry: 'FinTech', candidates: '388', rating: 4.4, trend: '+6%', up: true },
  { name: 'Solaris Media', location: 'Amsterdam, NL', industry: 'Media', candidates: '301', rating: 4.3, trend: '+2%', up: true },
  { name: 'NordPeak', location: 'Stockholm, SE', industry: 'Consumer Tech', candidates: '245', rating: 4.1, trend: '-1%', up: false },
];

function PipelineDonut() {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
        {pipeline.map((segment) => {
          const length = (segment.value / 100) * circumference;
          const element = (
            <circle
              key={segment.label}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="18"
              strokeDasharray={`${length - 4} ${circumference - length + 4}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += length;
          return element;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">2.5k</span>
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Active</span>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>(RANGES[0]);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const kpis = KPIS[range];
  const trend = TRENDS[range];
  const maxTrend = Math.max(...trend.map((t) => t.value));
  const companies = showAllCompanies ? topCompanies : topCompanies.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Performance Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Review your recruitment pipeline efficiency and company engagement.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 w-fit">
          {RANGES.map((option) => (
            <button
              key={option}
              onClick={() => setRange(option)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                range === option
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">{kpi.label}</span>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  kpi.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {kpi.up ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                {kpi.delta}
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Pipeline + trend */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Pipeline Status</h2>
          <PipelineDonut />
          <div className="mt-6 space-y-3">
            {pipeline.map((segment) => (
              <div key={segment.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className={`w-2.5 h-2.5 rounded-full ${segment.dot}`} />
                  {segment.label}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{segment.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Applications Trend</h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> 2025
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Monitoring volume for: <span className="font-medium text-slate-700 dark:text-slate-300">{range}</span>
          </p>

          <div className="flex-1 flex items-end justify-between gap-3 min-h-[200px]">
            {trend.map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full max-w-[64px] rounded-t-lg transition-all duration-300 ${
                    bar.highlight ? 'bg-indigo-600' : 'bg-indigo-100 dark:bg-slate-700'
                  }`}
                  style={{ height: `${(bar.value / maxTrend) * 180}px` }}
                />
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top companies */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Top Rated Companies</h2>
          <button
            onClick={() => setShowAllCompanies((current) => !current)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
          >
            {showAllCompanies ? 'Show less' : `View All (${topCompanies.length})`}
          </button>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Companies with highest candidate satisfaction scores
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Company</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Industry
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Candidates
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Avg. Rating
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Trend</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.name}
                  className="border-b border-slate-100 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-semibold text-sm">
                        {company.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{company.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{company.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{company.industry}</td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{company.candidates}</td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1 font-medium text-slate-900 dark:text-white">
                      <IconStarFilled size={14} className="text-amber-400" />
                      {company.rating}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        company.up
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {company.trend}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(company.name + ' careers')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Search ${company.name} careers`}
                      className="inline-block p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      <IconExternalLink size={18} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

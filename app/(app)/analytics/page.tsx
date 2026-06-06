import { IconTrendingUp, IconTrendingDown, IconMinus, IconCalendar } from '@tabler/icons-react';

export default function AnalyticsPage() {
  const kpis = [
    { label: 'Wskaźnik odpowiedzi', value: '45%', change: '+12%', trend: 'up' },
    { label: 'Średni czas odpowiedzi', value: '5.2 dni', change: '-0.8', trend: 'down' },
    { label: 'Współczynnik konwersji', value: '18%', change: '+5%', trend: 'up' },
    { label: 'Aktywne aplikacje', value: '12', change: '0', trend: 'neutral' },
  ];

  const monthlyApplications = [
    { month: 'Sty', count: 8 },
    { month: 'Lut', count: 12 },
    { month: 'Mar', count: 15 },
    { month: 'Kwi', count: 10 },
    { month: 'Maj', count: 18 },
    { month: 'Cze', count: 24 },
  ];

  const topCompanies = [
    { name: 'Google', count: 5 },
    { name: 'Meta', count: 4 },
    { name: 'Apple', count: 3 },
    { name: 'Microsoft', count: 3 },
  ];

  const statusBreakdown = [
    { status: 'Aplikowano', count: 12, percentage: 50 },
    { status: 'Rozmowa', count: 7, percentage: 29 },
    { status: 'Oferta', count: 2, percentage: 8 },
    { status: 'Odrzucone', count: 3, percentage: 13 },
  ];

  const maxCount = Math.max(...monthlyApplications.map((m) => m.count));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analityka</h1>
          <p className="text-slate-600 dark:text-slate-400">Śledź swoją wydajność w poszukiwaniu pracy</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <IconCalendar size={20} />
          Ostatnie 30 dni
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">{kpi.label}</span>
              {kpi.trend === 'up' ? (
                <IconTrendingUp size={16} className="text-green-500" />
              ) : kpi.trend === 'down' ? (
                <IconTrendingDown size={16} className="text-red-500" />
              ) : (
                <IconMinus size={16} className="text-slate-400" />
              )}
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{kpi.value}</div>
            <div
              className={`text-sm font-medium ${
                kpi.trend === 'up'
                  ? 'text-green-600 dark:text-green-400'
                  : kpi.trend === 'down'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Applications Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Aplikacje w ostatnich miesiącach</h2>

          <div className="flex items-end justify-between gap-4 h-64">
            {monthlyApplications.map((item) => {
              const height = (item.count / maxCount) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
                    <div
                      className="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.count} aplikacji
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Najczęściej aplikowane firmy</h2>

          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={company.name} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center font-semibold text-indigo-600 dark:text-indigo-400">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900 dark:text-white">{company.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{company.count} aplikacji</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Podział według statusu</h2>

        <div className="space-y-4">
          {statusBreakdown.map((item) => (
            <div key={item.status}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.status}</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 dark:bg-indigo-600 rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

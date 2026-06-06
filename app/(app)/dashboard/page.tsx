import { IconTrendingUp, IconClock, IconCheck, IconX } from '@tabler/icons-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Wszystkie aplikacje', value: '24', icon: IconClock, color: 'bg-blue-500' },
    { label: 'Aktywne', value: '12', icon: IconTrendingUp, color: 'bg-green-500' },
    { label: 'Zaakceptowane', value: '5', icon: IconCheck, color: 'bg-purple-500' },
    { label: 'Odrzucone', value: '7', icon: IconX, color: 'bg-red-500' },
  ];

  const recentActivity = [
    { company: 'Google', position: 'Senior Frontend Developer', status: 'interview', date: '2 dni temu' },
    { company: 'Meta', position: 'Software Engineer', status: 'applied', date: '3 dni temu' },
    { company: 'Apple', position: 'iOS Developer', status: 'rejected', date: '5 dni temu' },
  ];

  const upcomingInterviews = [
    { company: 'Google', position: 'Senior Frontend Developer', date: '2024-06-15', time: '14:00' },
    { company: 'Microsoft', position: 'Full Stack Developer', date: '2024-06-18', time: '10:30' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Witaj ponownie, Jan! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Oto podsumowanie Twoich aplikacji o pracę
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ostatnia aktywność</h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
              Zobacz wszystkie
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{activity.company[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 dark:text-white truncate">{activity.company}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{activity.position}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    activity.status === 'interview'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      : activity.status === 'applied'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}
                >
                  {activity.status === 'interview' ? 'Rozmowa' : activity.status === 'applied' ? 'Aplikowano' : 'Odrzucone'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Nadchodzące rozmowy</h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
              Kalendarz
            </button>
          </div>

          <div className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <div key={index} className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-slate-900 dark:text-white">{interview.company}</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400">{interview.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{interview.position}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{interview.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Applications Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Szybki podgląd aplikacji</h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
            Zobacz wszystkie
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Firma</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Pozycja</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Data</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { company: 'Google', position: 'Senior Frontend Developer', date: '2024-06-10', status: 'interview' },
                { company: 'Meta', position: 'Software Engineer', date: '2024-06-08', status: 'applied' },
                { company: 'Apple', position: 'iOS Developer', date: '2024-06-05', status: 'rejected' },
                { company: 'Amazon', position: 'Backend Developer', date: '2024-06-03', status: 'applied' },
                { company: 'Netflix', position: 'Full Stack Developer', date: '2024-06-01', status: 'interview' },
              ].map((job, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <span className="text-sm">{job.company[0]}</span>
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{job.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{job.position}</td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{job.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'interview'
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                          : job.status === 'applied'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {job.status === 'interview' ? 'Rozmowa' : job.status === 'applied' ? 'Aplikowano' : 'Odrzucone'}
                    </span>
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

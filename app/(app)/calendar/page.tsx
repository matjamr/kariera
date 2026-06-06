'use client';

import { IconChevronLeft, IconChevronRight, IconClock, IconVideo } from '@tabler/icons-react';
import { useState } from 'react';

export default function CalendarPage() {
  const [currentDate] = useState(new Date(2024, 5, 1)); // June 2024

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });

  const events = [
    { date: 15, company: 'Google', position: 'Senior Frontend Developer', time: '14:00', type: 'online' },
    { date: 18, company: 'Microsoft', position: 'Full Stack Developer', time: '10:30', type: 'onsite' },
    { date: 22, company: 'Amazon', position: 'Backend Developer', time: '15:00', type: 'online' },
  ];

  const upcomingEvents = [
    {
      company: 'Google',
      position: 'Senior Frontend Developer',
      date: '15 czerwca 2024',
      time: '14:00 - 15:00',
      type: 'online',
      interviewer: 'John Smith',
    },
    {
      company: 'Microsoft',
      position: 'Full Stack Developer',
      date: '18 czerwca 2024',
      time: '10:30 - 11:30',
      type: 'onsite',
      interviewer: 'Anna Kowalska',
    },
  ];

  const getDayEvents = (day: number) => events.filter((e) => e.date === day);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Kalendarz</h1>
        <p className="text-slate-600 dark:text-slate-400">Zarządzaj swoimi rozmowami kwalifikacyjnymi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white capitalize">{monthName}</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <IconChevronLeft size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <IconChevronRight size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday Headers */}
            {['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayEvents = getDayEvents(day);
              const isToday = day === 15;

              return (
                <div
                  key={day}
                  className={`aspect-square p-2 rounded-lg border ${
                    isToday
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                      : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  } cursor-pointer transition-colors`}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                    {day}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="space-y-1">
                      {dayEvents.map((event, idx) => (
                        <div
                          key={idx}
                          className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded truncate"
                        >
                          {event.time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Nadchodzące wydarzenia</h2>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {event.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{event.company}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{event.position}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <IconClock size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <IconVideo size={14} />
                    <span>{event.type === 'online' ? 'Online' : 'W biurze'}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Rozmówca: <span className="font-medium text-slate-900 dark:text-white">{event.interviewer}</span>
                  </p>
                </div>

                <button className="w-full mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Dołącz do spotkania
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

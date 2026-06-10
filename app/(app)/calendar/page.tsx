'use client';

import { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type CalendarView = 'Month' | 'Week' | 'Day';

interface CalendarEvent {
  day: number;
  month: number; // 0-based
  year: number;
  label: string;
  selected?: boolean;
}

const EVENTS: CalendarEvent[] = [
  { day: 1, month: 4, year: 2026, label: 'Design Interview', selected: true },
  { day: 5, month: 4, year: 2026, label: 'Interview' },
  { day: 12, month: 4, year: 2026, label: 'Interview' },
  { day: 22, month: 4, year: 2026, label: 'Interview' },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface DayCell {
  day: number;
  inMonth: boolean;
  events: CalendarEvent[];
}

function buildMonthGrid(year: number, month: number): DayCell[] {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: DayCell[] = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false, events: [] });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      inMonth: true,
      events: EVENTS.filter((event) => event.day === day && event.month === month && event.year === year),
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - startOffset - daysInMonth + 1, inMonth: false, events: [] });
  }
  return cells;
}

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>('Month');
  const [cursor, setCursor] = useState({ year: 2026, month: 4 }); // May 2026, as in the prototype

  const monthName = new Date(cursor.year, cursor.month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const cells = buildMonthGrid(cursor.year, cursor.month);

  const shiftMonth = (delta: number) => {
    setCursor(({ year, month }) => {
      const date = new Date(year, month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
      {/* Calendar card */}
      <div className="xl:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        {/* Toolbar */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous month"
              onClick={() => shiftMonth(-1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconChevronLeft size={18} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white min-w-[140px] text-center">
              {monthName}
            </h1>
            <button
              aria-label="Next month"
              onClick={() => shiftMonth(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCursor({ year: 2026, month: 4 })}
              className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              Today
            </button>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              {(['Month', 'Week', 'Day'] as CalendarView[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setView(option)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    view === option
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-700">
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className="py-3 text-center text-xs font-semibold tracking-widest text-slate-400 uppercase"
            >
              {weekday}
            </div>
          ))}
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-7">
          {cells.map((cell, index) => (
            <div
              key={index}
              className={`min-h-[88px] sm:min-h-[110px] p-2 border-b border-r border-slate-100 dark:border-slate-700/50 [&:nth-child(7n)]:border-r-0 ${
                cell.inMonth ? '' : 'bg-slate-50/60 dark:bg-slate-900/30'
              }`}
            >
              {cell.events.some((event) => event.selected) ? (
                <span className="inline-flex w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-semibold items-center justify-center">
                  {cell.day}
                </span>
              ) : (
                <span
                  className={`text-sm ${
                    cell.inMonth ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'
                  }`}
                >
                  {cell.day}
                </span>
              )}
              {cell.events.map((event) => (
                <div
                  key={event.label}
                  className="mt-1.5 px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium truncate"
                >
                  {event.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Today's schedule */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Today&apos;s Schedule</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Friday, May 1, 2026</p>

        <div className="rounded-lg bg-indigo-50/70 dark:bg-indigo-900/20 p-4 space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">9:00 AM – 9:30 AM</p>
          <p className="font-semibold text-slate-900 dark:text-white">Design Interview</p>
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
              Figma
            </span>
            <button className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

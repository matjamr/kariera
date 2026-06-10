'use client';

import { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import MeetingModal from '~/components/app/MeetingModal';

type CalendarView = 'Month' | 'Week' | 'Day';

interface CalendarEvent {
  date: string; // YYYY-MM-DD
  label: string;
  start: string;
  end: string;
  platform: string;
  selected?: boolean;
}

// "Today" in the prototype is May 1, 2026.
const TODAY = new Date(2026, 4, 1);

const EVENTS: CalendarEvent[] = [
  { date: '2026-05-01', label: 'Design Interview', start: '9:00 AM', end: '9:30 AM', platform: 'Figma', selected: true },
  { date: '2026-05-01', label: 'HR Interview', start: '2:00 PM', end: '3:00 PM', platform: 'Zoom' },
  { date: '2026-05-05', label: 'Interview', start: '11:00 AM', end: '12:00 PM', platform: 'Google Meet' },
  { date: '2026-05-12', label: 'Interview', start: '10:00 AM', end: '11:00 AM', platform: 'Zoom' },
  { date: '2026-05-22', label: 'Interview', start: '1:00 PM', end: '2:00 PM', platform: 'Teams' },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function toKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function eventsOn(date: Date): CalendarEvent[] {
  return EVENTS.filter((event) => event.date === toKey(date));
}

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7)); // Monday-first
  return result;
}

interface DayCell {
  date: Date;
  inMonth: boolean;
}

function buildMonthGrid(year: number, month: number): DayCell[] {
  const first = startOfWeek(new Date(year, month, 1));
  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(first);
    date.setDate(first.getDate() + i);
    cells.push({ date, inMonth: date.getMonth() === month });
  }
  // Trim trailing weeks that are entirely outside the month.
  while (cells.length > 7 && cells.slice(-7).every((cell) => !cell.inMonth)) {
    cells.splice(-7);
  }
  return cells;
}

function EventPill({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left mt-1.5 px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium truncate hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
    >
      {event.label}
    </button>
  );
}

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>('Month');
  const [cursor, setCursor] = useState<Date>(TODAY);
  const [openedEvent, setOpenedEvent] = useState<CalendarEvent | null>(null);

  const shift = (delta: number) => {
    setCursor((current) => {
      const next = new Date(current);
      if (view === 'Month') next.setMonth(next.getMonth() + delta);
      if (view === 'Week') next.setDate(next.getDate() + delta * 7);
      if (view === 'Day') next.setDate(next.getDate() + delta);
      return next;
    });
  };

  const heading =
    view === 'Day'
      ? cursor.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const monthCells = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());
  const weekStart = startOfWeek(cursor);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });
  const todayEvents = eventsOn(TODAY);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
      {/* Calendar card */}
      <div className="xl:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        {/* Toolbar */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={() => shift(-1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconChevronLeft size={18} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white min-w-[170px] text-center">{heading}</h1>
            <button
              aria-label="Next"
              onClick={() => shift(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCursor(TODAY)}
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

        {/* Month view */}
        {view === 'Month' && (
          <>
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
            <div className="grid grid-cols-7">
              {monthCells.map((cell, index) => {
                const events = eventsOn(cell.date);
                const isToday = toKey(cell.date) === toKey(TODAY);
                return (
                  <div
                    key={index}
                    className={`min-h-[88px] sm:min-h-[110px] p-2 border-b border-r border-slate-100 dark:border-slate-700/50 [&:nth-child(7n)]:border-r-0 ${
                      cell.inMonth ? '' : 'bg-slate-50/60 dark:bg-slate-900/30'
                    }`}
                  >
                    {isToday ? (
                      <span className="inline-flex w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-semibold items-center justify-center">
                        {cell.date.getDate()}
                      </span>
                    ) : (
                      <span
                        className={`text-sm ${
                          cell.inMonth ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      >
                        {cell.date.getDate()}
                      </span>
                    )}
                    {events.map((event) => (
                      <EventPill key={event.label + event.start} event={event} onClick={() => setOpenedEvent(event)} />
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Week view */}
        {view === 'Week' && (
          <div className="grid grid-cols-7">
            {weekDays.map((date) => {
              const events = eventsOn(date);
              const isToday = toKey(date) === toKey(TODAY);
              return (
                <div
                  key={toKey(date)}
                  className="min-h-[320px] p-2 border-r border-slate-100 dark:border-slate-700/50 last:border-r-0"
                >
                  <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                    <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <span
                      className={`inline-flex w-7 h-7 mt-1 rounded-full text-sm font-semibold items-center justify-center ${
                        isToday ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </div>
                  {events.map((event) => (
                    <button
                      key={event.label + event.start}
                      onClick={() => setOpenedEvent(event)}
                      className="block w-full text-left mb-1.5 px-2 py-1.5 rounded bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
                    >
                      <span className="block text-xs font-semibold text-indigo-700 dark:text-indigo-300 truncate">
                        {event.label}
                      </span>
                      <span className="block text-[10px] text-indigo-600/80 dark:text-indigo-400">
                        {event.start} – {event.end}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Day view */}
        {view === 'Day' && (
          <div>
            {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(
              (hour) => {
                const events = eventsOn(cursor).filter((event) => event.start.startsWith(hour.split(':')[0] + ':') && event.start.endsWith(hour.slice(-2)));
                return (
                  <div key={hour} className="flex border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                    <div className="w-24 shrink-0 py-4 px-4 text-xs text-slate-400 text-right">{hour}</div>
                    <div className="flex-1 py-2 px-2 border-l border-slate-100 dark:border-slate-700/50">
                      {events.map((event) => (
                        <button
                          key={event.label + event.start}
                          onClick={() => setOpenedEvent(event)}
                          className="block w-full max-w-md text-left px-3 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                            {event.label}
                          </span>
                          <span className="block text-xs text-indigo-600/80 dark:text-indigo-400">
                            {event.start} – {event.end} • {event.platform}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>

      {/* Today's schedule */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Today&apos;s Schedule</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          {TODAY.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-3">
          {todayEvents.map((event) => (
            <div key={event.label + event.start} className="rounded-lg bg-indigo-50/70 dark:bg-indigo-900/20 p-4 space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {event.start} – {event.end}
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">{event.label}</p>
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                  {event.platform}
                </span>
                <button
                  onClick={() => setOpenedEvent(event)}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MeetingModal
        open={openedEvent !== null}
        onClose={() => setOpenedEvent(null)}
        meeting={{
          title: openedEvent?.label ?? '',
          time: openedEvent ? `${new Date(openedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, ${openedEvent.start} – ${openedEvent.end}` : '',
          platform: openedEvent?.platform ?? '',
          link: 'https://zoom.us/j/87459123650',
        }}
      />
    </div>
  );
}

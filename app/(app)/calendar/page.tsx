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
}

// "Today" in the prototype is May 1, 2026.
const TODAY = new Date(2026, 4, 1);

const EVENTS: CalendarEvent[] = [
  { date: '2026-05-01', label: 'Design Interview', start: '9:00 AM', end: '9:30 AM', platform: 'Figma' },
  { date: '2026-05-01', label: 'HR Interview', start: '2:00 PM', end: '3:00 PM', platform: 'Zoom' },
  { date: '2026-05-05', label: 'Interview', start: '11:00 AM', end: '12:00 PM', platform: 'Google Meet' },
  { date: '2026-05-12', label: 'Interview', start: '10:00 AM', end: '11:00 AM', platform: 'Zoom' },
  { date: '2026-05-22', label: 'Interview', start: '1:00 PM', end: '2:00 PM', platform: 'Teams' },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_START_HOUR = 8; // the time grid covers 8:00 AM – 5:00 PM
const HOURS = Array.from({ length: 10 }, (_, i) => DAY_START_HOUR + i);

function formatHour(hour24: number): string {
  const meridiem = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00 ${meridiem}`;
}

function hourOf(time: string): number {
  const [clock, meridiem] = time.split(' ');
  let hour = Number(clock.split(':')[0]);
  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  return hour;
}

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

  const eventPillClasses =
    'block w-full text-left rounded bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors';

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
                    className={`min-h-[64px] sm:min-h-[110px] p-1.5 sm:p-2 border-b border-r border-slate-100 dark:border-slate-700/50 [&:nth-child(7n)]:border-r-0 ${
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

                    {/* Desktop: labelled pills */}
                    <div className="hidden sm:block">
                      {events.map((event) => (
                        <button
                          key={event.label + event.start}
                          onClick={() => setOpenedEvent(event)}
                          className={`${eventPillClasses} mt-1.5 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 truncate`}
                        >
                          {event.label}
                        </button>
                      ))}
                    </div>

                    {/* Mobile: compact dots, tap opens the event */}
                    {events.length > 0 && (
                      <button
                        aria-label={`Events on ${toKey(cell.date)}`}
                        onClick={() => setOpenedEvent(events[0])}
                        className="sm:hidden mt-1 flex items-center justify-center gap-1 w-full py-1"
                      >
                        {events.slice(0, 3).map((event) => (
                          <span key={event.label + event.start} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        ))}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Week view — time grid on desktop */}
        {view === 'Week' && (
          <>
            <div className="hidden sm:block">
              {/* Day header */}
              <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-slate-100 dark:border-slate-700">
                <div />
                {weekDays.map((date) => {
                  const isToday = toKey(date) === toKey(TODAY);
                  return (
                    <div key={toKey(date)} className={`py-3 text-center ${isToday ? 'bg-indigo-50/60 dark:bg-indigo-900/10' : ''}`}>
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
                  );
                })}
              </div>

              {/* Hour rows */}
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-slate-100 dark:border-slate-700/50 last:border-b-0"
                >
                  <div className="py-3 pr-3 text-right text-[11px] text-slate-400 -translate-y-2.5">
                    {formatHour(hour)}
                  </div>
                  {weekDays.map((date) => {
                    const isToday = toKey(date) === toKey(TODAY);
                    const events = eventsOn(date).filter((event) => hourOf(event.start) === hour);
                    return (
                      <div
                        key={toKey(date)}
                        className={`min-h-[52px] p-1 border-l border-slate-100 dark:border-slate-700/50 ${
                          isToday ? 'bg-indigo-50/60 dark:bg-indigo-900/10' : ''
                        }`}
                      >
                        {events.map((event) => (
                          <button
                            key={event.label + event.start}
                            onClick={() => setOpenedEvent(event)}
                            className="block w-full h-full text-left px-2 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
                          >
                            <span className="block text-xs font-semibold text-white truncate">{event.label}</span>
                            <span className="block text-[10px] text-indigo-200 whitespace-nowrap">
                              {event.start} – {event.end}
                            </span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Mobile: vertical list of days */}
            <div className="sm:hidden">
              {weekDays.map((date) => {
                const events = eventsOn(date);
                const isToday = toKey(date) === toKey(TODAY);
                return (
                  <div
                    key={toKey(date)}
                    className="p-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <span
                        className={`inline-flex w-7 h-7 rounded-full text-sm font-semibold items-center justify-center ${
                          isToday ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {date.getDate()}
                      </span>
                      {events.length === 0 && (
                        <span className="text-xs text-slate-300 dark:text-slate-600 ml-auto">No events</span>
                      )}
                    </div>
                    {events.map((event) => (
                      <button
                        key={event.label + event.start}
                        onClick={() => setOpenedEvent(event)}
                        className={`${eventPillClasses} mb-1.5 px-3 py-2`}
                      >
                        <span className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 truncate">
                          {event.label}
                        </span>
                        <span className="block text-xs text-indigo-600/80 dark:text-indigo-400 whitespace-nowrap">
                          {event.start} – {event.end}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Day view — single-day time grid */}
        {view === 'Day' && (
          <div>
            {HOURS.map((hour) => {
              const events = eventsOn(cursor).filter((event) => hourOf(event.start) === hour);
              return (
                <div key={hour} className="flex border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                  <div className="w-20 sm:w-24 shrink-0 py-4 px-3 text-xs text-slate-400 text-right">
                    {formatHour(hour)}
                  </div>
                  <div className="flex-1 py-2 px-2 border-l border-slate-100 dark:border-slate-700/50 min-h-[52px]">
                    {events.map((event) => (
                      <button
                        key={event.label + event.start}
                        onClick={() => setOpenedEvent(event)}
                        className="block w-full max-w-md text-left px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
                      >
                        <span className="block text-sm font-semibold text-white">{event.label}</span>
                        <span className="block text-xs text-indigo-200">
                          {event.start} – {event.end} • {event.platform}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
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
          time: openedEvent
            ? `${new Date(openedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, ${openedEvent.start} – ${openedEvent.end}`
            : '',
          platform: openedEvent?.platform ?? '',
          link: 'https://zoom.us/j/87459123650',
        }}
      />
    </div>
  );
}

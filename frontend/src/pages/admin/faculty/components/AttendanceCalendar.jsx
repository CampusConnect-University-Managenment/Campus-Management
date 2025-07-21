import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday
} from 'date-fns';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AttendanceCalendar = () => {
  const today = new Date(); // Will always reflect current system date
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const leadingEmptyDays = getDay(monthStart); // Days to skip before 1st day of month

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
      {/* Show current date */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          Today is{' '}
          <span className="text-blue-600 font-bold">
            {format(today, 'EEEE, dd MMMM yyyy')}
          </span>
        </p>
        <h2 className="text-2xl font-bold mt-1">
          {format(today, 'MMMM yyyy')} Calendar
        </h2>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700">
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 border-b border-gray-300">
            {day}
          </div>
        ))}

        {/* Empty cells before 1st */}
        {Array.from({ length: leadingEmptyDays }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Actual calendar days */}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`p-3 rounded-lg shadow-sm transition-all ${
              isToday(day)
                ? 'bg-blue-600 text-white font-semibold border border-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
            }`}
          >
            <div className="text-base">{format(day, 'd')}</div>
            <div className="text-xs">{format(day, 'EEE')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;

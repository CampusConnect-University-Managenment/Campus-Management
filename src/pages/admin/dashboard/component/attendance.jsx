import React, { useState } from 'react';

// Events for each month (0 = January, 11 = December)
const allMonthEvents = {
  0: [{ start: 1, end: 1, label: 'New Year' }],
  1: [{ start: 14, end: 14, label: 'Hackathon' }],
  2: [{ start: 8, end: 10, label: 'Tech Fest' }],
  3: [{ start: 25, end: 30, label: 'Project Week' }],
  4: [{ start: 1, end: 3, label: 'Cultural Fest' }],
  5: [{ start: 18, end: 20, label: 'Mid Exams' }],
  6: [{ start: 15, end: 15, label: 'Seminar' }],
  7: [{ start: 12, end: 13, label: 'Workshop' }],
  8: [{ start: 5, end: 5, label: "Teacher's Day" }],
  9: [{ start: 2, end: 2, label: 'Orientation' }],
  10: [{ start: 14, end: 14, label: "Children's Day" }],
  11: [{ start: 25, end: 25, label: 'Christmas' }],
};

const Attendance = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Prev
        </button>
        <h2 className="text-2xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next →
        </button>
      </div>

      <SingleMonthCalendar
        year={currentYear}
        month={currentMonth}
        events={allMonthEvents[currentMonth] || []}
      />
    </div>
  );
};

const SingleMonthCalendar = ({ year, month, events }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayIndex = new Date(year, month, 1).getDay();
  const today = new Date();
  const isThisMonth = today.getMonth() === month && today.getFullYear() === year;
  const todayDay = today.getDate();

  const weeks = [];
  let day = 1 - startDayIndex;
  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
      day++;
    }
    weeks.push(week);
  }

  const getEventForDay = (d) => {
    const e = events.find(e => d >= e.start && d <= e.end);
    return e ? e.label : null;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 uppercase mb-2 font-bold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[1px] bg-gray-200 text-sm">
        {weeks.map((week, wIdx) =>
          week.map((d, idx) => {
            const isToday = isThisMonth && d === todayDay;
            const eventLabel = d ? getEventForDay(d) : null;
            const isEventDay = Boolean(eventLabel);

            return (
              <div
                key={`${wIdx}-${idx}`}
                className={`
                  relative min-h-[90px] p-2 overflow-hidden 
                  flex flex-col justify-start items-start
                  transition-transform duration-200 transform hover:-translate-y-1
                  ${!d ? 'bg-gray-100 text-gray-400' : ''}
                  ${d && isEventDay ? 'bg-green-200' : d ? 'bg-white' : ''}
                  ${d && isToday ? 'border-2 border-black' : 'border border-white'}
                `}
              >
                {d && (
                  <div className="text-lg font-extrabold text-gray-800">{d}</div>
                )}
                {d && eventLabel && (
                  <div className="mt-2 text-base font-bold text-green-800 leading-snug">
                    {eventLabel}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Attendance;

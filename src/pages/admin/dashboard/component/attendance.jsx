import { useState } from 'react';

const allMonthEvents = {
  0: [{ start: 1, end: 1, label: 'New Year', venue: 'Auditorium', time: '10:00 AM' }],
  1: [{ start: 14, end: 14, label: 'Hackathon', venue: 'Lab 4', time: '9:00 AM - 6:00 PM' }],
  2: [{ start: 8, end: 10, label: 'Tech Fest', venue: 'Main Block', time: '10:00 AM - 5:00 PM' }],
  3: [{ start: 25, end: 30, label: 'Project Week', venue: 'Project Hall', time: 'All Day' }],
  4: [{ start: 1, end: 3, label: 'Cultural Fest', venue: 'Ground', time: '6:00 PM onwards' }],
  5: [{ start: 18, end: 20, label: 'Mid Exams', venue: 'Classrooms', time: '9:00 AM' }],
  6: [{ start: 15, end: 15, label: 'Seminar', venue: 'Conference Room', time: '2:00 PM - 4:00 PM' }],
  7: [{ start: 12, end: 13, label: 'Workshop', venue: 'Lab 2', time: '10:00 AM - 3:00 PM' }],
  8: [{ start: 5, end: 5, label: "Teacher's Day", venue: 'Auditorium', time: '11:00 AM' }],
  9: [{ start: 2, end: 2, label: 'Orientation', venue: 'Hall A', time: '10:00 AM - 1:00 PM' }],
  10: [{ start: 14, end: 14, label: "Children's Day", venue: 'Playground', time: '3:00 PM' }],
  11: [{ start: 25, end: 25, label: 'Christmas', venue: 'Campus', time: 'Holiday' }],
};

const Attendance = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleMonthChange = (e) => setCurrentMonth(Number(e.target.value));
  const handleYearChange = (e) => setCurrentYear(Number(e.target.value));

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  const maxYear = today.getFullYear();
  const yearOptions = Array.from({ length: maxYear - 1999 }, (_, i) => 2000 + i);

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center max-w-5xl mx-auto mb-4 gap-3">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-3">
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="px-3 py-2 border rounded font-bold"
          >
            {monthNames.map((name, index) => (
              <option key={index} value={index}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={handleYearChange}
            className="px-3 py-2 border rounded font-bold"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next →
        </button>
      </div>

      <h2 className="text-2xl font-extrabold text-center w-full mb-4">
        {monthNames[currentMonth]} {currentYear}
      </h2>

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
    return events.find((e) => d >= e.start && d <= e.end);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 uppercase mb-2 font-bold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[1px] bg-gray-200 text-sm overflow-visible relative z-0">
        {weeks.map((week, wIdx) =>
          week.map((d, idx) => {
            const isToday = isThisMonth && d === todayDay;
            const event = d ? getEventForDay(d) : null;

            return (
              <div
                key={`${wIdx}-${idx}`}
                className={`
                  relative min-h-[90px] p-2 overflow-visible
                  flex flex-col justify-start items-start
                  transition-transform duration-200 transform hover:-translate-y-1
                  ${!d ? 'bg-gray-100 text-gray-400' : ''}
                  ${d && event ? 'bg-green-200' : d ? 'bg-white' : ''}
                  ${d && isToday ? 'border-2 border-black' : 'border border-white'}
                  group hover:z-50 z-10
                `}
              >
                {d && <div className="text-lg font-extrabold text-gray-800">{d}</div>}

                {d && event && (
                  <>
                    <div className="mt-1 text-sm font-bold text-green-800 leading-snug truncate">
                      {event.label}
                    </div>
                    <div
                      className={`
                        absolute hidden group-hover:block bg-black text-white text-xs rounded p-2 w-44 shadow-lg
                        ${idx >= 5 ? 'right-full mr-2 top-0' : 'left-full ml-2 top-0'}
                      `}
                    >
                      <div><strong>{event.label}</strong></div>
                      <div>📍 {event.venue}</div>
                      <div>⏰ {event.time}</div>
                    </div>
                  </>
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

import { useState, useEffect } from 'react';

const allMonthEvents = {
  6: [
    { start: 30, end: 30, label: 'Holiday - Seminar', venue: 'Campus', time: 'Holiday' },
    { start: 31, end: 31, label: 'Mid Exams', venue: 'Class', time: '9:00 AM' },
  ],
  7: [
    { start: 15, end: 15, label: 'Dhruva Fest', venue: 'Auditorium', time: '6:00 PM' }
  ]
};

const Attendance = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  const [eventDate, setEventDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');

  useEffect(() => {
    if (selectedCalendarDate) {
      const [year, month, day] = selectedCalendarDate.split('-');
      setEventDate(`${year}-${month}-${day}`);
      setEventTitle('');
      setEventType('');
      document.getElementById('form-heading').innerText = `Add/Edit Event for ${selectedCalendarDate}`;
    }
  }, [selectedCalendarDate]);

  const handlePrev = () => {
    setSelectedCalendarDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    setSelectedCalendarDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(Number(e.target.value));
    setSelectedCalendarDate(null);
  };

  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value));
    setSelectedCalendarDate(null);
  };

  const handleClearForm = () => {
    setEventTitle('');
    setEventType('');
  };

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  const yearOptions = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center max-w-5xl mx-auto mb-4 gap-3">
        <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">← Prev</button>
        <div className="flex items-center gap-3">
          <select value={currentMonth} onChange={handleMonthChange} className="px-3 py-2 border rounded font-bold">
            {monthNames.map((name, i) => (
              <option key={i} value={i}>{name}</option>
            ))}
          </select>
          <select value={currentYear} onChange={handleYearChange} className="px-3 py-2 border rounded font-bold">
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next →</button>
      </div>

      <h2 className="text-2xl font-extrabold text-center w-full mb-4">
        {monthNames[currentMonth]} {currentYear}
      </h2>

      <Calendar
        year={currentYear}
        month={currentMonth}
        events={allMonthEvents[currentMonth] || []}
        selectedDate={selectedCalendarDate}
        setSelectedDate={setSelectedCalendarDate}
      />

      {selectedCalendarDate && (
        <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-5xl mx-auto mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 id="form-heading" className="text-xl font-bold">Add/Edit Event</h3>
            <button
              onClick={handleClearForm}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-150"
            >
              Clear Form
            </button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                id="eventDate"
                value={eventDate}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g., Sports Meet"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
              <select
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Type</option>
                <option value="exam">Exam</option>
                <option value="event">Event</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const Calendar = ({ year, month, events, selectedDate, setSelectedDate }) => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const weeks = [];
  let day = 1 - startDay;
  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day > 0 && day <= daysInMonth ? day : null);
      day++;
    }
    weeks.push(week);
  }

  const getEvent = (d) => events.find((e) => d >= e.start && d <= e.end);

  const getEventBoxClass = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes('holiday')) return 'bg-red-300';
    if (lower.includes('exam') || lower.includes('mid')) return 'bg-blue-200';
    return 'bg-green-200';
  };

  const handleDateClick = (d) => {
    if (d !== null) {
      const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      setSelectedDate(formatted);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-md p-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-7 text-center text-xs text-gray-600 font-bold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-0 bg-gray-200 text-sm">
        {weeks.map((week, i) =>
          week.map((d, j) => {
            const event = d ? getEvent(d) : null;
            const isToday = d === todayDate && month === todayMonth && year === todayYear;
            const formattedKey = d ? `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null;
            const isSelected = selectedDate === formattedKey;

            return (
              <div
                key={`${i}-${j}`}
                onClick={d !== null ? () => handleDateClick(d) : undefined}
                className={`
                  min-h-[90px] p-2 flex flex-col items-start justify-start
                  ${d ? 'bg-white' : 'bg-gray-100 text-gray-400'}
                  ${isToday ? 'bg-blue-100' : ''}
                  ${d && isSelected ? 'border-2 border-black' : 'border border-white'}
                  ${d ? 'cursor-pointer' : ''}
                  transition-all duration-150 ease-in-out
                `}
              >
                {d && <div className="text-lg font-extrabold text-gray-800">{d}</div>}
                {d && event && (
                  <div className={`text-sm mt-1 px-2 py-1 rounded font-semibold text-black ${getEventBoxClass(event.label)}`}>
                    {event.label}
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

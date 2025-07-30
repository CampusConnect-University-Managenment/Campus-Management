import { useState, useEffect } from 'react';

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
  const [events, setEvents] = useState(allMonthEvents);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    venue: '',
    time: '',
    type: '',
  });

  useEffect(() => {
    if (selectedCalendarDate) {
      const [year, month, day] = selectedCalendarDate.split('-');
      // You can pre-populate the form with existing event data here if needed
      setFormData({
        label: '',
        venue: '',
        time: '',
        type: '',
      });
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

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddEvent = () => {
    if (!formData.label || !formData.venue || !formData.time || selectedCalendarDate == null) return;
    const [year, month, day] = selectedCalendarDate.split('-').map(Number);

    const newEvent = {
      start: day,
      end: day,
      label: formData.label,
      venue: formData.venue,
      time: formData.time,
    };

    setEvents((prev) => ({
      ...prev,
      [month - 1]: [...(prev[month - 1] || []), newEvent],
    }));

    setFormData({ label: '', venue: '', time: '', type: '' });
    setSelectedCalendarDate(null);
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
        events={events[currentMonth] || []}
        selectedDate={selectedCalendarDate}
        setSelectedDate={setSelectedCalendarDate}
      />

      {selectedCalendarDate && (
        <div className="mt-6 max-w-5xl mx-auto bg-white p-4 rounded-xl border shadow">
          <h3 id="form-heading" className="text-lg font-semibold mb-3">
            Add Event for {selectedCalendarDate}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              readOnly
              value={selectedCalendarDate}
              className="px-3 py-2 border rounded bg-gray-100 w-[130px]"
            />
            <input
              type="text"
              name="label"
              placeholder="Event Title"
              value={formData.label}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded flex-1 min-w-[160px]"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded min-w-[130px]"
            >
              <option value="">Select Type</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Exam">Exam</option>
              <option value="Fest">Fest</option>
              <option value="Holiday">Holiday</option>
            </select>
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded flex-1 min-w-[160px]"
            />
            <input
              type="text"
              name="time"
              placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
              value={formData.time}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded flex-1 min-w-[200px]"
            />
            <button
              onClick={handleAddEvent}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Calendar Component ---

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
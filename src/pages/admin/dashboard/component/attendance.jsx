import { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  const [eventDate, setEventDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventId, setEventId] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth, currentYear]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  useEffect(() => {
    if (selectedCalendarDate) {
      const existing = events.find(ev => ev.date === selectedCalendarDate);
      setEventDate(selectedCalendarDate);
      setEndDate(existing ? existing.endDate : '');
      setEventTitle(existing ? existing.title : '');
      setEventType(existing ? existing.type : '');
      setEventId(existing ? existing._id : null);
    }
  }, [selectedCalendarDate, events]);

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

  const handleClearForm = () => {
    setEventTitle('');
    setEventType('');
    setEndDate('');
    setEventId(null);
    setSelectedCalendarDate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventType || !eventDate) {
      return alert('Please fill in title, type, and start date');
    }

    const payload = {
      title: eventTitle,
      type: eventType,
      startDate: eventDate,
      endDate: endDate || eventDate
    };

    try {
      if (eventId) {
        await axios.put(`http://localhost:5000/api/events/${eventId}`, {
          ...payload,
          date: eventDate
        });
        alert('Event updated!');
      } else {
        await axios.post('http://localhost:5000/api/events/range', payload);
        alert('Event(s) created!');
      }
      await fetchEvents();
      handleClearForm();
    } catch (err) {
      console.error(err);
      alert(`Failed to save event: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      await fetchEvents();
      alert("Event deleted");
      handleClearForm();
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
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
          <select value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))} className="px-3 py-2 border rounded font-bold">
            {monthNames.map((name, i) => (
              <option key={i} value={i}>{name}</option>
            ))}
          </select>
          <select value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="px-3 py-2 border rounded font-bold">
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
        events={events}
        selectedDate={selectedCalendarDate}
        setSelectedDate={setSelectedCalendarDate}
      />

      {selectedCalendarDate && (
        <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-5xl mx-auto mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Add/Edit Event for {selectedCalendarDate}</h3>
            <button
              onClick={handleClearForm}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-150"
            >
              Clear Form
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                id="eventDate"
                value={eventDate}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date (optional)</label>
              <input
                type="text"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              />
            </div>

            <div>
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

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              {eventId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                {eventId ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const Calendar = ({ year, month, events, selectedDate, setSelectedDate }) => {
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

  const getEventsForDay = (d) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return events.filter(ev => ev.date === dateStr);
  };

  const getEventBoxClass = (type) => {
    const lower = type?.toLowerCase();
    if (lower === 'holiday') return 'bg-red-300';
    if (lower === 'exam') return 'bg-blue-200';
    return 'bg-green-200';
  };

  return (
    <div className="bg-white border rounded-xl shadow-md p-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-7 text-center text-xs text-gray-600 font-bold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-px">
        {weeks.map((week, i) =>
          week.map((d, j) => {
            const dateKey = d ? `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null;
            const eventsToday = d ? getEventsForDay(d) : [];
            const isSelected = selectedDate === dateKey;

            return (
              <div
                key={`${i}-${j}`}
                onClick={d ? () => setSelectedDate(dateKey) : undefined}
                className={`min-h-[90px] p-2 flex flex-col items-start justify-start
                  ${d ? 'bg-white' : 'bg-gray-100 text-gray-400'}
                  ${isSelected ? 'border-2 border-black' : 'border border-white'}
                  ${d ? 'cursor-pointer' : ''}`}
              >
                {d && <div className="text-lg font-extrabold text-gray-800">{d}</div>}
                {eventsToday.map((ev, idx) => (
                  <div key={idx} className={`text-xs mt-1 px-2 py-1 rounded ${getEventBoxClass(ev.type)} font-semibold`}>
                    {ev.title}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Attendance;

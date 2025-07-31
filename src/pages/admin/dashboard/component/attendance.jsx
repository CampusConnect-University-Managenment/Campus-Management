import { useState, useEffect } from 'react';
import axios from 'axios';

const formatDateToYMD = (date) => {
  try {
    return new Date(date).toISOString().slice(0, 10);
  } catch (err) {
    return '';
  }
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
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return events.filter(ev => dayStr >= ev.startDate && dayStr <= ev.endDate);
  };

  const getBoxStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'exam': return 'bg-blue-200';
      case 'modal lab': return 'bg-purple-200';
      case 'holiday': return 'bg-red-300';
      default: return 'bg-green-200';
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
            const formattedKey = d ? `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null;
            const isSelected = selectedDate === formattedKey;
            const eventsToday = d ? getEventsForDay(d) : [];

            return (
              <div
                key={`${i}-${j}`}
                onClick={d ? () => setSelectedDate(formattedKey) : undefined}
                className={`min-h-[90px] p-2 flex flex-col items-start justify-start
                  ${d ? 'bg-white cursor-pointer' : 'bg-gray-100 text-gray-400'}
                  ${d && isSelected ? 'border border-black' : 'border border-white'}
                `}
              >
                {d && <div className="text-lg font-extrabold">{d}</div>}
                {eventsToday.map((ev, idx) => (
                  <div key={idx} className={`text-xs mt-1 px-2 py-1 rounded ${getBoxStyle(ev.type)} font-semibold`}>
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

const Attendance = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventId, setEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [manualEdit, setManualEdit] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (selectedDate) {
      const found = events.find(ev => selectedDate >= ev.startDate && selectedDate <= ev.endDate);
      setStartDate(found ? found.startDate : selectedDate);
      setEndDate(found ? found.endDate : selectedDate);
      setEventTitle(found ? found.title : '');
      setEventType(found ? found.type : '');
      setEventId(found ? found.id : null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && !manualEdit) autoFillRange(eventType, selectedDate);
  }, [eventType]);

  const autoFillRange = (type, baseDate) => {
    if (!type || !baseDate) return;
    const start = new Date(baseDate);
    let current = new Date(start);
    let added = 0, daysNeeded = 0;

    if (type === 'exam') daysNeeded = 6;
    else if (type === 'modal lab') daysNeeded = 3;
    else {
      setStartDate(baseDate);
      setEndDate(baseDate);
      return;
    }

    while (added < daysNeeded) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0) added++; // Skip Sundays
    }

    setStartDate(baseDate);
    setEndDate(formatDateToYMD(current));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventType || !startDate || !endDate) return alert('Fill all fields');
    if (startDate > endDate) return alert('Start date after end date');

    const payload = { startDate, endDate, title: eventTitle, type: eventType };
    try {
      if (eventId) {
        await axios.put(`http://localhost:5000/api/events/${eventId}`, payload);
        alert('Event updated');
      } else {
        await axios.post('http://localhost:5000/api/events', payload);
        alert('Event created');
      }
      fetchEvents();
      clearForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save event.');
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    if (!window.confirm("Are you sure to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      alert("Event deleted");
      fetchEvents();
      clearForm();
    } catch (err) {
      console.error(err);
      alert("Failed to delete event.");
    }
  };

  const clearForm = () => {
    setEventId(null);
    setStartDate('');
    setEndDate('');
    setEventTitle('');
    setEventType('');
    setSelectedDate(null);
    setManualEdit(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-4 gap-3">
        <button onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)} className="bg-blue-500 text-white px-4 py-2 rounded">← Prev</button>
        <div className="flex gap-3">
          <select value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))} className="border p-2 rounded">
            {[...Array(12)].map((_, idx) => <option key={idx} value={idx}>{new Date(0, idx).toLocaleString('default', { month: 'long' })}</option>)}
          </select>
          <select value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="border p-2 rounded">
            {[...Array(10)].map((_, i) => today.getFullYear() - 5 + i).map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">Next →</button>
      </div>

      <Calendar
        year={currentYear}
        month={currentMonth}
        events={events}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {selectedDate && (
        <div className="bg-white p-6 mt-6 border rounded-xl shadow-md max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Add/Edit Event for {selectedDate}</h3>
            <button onClick={clearForm} className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">Clear Form</button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Start Date</label>
              <input type="date" value={formatDateToYMD(startDate)} onChange={(e) => { setStartDate(e.target.value); setManualEdit(true); }} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>End Date</label>
              <input type="date" value={formatDateToYMD(endDate)} onChange={(e) => { setEndDate(e.target.value); setManualEdit(true); }} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>Event Title</label>
              <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>Event Type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full border p-2 rounded">
                <option value="">Select Type</option>
                <option value="exam">Exam</option>
                <option value="modal lab">Modal Lab</option>
                <option value="event">Event</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>
            <div className="col-span-2 flex justify-between">
              {eventId && (
                <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete Event</button>
              )}
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto">
                {eventId ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Attendance;

import { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = ({ year, month, events, selectedDate, setSelectedDate }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const weeks = [];
  let day = 1 - startDay;

const getEventsForDay = (d) => {
  const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return events.filter(ev => dayStr === ev.date);
};


  const getBoxColor = (type) => {
    switch (type.toLowerCase()) {
      case 'holiday': return 'bg-red-300';
      case 'exam': return 'bg-blue-200';
      case 'event': return 'bg-green-200';
      default: return 'bg-gray-200';
    }
  };

  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day > 0 && day <= daysInMonth ? day : null);
      day++;
    }
    weeks.push(week);
  }

  return (
    <div className="bg-white border rounded-xl shadow-md p-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-7 text-center text-xs font-bold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0 bg-gray-200 text-sm">
        {weeks.map((week, i) =>
          week.map((d, j) => {
            const dateStr = d ? `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null;
            const isSelected = selectedDate === dateStr;
            const eventsToday = d ? getEventsForDay(d) : [];
            const boxColor = eventsToday.length > 0 ? getBoxColor(eventsToday[0].type) : 'bg-white';

            return (
              <div
                key={`${i}-${j}`}
                onClick={() => d && setSelectedDate(dateStr)}
                className={`min-h-[90px] p-2 flex flex-col items-start border cursor-pointer
                  ${d ? boxColor : 'bg-gray-100 text-gray-400'}
                  ${isSelected ? 'border-black' : 'border-white'}`}
              >
                {d && <div className="font-bold">{d}</div>}
                {eventsToday.map((ev, idx) => (
                  <div key={idx} className={`text-xs mt-1 px-2 py-1 rounded ${getBoxColor(ev.type)} font-semibold`}>
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

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events', err);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate);
      setEndDate('');
      setEventTitle('');
      setEventType('');
      setEventId(null);
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventType || !startDate) return alert("Fill in all fields");

    const sameDateEvents = events.filter(ev => ev.startDate === startDate);
    if (!eventId && sameDateEvents.length >= 3) {
      return alert("Maximum 3 events allowed per date.");
    }

   const payload = {
  title: eventTitle,
  type: eventType,
  startDate,
  endDate: endDate || null,
};


    try {
      if (eventId) {
        await axios.put(`http://localhost:5000/api/events/${eventId}`, payload);
        alert("Event updated");
      } else {
        await axios.post('http://localhost:5000/api/events', payload);
        alert("Event created");
      }
      fetchEvents();
      clearForm();
    } catch (err) {
      console.error("Error saving event", err);
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
      console.error("Error deleting", err);
    }
  };

  const clearForm = () => {
    setEventId(null);
    setStartDate('');
    setEndDate('');
    setEventTitle('');
    setEventType('');
    setSelectedDate(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-4">
        <button onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)} className="bg-blue-500 text-white px-4 py-2 rounded">← Prev</button>
        <div className="flex gap-3">
          <select value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))} className="border p-2 rounded">
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
          <select value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="border p-2 rounded">
            {[...Array(10)].map((_, i) => {
              const year = today.getFullYear() - 5 + i;
              return <option key={year} value={year}>{year}</option>;
            })}
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
        <div className="bg-white border rounded-xl shadow-md p-6 mt-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Add/Edit Event for {selectedDate}</h3>
            <button onClick={clearForm} className="bg-gray-200 px-4 py-2 rounded">Clear</button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Start Date</label>
              <input type="text" value={startDate} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div>
              <label>End Date</label>
              <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="Optional" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>Title</label>
              <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>Type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full border p-2 rounded">
                <option value="">Select</option>
                <option value="holiday">Holiday</option>
                <option value="exam">Exam</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div className="col-span-2 flex justify-between mt-2">
              {eventId && (
                <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              )}
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded ml-auto">
                {eventId ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Attendance;

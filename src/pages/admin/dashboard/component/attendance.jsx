import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Utility to safely convert Date object to YYYY-MM-DD
const formatDateToYMD = (date) => {
  if (!date) return ''; // Handle null or undefined date
  try {
    // Ensure date is a valid Date object before calling toISOString
    const d = new Date(date);
    if (isNaN(d.getTime())) { // Check for "Invalid Date"
      return '';
    }
    return d.toISOString().slice(0, 10);
  } catch (err) {
    console.error("Error formatting date:", err);
    return '';
  }
};

// Calendar Component
const Calendar = ({ year, month, events, selectedDate, setSelectedDate }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday
  const weeks = [];
  let day = 1 - startDay; // Start day for the calendar grid

  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day > 0 && day <= daysInMonth ? day : null);
      day++;
    }
    weeks.push(week);
  }

  const getEventsForDay = useCallback((d) => {
    if (!d) return [];
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return events.filter(ev => {
      // Ensure ev.startDate and ev.endDate are valid strings for comparison
      return dayStr >= ev.startDate && dayStr <= ev.endDate;
    });
  }, [year, month, events]); // Add events to dependencies

  const getBoxStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'exam': return 'bg-blue-200';
      case 'modal lab': return 'bg-purple-200';
      case 'holiday': return 'bg-red-300';
      case 'event': return 'bg-yellow-200'; // Added for 'event' type
      default: return 'bg-gray-200'; // Default for unrecognized types
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
                  ${d && isSelected ? 'border-2 border-black' : 'border border-gray-200'}
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
  const [selectedDate, setSelectedDate] = useState(null); // YYYY-MM-DD string
  const [startDate, setStartDate] = useState(''); // YYYY-MM-DD string
  const [endDate, setEndDate] = useState(''); // YYYY-MM-DD string
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventId, setEventId] = useState(null);
  const [events, setEvents] = useState([]); // events fetched from API
  const [manualEdit, setManualEdit] = useState(false); // To prevent autofill when user manually changes date

  // Use useCallback for fetchEvents to prevent unnecessary re-creations
  const fetchEvents = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      // Assuming your backend sends startDate and endDate as YYYY-MM-DD strings
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      // Optionally alert user or show a message on UI
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, currentMonth, currentYear]); // Refetch when month/year changes if your backend would support it.

  const clearForm = useCallback(() => {
    setEventId(null);
    setStartDate('');
    setEndDate('');
    setEventTitle('');
    setEventType('');
    setSelectedDate(null);
    setManualEdit(false);
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    if (selectedDate) {
      // Find event that spans the selected date
      const found = events.find(ev => selectedDate >= ev.startDate && selectedDate <= ev.endDate);

      // If an event is found, populate the form with its details
      if (found) {
        setStartDate(found.startDate);
        setEndDate(found.endDate);
        setEventTitle(found.title);
        setEventType(found.type);
        setEventId(found.id);
      } else {
        // If no event found for the selected date, initialize with selectedDate
        setStartDate(selectedDate);
        setEndDate(selectedDate);
        setEventTitle('');
        setEventType('');
        setEventId(null);
      }
      setManualEdit(false); // Reset manual edit whenever selectedDate changes
    } else {
      clearForm(); // Clear form if no date is selected
    }
  }, [selectedDate, events, clearForm]); // Add 'events' and 'clearForm' to dependency array

  // useCallback for autoFillRange as it's used in useEffect
  const autoFillRange = useCallback((type, baseDate) => {
    if (!type || !baseDate) {
      setStartDate(baseDate || ''); // Ensure baseDate is set if available
      setEndDate(baseDate || '');
      return;
    }

    const start = new Date(baseDate + 'T00:00:00'); // Add time to avoid timezone issues for date calculations
    if (isNaN(start.getTime())) { // Validate baseDate
      console.error("Invalid baseDate for autoFillRange:", baseDate);
      setStartDate(baseDate || '');
      setEndDate(baseDate || '');
      return;
    }

    let current = new Date(start);
    let added = 0;
    let daysNeeded = 0;

    if (type === 'exam') daysNeeded = 6;
    else if (type === 'modal lab') daysNeeded = 3;
    else {
      setStartDate(baseDate);
      setEndDate(baseDate);
      return;
    }

    // Loop to find end date, skipping Sundays (day 0)
    while (added < daysNeeded) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0) { // Check if it's not a Sunday (0 = Sunday)
        added++;
      }
    }

    setEndDate(formatDateToYMD(current)); // Ensure this is YYYY-MM-DD
    setStartDate(baseDate); // Set start date after auto-filling end date
  }, []); // Empty dependency array as it only depends on its args

  useEffect(() => {
    // Only auto-fill if a date is selected and manualEdit is false
    if (selectedDate && !manualEdit) {
      autoFillRange(eventType, selectedDate);
    }
  }, [eventType, selectedDate, manualEdit, autoFillRange]); // Added autoFillRange to dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventType || !startDate || !endDate) {
      alert('Please fill all required fields: Event Title, Event Type, Start Date, End Date.');
      return;
    }
    // Convert 'DD-MM-YYYY' from image to 'YYYY-MM-DD' for comparison if input values are directly from image.
    // However, since type="date" inputs give YYYY-MM-DD, and formatDateToYMD output is YYYY-MM-DD,
    // this comparison should work correctly assuming state holds YYYY-MM-DD.
    if (startDate > endDate) {
      alert('Start date cannot be after end date.');
      return;
    }

    const payload = { startDate, endDate, title: eventTitle, type: eventType };
    try {
      if (eventId) {
        await axios.put(`http://localhost:5000/api/events/${eventId}`, payload);
        alert('Event updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/events', payload);
        alert('Event created successfully!');
      }
      fetchEvents(); // Re-fetch events to update the calendar display
      clearForm(); // Clear the form after successful submission
    } catch (err) {
      console.error('Failed to save event:', err.response ? err.response.data : err.message);
      alert('Failed to save event. Please try again.'); // More generic error message for user
    }
  };

  const handleDelete = async () => {
    if (!eventId) {
      alert("No event selected for deletion.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      alert("Event deleted successfully!");
      fetchEvents(); // Re-fetch events
      clearForm(); // Clear form
    } catch (err) {
      console.error('Failed to delete event:', err.response ? err.response.data : err.message);
      alert("Failed to delete event. Please try again.");
    }
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
            <button type="button" onClick={clearForm} className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">Clear Form</button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate} // startDate is already YYYY-MM-DD
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setManualEdit(true);
                }}a
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate} // endDate is already YYYY-MM-DD
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setManualEdit(true);
                }}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="eventTitle" className="block text-gray-700 text-sm font-bold mb-2">Event Title</label>
              <input
                type="text"
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="eventType" className="block text-gray-700 text-sm font-bold mb-2">Event Type</label>
              <select
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full border p-2 rounded"
              >
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

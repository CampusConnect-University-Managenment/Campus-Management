import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from './calendar';
import CalendarInput from './calendarInput';

const AcademicCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  // form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventId, setEventId] = useState(null);

  // load events when month/year changes (or on mount)
  useEffect(() => {
    fetchEvents();
  }, [currentMonth, currentYear]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(
        res.data.map((ev) => ({
          _id: ev.id || ev._id || ev.id,
          date: ev.date,
          title: ev.title,
          type: ev.type,
          startDate: ev.date,
          endDate: ev.date,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch events:', err);
      alert('Could not load calendar events');
    }
  };

  // sync form when a date is selected
  useEffect(() => {
    if (!selectedDate) return;
    const existing = events.find((ev) => {
      const sel = new Date(selectedDate);
      const start = new Date(ev.startDate);
      const end = new Date(ev.endDate);
      return sel >= start && sel <= end;
    });

    setEventTitle(existing ? existing.title : '');
    setEventType(existing ? existing.type : '');
    setEndDate(existing ? existing.endDate : '');
    setEventId(existing ? existing._id : null);
  }, [selectedDate, events]);

  const handlePrev = () => {
    setSelectedDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    setSelectedDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const clearForm = () => {
    setEventTitle('');
    setEventType('');
    setEndDate('');
    setEventId(null);
    setSelectedDate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventType || !selectedDate) {
      return alert('Please fill title, type, and start date');
    }

    const payload = {
      title: eventTitle,
      type: eventType,
      startDate: selectedDate,
      endDate: endDate || selectedDate,
    };

    try {
      if (eventId) {
        await axios.put(`http://localhost:5000/api/events/${eventId}`, {
          title: eventTitle,
          type: eventType,
        });
        alert('Event updated!');
      } else {
        if (endDate && endDate !== selectedDate) {
          await axios.post('http://localhost:5000/api/events/range', payload);
        } else {
          await axios.post('http://localhost:5000/api/events', payload);
        }
        alert('Event created!');
      }
      await fetchEvents();
      clearForm();
    } catch (err) {
      console.error('Save failed:', err);
      alert(`Failed to save event: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      alert('Event deleted');
      await fetchEvents();
      clearForm();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete event');
    }
  };

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  const yearOptions = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap justify-between items-center max-w-5xl mx-auto mb-4 gap-3">
        <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          ← Prev
        </button>
        <div className="flex items-center gap-3">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
            className="px-3 py-2 border rounded font-bold"
          >
            {monthNames.map((name, i) => (
              <option key={i} value={i}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="px-3 py-2 border rounded font-bold"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next →
        </button>
      </div>

      <h2 className="text-2xl font-extrabold text-center w-full mb-4">
        {monthNames[currentMonth]} {currentYear}
      </h2>

      <Calendar
        year={currentYear}
        month={currentMonth}
        events={events}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {selectedDate && (
        <CalendarInput
          selectedDate={selectedDate}
          eventTitle={eventTitle}
          eventType={eventType}
          endDate={endDate}
          onTitleChange={(e) => setEventTitle(e.target.value)}
          onTypeChange={(e) => setEventType(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClear={clearForm}
          isUpdate={!!eventId}
        />
      )}
    </div>
  );
};

export default AcademicCalendar;




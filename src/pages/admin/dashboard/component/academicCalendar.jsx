// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Calendar from './calendar';
// import CalendarInput from './calendarInput';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AcademicCalendar = () => {
//   const today = new Date();
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [events, setEvents] = useState([]);

//   // form state
//   const [eventTitle, setEventTitle] = useState('');
//   const [eventType, setEventType] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [eventId, setEventId] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, [currentMonth, currentYear]);

//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/events');
//       setEvents(
//         res.data.map((ev) => ({
//           _id: ev.id || ev._id,
//           date: ev.date,
//           title: ev.title,
//           type: ev.type,
//           startDate: ev.date,
//           endDate: ev.date,
//         }))
//       );
//     } catch (err) {
//       console.error('Failed to fetch events:', err);
//       toast.error('Could not load calendar events');
//     }
//   };

//   useEffect(() => {
//     if (!selectedDate) return;
//     const existing = events.find((ev) => {
//       const sel = new Date(selectedDate);
//       const start = new Date(ev.startDate);
//       const end = new Date(ev.endDate);
//       return sel >= start && sel <= end;
//     });

//     setEventTitle(existing ? existing.title : '');
//     setEventType(existing ? existing.type : '');
//     setEndDate(existing ? existing.endDate : '');
//     setEventId(existing ? existing._id : null);
//   }, [selectedDate, events]);

//   const handlePrev = () => {
//     setSelectedDate(null);
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear((y) => y - 1);
//     } else {
//       setCurrentMonth((m) => m - 1);
//     }
//   };

//   const handleNext = () => {
//     setSelectedDate(null);
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear((y) => y + 1);
//     } else {
//       setCurrentMonth((m) => m + 1);
//     }
//   };

//   const clearForm = () => {
//     setEventTitle('');
//     setEventType('');
//     setEndDate('');
//     setEventId(null);
//     setSelectedDate(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!eventTitle || !eventType || !selectedDate) {
//       toast.warn('Please fill title, type, and start date');
//       return;
//     }

//     const payload = {
//       title: eventTitle,
//       type: eventType,
//       startDate: selectedDate,
//       endDate: endDate || selectedDate,
//     };

//     try {
//       if (eventId) {
//         await axios.put(`http://localhost:5000/api/events/${eventId}`, {
//           title: eventTitle,
//           type: eventType,
//         });
//         toast.success('Event updated!');
//       } else {
//         if (endDate && endDate !== selectedDate) {
//           await axios.post('http://localhost:5000/api/events/range', payload);
//         } else {
//           await axios.post('http://localhost:5000/api/events', payload);
//         }
//         toast.success('Event created!');
//       }
//       await fetchEvents();
//       clearForm();
//     } catch (err) {
//       console.error('Save failed:', err);
//       toast.error(`Failed to save event: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   const handleDelete = async () => {
//     if (!eventId) return;
//     if (!window.confirm('Are you sure you want to delete this event?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/events/${eventId}`);
//       toast.success('Event deleted');
//       await fetchEvents();
//       clearForm();
//     } catch (err) {
//       console.error('Delete failed:', err);
//       toast.error('Failed to delete event');
//     }
//   };

//   const monthNames = Array.from({ length: 12 }, (_, i) =>
//     new Date(0, i).toLocaleString('default', { month: 'long' })
//   );
//   const yearOptions = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

//   return (
//     <div className="mt-10">
//       <div className="flex flex-wrap justify-between items-center max-w-5xl mx-auto mb-4 gap-3">
//         <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           ← Prev
//         </button>
//         <div className="flex items-center gap-3">
//           <select
//             value={currentMonth}
//             onChange={(e) => setCurrentMonth(Number(e.target.value))}
//             className="px-3 py-2 border rounded font-bold"
//           >
//             {monthNames.map((name, i) => (
//               <option key={i} value={i}>
//                 {name}
//               </option>
//             ))}
//           </select>
//           <select
//             value={currentYear}
//             onChange={(e) => setCurrentYear(Number(e.target.value))}
//             className="px-3 py-2 border rounded font-bold"
//           >
//             {yearOptions.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           Next →
//         </button>
//       </div>

//       <h2 className="text-2xl font-extrabold text-center w-full mb-4">
//         {monthNames[currentMonth]} {currentYear}
//       </h2>

//       <Calendar
//         year={currentYear}
//         month={currentMonth}
//         events={events}
//         selectedDate={selectedDate}
//         onSelectDate={setSelectedDate}
//       />

//       {selectedDate && (
//         <CalendarInput
//           selectedDate={selectedDate}
//           eventTitle={eventTitle}
//           eventType={eventType}
//           endDate={endDate}
//           onTitleChange={(e) => setEventTitle(e.target.value)}
//           onTypeChange={(e) => setEventType(e.target.value)}
//           onEndDateChange={(e) => setEndDate(e.target.value)}
//           onSubmit={handleSubmit}
//           onDelete={handleDelete}
//           onClear={clearForm}
//           isUpdate={!!eventId}
//         />
//       )}

//       {/* Toast container for notifications */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default AcademicCalendar;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from './calendar';
import CalendarInput from './calendarInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth, currentYear]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(
        res.data.map((ev) => ({
          _id: ev.id || ev._id,
          date: ev.date,
          title: ev.title,
          type: ev.type,
          startDate: ev.date,
          endDate: ev.date,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch events:', err);
      toast.error('Could not load calendar events');
    }
  };

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
      toast.warn('Please fill title, type, and start date');
      return;
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
        toast.success('Event updated!');
      } else {
        if (endDate && endDate !== selectedDate) {
          await axios.post('http://localhost:5000/api/events/range', payload);
        } else {
          await axios.post('http://localhost:5000/api/events', payload);
        }
        toast.success('Event created!');
      }
      await fetchEvents();
      clearForm();
    } catch (err) {
      console.error('Save failed:', err);
      toast.error(`Failed to save event: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      toast.success('Event deleted');
      await fetchEvents();
      clearForm();
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete event');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  const yearOptions = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

  return (
    <div className="mt-10 relative">
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
          onDelete={() => setShowDeleteModal(true)}
          onClear={clearForm}
          isUpdate={!!eventId}
        />
      )}

      {/* Toast container with custom offset */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{ marginTop: '60px' }} // Push down below nav bar
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this event?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;

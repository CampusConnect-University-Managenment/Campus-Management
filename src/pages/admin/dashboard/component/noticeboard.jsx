import React, { useState } from "react";

const NoticeBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([
    {
      name: "Faculty Meeting",
      time: "10:00 AM",
      venue: "Conference Room A",
      date: "",
    },
    {
      name: "Student Orientation",
      time: "2:00 PM",
      venue: "Main Auditorium",
      date: "",
    },
    {
      name: "Library Workshop",
      time: "3:30 PM",
      venue: "Library Hall",
      date: "",
    },
    {
      name: "Emergency Drill",
      time: "4:00 PM",
      venue: "Campus Wide",
      date: "",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    time: "",
    venue: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const istDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
    const istTimeString = istDateTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    const newEntry = {
      ...newEvent,
      time: istTimeString,
    };

    setEvents([newEntry, ...events]);
    setShowForm(false);
    setNewEvent({ name: "", time: "", venue: "", date: "" });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border h-full">
      {/* Form above header */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-6 bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-bold mb-4">Add New Event</h3>

          <div className="mb-3">
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Event Name</label>
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. Guest Lecture"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={newEvent.venue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. Auditorium B"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}

      {/* Notice Board Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
          📢 Notice Board - Today's Events
        </h2>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 font-bold px-3 py-1 rounded-full text-xl"
          onClick={() => setShowForm((prev) => !prev)}
        >
          +
        </button>
      </div>

      {/* Event List */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            <p className="font-bold text-lg">{event.name}</p>
            <p className="font-semibold">🕒 {event.time}</p>
            <p className="font-medium">📍 {event.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;

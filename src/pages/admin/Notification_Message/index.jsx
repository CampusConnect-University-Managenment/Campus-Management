import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar"; // Ensure this path is correct

const Notification_Message = () => {
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
    <div className="flex min-h-screen bg-gray-50 mt-[50px]">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              📢 Notice Board - Today's Events
            </h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center"
              onClick={() => setShowForm(!showForm)}
              aria-label="Add Event"
            >
              <span className="text-xl font-bold">+</span>
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <form onSubmit={handleFormSubmit} className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={newEvent.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold"
              >
                Submit
              </button>
            </form>
          )}

          {/* Event List */}
          <div>
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-blue-50 hover:bg-blue-500 hover:text-white transition-colors rounded-lg p-4 mb-4 shadow"
              >
                <div className="text-lg font-bold">{event.name}</div>
                <div className="text-sm">🕒 {event.time}</div>
                <div className="text-sm">📍 {event.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification_Message;

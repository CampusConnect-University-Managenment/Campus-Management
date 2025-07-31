import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FacultyCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    fetchEvents(currentYear, currentMonth + 1);
  }, [currentMonth, currentYear]);

  const fetchEvents = async (year, month) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events?year=${year}&month=${month}`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const formatDate = (day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const getEventsForDate = (day) =>
    events.filter((event) => event.date === formatDate(day));

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span role="img" aria-label="calendar">📅</span> Academic Calendar
        </h3>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button onClick={prevMonth} className="rounded-full p-2 hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-medium">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth} className="rounded-full p-2 hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {daysOfWeek.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-sm gap-y-1">
        {/* Empty slots */}
        {Array(firstDayOfMonth).fill("").map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isSelected = selectedDate?.day === day;
          const eventCount = getEventsForDate(day).length;
          const hasEvent = eventCount > 0;

          return (
            <div
              key={day}
              onClick={() => setSelectedDate({ day, events: getEventsForDate(day) })}
              className={`relative p-2 cursor-pointer rounded-full mx-auto w-10 h-10 flex items-center justify-center ${
                isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              {day}
              {hasEvent && (
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-red-500"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Day Event Info */}
      <div className="text-sm text-gray-500 mt-4 text-center">
        {selectedDate?.events?.length > 0 ? (
          <>
            <strong>{formatDate(selectedDate.day)}</strong> has{" "}
            {selectedDate.events.length} event(s)
          </>
        ) : (
          "Select a date to see details."
        )}
      </div>
    </div>
  );
}

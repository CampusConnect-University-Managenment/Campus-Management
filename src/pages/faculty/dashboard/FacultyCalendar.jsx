// components/AcademicCalendar.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

<<<<<<< HEAD
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const colorMap = {
  holiday: "bg-red-200",
  exam: "bg-blue-200",
  event: "bg-green-200",
};

export default function AcademicCalendar({ apiUrl = "http://localhost:5000/api/events" }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [academicEvents, setAcademicEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
=======
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
>>>>>>> main

  // Fetch from backend when month/year changes (or on mount)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(apiUrl);
        setAcademicEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, [currentMonth, currentYear, apiUrl]);

  const formatDate = (date) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

  const getEventsForDate = (date) => {
    const key = formatDate(date);
    return academicEvents.filter((event) => event.date === key);
  };

<<<<<<< HEAD
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalCells = firstDayOfMonth + daysInMonth;
  const endEmptyCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
=======
  const formatDate = (day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const getEventsForDate = (day) =>
    events.filter((event) => event.date === formatDate(day));
>>>>>>> main

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
<<<<<<< HEAD
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
=======
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
>>>>>>> main
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
<<<<<<< HEAD
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md lg:col-span-2 flex flex-col h-[474px] overflow-scroll">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Academic Calendar</h3>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={prevMonth}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Prev
        </button>
        <div className="flex space-x-2">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={nextMonth}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next →
        </button>
      </div>

      <h2 className="text-md font-bold text-center mb-2">
        {monthNames[currentMonth]} {currentYear}
      </h2>

      {/* Week Headers */}
      <div className="grid grid-cols-7 text-xs mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="h-8 flex items-center justify-center font-semibold text-gray-700"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-xs flex-grow gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-16 bg-gray-100" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1;
          const events = getEventsForDate(date);
          const hasEvent = events.length > 0;
          const isSelected =
            selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
              date
            ).padStart(2, "0")}`;

          return (
            <div
              key={date}
              onClick={() =>
                setSelectedDate(
                  `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(
                    2,
                    "0"
                  )}`
                )
              }
              className={`h-16 bg-white flex flex-col items-center justify-start cursor-pointer relative rounded border ${
                isSelected ? "border-black border-2" : "border-gray-200"
              } p-1`}
            >
              <div className="font-bold text-gray-800 pt-1 text-sm">{date}</div>
              <div className="mt-1 flex flex-col gap-1 w-full px-1">
                {events.map((event, idx) => {
                  const type = event.type?.toLowerCase();
                  const color = colorMap[type] || "bg-gray-200";
                  return (
                    <span
                      key={idx}
                      className={`block text-[10px] rounded px-1.5 py-0.5 font-semibold truncate ${color}`}
                    >
                      {event.title}
                    </span>
                  );
                })}
              </div>
=======
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
>>>>>>> main
            </div>
          );
        })}

        {Array.from({ length: endEmptyCells }).map((_, i) => (
          <div key={`end-empty-${i}`} className="h-16 bg-gray-100" />
        ))}
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

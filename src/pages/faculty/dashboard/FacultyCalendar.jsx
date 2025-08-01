import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AcademicCalendar({ apiUrl }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [academicEvents, setAcademicEvents] = useState([]);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const colorMap = {
    holiday: "bg-red-200",
    exam: "bg-blue-200",
    event: "bg-green-200",
  };

  // ✅ Fetch events whenever month/year changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(apiUrl);
        localStorage.setItem("calendarEvents", JSON.stringify(res.data));
        setAcademicEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        const stored = localStorage.getItem("calendarEvents");
        if (stored) setAcademicEvents(JSON.parse(stored));
      }
    };
    fetchEvents();
  }, [currentMonth, currentYear, apiUrl]);

  // ✅ Sync with localStorage (if admin adds events)
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("calendarEvents");
      if (stored) setAcademicEvents(JSON.parse(stored));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const formatDate = (date) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

  const getEventsForDate = (date) => {
    const key = formatDate(date);
    return academicEvents.filter((event) => event.date === key);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalCells = firstDayOfMonth + daysInMonth;
  const endEmptyCells = (7 - (totalCells % 7)) % 7;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col h-[474px] overflow-scroll">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Academic Calendar</h3>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={prevMonth} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">← Prev</button>
        <div className="flex space-x-2">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button onClick={nextMonth} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Next →</button>
      </div>

      <h2 className="text-md font-bold text-center mb-2">
        {monthNames[currentMonth]} {currentYear}
      </h2>

      {/* Week Headers */}
      <div className="grid grid-cols-7 text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="h-8 flex items-center justify-center font-semibold text-gray-700">{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-xs flex-grow">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-16 bg-gray-100 ml-1" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1;
          const events = getEventsForDate(date);

          return (
            <div key={date} className="h-16 bg-white flex flex-col items-center justify-start cursor-pointer">
              <div className="font-bold text-gray-800 pt-1">{date}</div>
              {events.map((event, idx) => {
                const type = event.type?.toLowerCase();
                const color = colorMap[type] || "bg-gray-200";
                return (
                  <span
                    key={idx}
                    className={`mt-1 px-1.5 py-0.5 text-[10px] rounded shadow-sm truncate ${color}`}
                  >
                    {event.title}
                  </span>
                );
              })}
            </div>
          );
        })}

        {Array.from({ length: endEmptyCells }).map((_, i) => (
          <div key={`end-${i}`} className="h-16 bg-gray-100 ml-1" />
        ))}
      </div>
    </div>
  );
}

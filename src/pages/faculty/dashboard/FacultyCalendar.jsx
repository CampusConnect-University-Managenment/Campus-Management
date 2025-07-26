import React, { useEffect, useState } from "react";
import axios from "axios";

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar = [];
  let week = Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  if (week.length) calendar.push(week.concat(Array(7 - week.length).fill(null)));
  return calendar;
};

const FacultyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-based)
  const [currentYear, setCurrentYear] = useState(2025);
  const [events, setEvents] = useState([]);

  const calendar = generateCalendar(currentYear, currentMonth);

  useEffect(() => {
    fetchEvents(currentYear, currentMonth + 1); // Month is 1-based in API
  }, [currentMonth, currentYear]);

  const fetchEvents = async (year, month) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events?year=${year}&month=${month}`);
      setEvents(res.data); // Format: [{ date: "2025-08-13", title: "Workshop" }]
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const formatDate = (day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow w-full mb-10">
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-1 bg-blue-500 text-white rounded" onClick={prevMonth}>
          ← Prev
        </button>
        <h2 className="text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </h2>
        <button className="px-4 py-1 bg-blue-500 text-white rounded" onClick={nextMonth}>
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {calendar.flat().map((day, index) => {
          const fullDate = formatDate(day);
          const event = events.find((e) => e.date === fullDate);
          return (
            <div
              key={index}
              className={`p-2 h-24 rounded-lg border ${
                event ? "bg-green-200 font-bold" : "bg-gray-50"
              }`}
            >
              {day && <div>{day}</div>}
              {event && <div className="text-xs mt-1">{event.title}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyCalendar;

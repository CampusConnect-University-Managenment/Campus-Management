import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

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

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const getBoxColor = (type) => {
    switch (type) {
      case "Exam":
        return "bg-blue-500 text-white";
      case "Event":
        return "bg-green-500 text-white";
      case "Holiday":
        return "bg-red-500 text-white";
      default:
        return "bg-white";
    }
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const weeks = [];
    let day = 1 - startDayIndex;
    while (day <= daysInMonth) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (day > 0 && day <= daysInMonth) {
          week.push(day);
        } else {
          week.push(null);
        }
        day++;
      }
      weeks.push(week);
    }
    return weeks;
  };

  const getEventForDay = (d) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const calendar = generateCalendar();
  const todayDate = today.getDate();
  const isThisMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4 gap-3">
        <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          ← Prev
        </button>
        <h2 className="text-2xl font-bold">{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next →
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md border">
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 uppercase mb-2 font-bold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-[1px] bg-gray-200 text-sm relative z-0">
          {calendar.map((week, wIdx) =>
            week.map((d, idx) => {
              const eventsToday = d ? getEventForDay(d) : [];
              const isToday = isThisMonth && d === todayDate;
              const boxStyle = eventsToday.length > 0
                ? getBoxColor(eventsToday[0].type)
                : "bg-white";

              return (
                <div
                  key={`${wIdx}-${idx}`}
                  className={`relative h-[70px] p-1 overflow-hidden 
                    flex flex-col justify-start items-start
                    ${boxStyle}
                    ${!d ? "bg-gray-100 text-gray-400" : ""}
                    ${d && isToday ? "border-2 border-black" : "border border-white"}
                    transition-transform duration-200 transform hover:scale-[1.03]
                    group hover:z-50 z-10`}
                >
                  {d && <div className="text-lg font-bold">{d}</div>}
                  {d && eventsToday.map((event, i) => (
                    <div key={i} className="text-xs truncate w-full">{event.title}</div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyCalendar;

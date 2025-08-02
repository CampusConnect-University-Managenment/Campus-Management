import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  NotebookPen,
  Rocket,
  Star,
  GraduationCap,
<<<<<<< HEAD
=======
  // ChevronLeft, // Not used in the provided snippet, but keep if needed elsewhere
  // ChevronRight, // Not used in the provided snippet, but keep if needed elsewhere
>>>>>>> main
} from "lucide-react";

export default function StudentDashboard() {
  const [enlargedCard, setEnlargedCard] = useState(null);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [academicEvents, setAcademicEvents] = useState([]);

<<<<<<< HEAD
=======
  // Combined Dummy Academic Events
  // Prioritizing the more detailed list from feat/student/reviewupdate
  const dummyAcademicEvents = [
    { date: "2025-07-30", title: "Internal 1", type: "Exam" },
    { date: "2025-07-15", title: "Seminar", type: "Event" },
    { date: "2025-08-10", title: "Internal 2", type: "Exam" },
    { date: "2025-08-05", title: "Model Lab 1", type: "Exam" }, // From reviewupdate
    { date: "2025-08-18", title: "Model Lab 2", type: "Exam" }, // From reviewupdate
    { date: "2025-08-25", title: "End Semester Exam", type: "Exam" },
    // Government Holidays (Red) - from reviewupdate
    { date: "2025-08-15", title: "Independence Day Holiday", type: "Holiday" },
    { date: "2025-01-26", title: "Republic Day Holiday", type: "Holiday" },
    // Other events if they were intended to be permanent dummy data
    { date: "2025-08-12", title: "Musical Evening", type: "Event" },
    { date: "2025-08-14", title: "Flash Mob", type: "Event" },
    { date: "2025-08-19", title: "Hostel Day", type: "Event" },
    { date: "2025-08-21", title: "Technical Event", type: "Event" },
    { date: "2025-08-28", title: "Intercollege Fest (Dhruva)", type: "Event" },
  ];

  const [academicEvents, setAcademicEvents] = useState([]);

  useEffect(() => {
    // Attempt to load events from localStorage,
    // otherwise use the dummy data
    try {
      const data = localStorage.getItem("calendarEvents");
      if (data) {
        setAcademicEvents(JSON.parse(data));
      } else {
        setAcademicEvents(dummyAcademicEvents);
      }
    } catch (e) {
      console.error("Failed to load events from localStorage", e);
      setAcademicEvents(dummyAcademicEvents);
    }
  }, []);

  useEffect(() => {
    const sync = () => {
      const data = localStorage.getItem("calendarEvents");
      if (data) {
        setAcademicEvents(JSON.parse(data));
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const getCardClass = (cardKey) =>
    `rounded-xl shadow-md p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
      enlargedCard === cardKey
        ? "scale-110 bg-blue-100"
        : "bg-white hover:bg-blue-50"
    }`;

  // Calendar Helpers
>>>>>>> main
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const colorMap = {
    holiday: "bg-red-200",
    exam: "bg-blue-200",
    event: "bg-green-200",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setAcademicEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
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
  const endEmptyCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

<<<<<<< HEAD
  const getCardClass = (key) =>
    `rounded-xl shadow-md p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
      enlargedCard === key ? "scale-110 bg-blue-100" : "bg-white hover:bg-blue-50"
    }`;

  function DashboardCard({ label, value, icon, cardKey }) {
    return (
      <div className={getCardClass(cardKey)} onClick={() => setEnlargedCard(cardKey)}>
        <p className="text-gray-500 font-medium">{label}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        {icon}
      </div>
    );
  }

  function StudentCard() {
    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col h-[472px]">
        <div className="relative h-24 bg-gradient-to-r from-blue-100 to-blue-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
            alt="Student Avatar"
            className="w-28 h-28 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 shadow-md"
          />
        </div>
        <div className="pt-16 pb-6 px-6 text-center">
          <h2 className="text-lg font-semibold text-gray-850">Riya Sharma</h2>
        </div>
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-6 text-bg">
            <DetailRow label="Register No:" value="21CSE019" />
            <DetailRow label="Department:" value="CSE" />
            <DetailRow label="Batch:" value="2022" />
            <DetailRow label="Year:" value="3" />
            <DetailRow label="Semester:" value="6" />
          </div>
        </div>
      </div>
    );
  }

  function DetailRow({ label, value }) {
    return (
      <div className="flex justify-between text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="text-gray-800">{value}</span>
      </div>
    );
  }

  function Calendar() {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md lg:col-span-2 flex flex-col h-[474px] overflow-scroll">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Academic Calendar</h3>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-3">
          <button onClick={prevMonth} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">← Prev</button>
          <div className="flex space-x-2">
            <select value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
              {monthNames.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
              {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
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
            const hasEvent = events.length > 0;

            return (
              <div
                key={date}
                onClick={() => hasEvent && setSelectedDate({ day: date, events })}
                className="h-16 bg-white flex flex-col items-center justify-start cursor-pointer"
              >
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
            <div key={`end-empty-${i}`} className="h-16 bg-gray-100 ml-1" />
          ))}
        </div>
      </div>
    );
  }
=======
  const formatDate = (date) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
  };

  const getEventsForDate = (date) => {
    const formatted = formatDate(date);
    return academicEvents.filter((event) => event.date === formatted);
  };
>>>>>>> main

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Welcome back, Riya! 👋
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Stay focused and keep learning 🚀
        </p>
      </div>

<<<<<<< HEAD
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <DashboardCard label="Active Courses" value="05" icon={<NotebookPen className="text-indigo-500 text-lg mt-2" />} cardKey="active" />
        <DashboardCard label="CGPA" value="8.8" icon={<Star className="text-yellow-400 text-lg mt-2" />} cardKey="cgpa" />
        <DashboardCard label="Credits Earned" value="120" icon={<CalendarDays className="text-purple-500 text-lg mt-2" />} cardKey="credits" />
        <DashboardCard label="Attendance %" value="92%" icon={<Rocket className="text-rose-500 text-lg mt-2" />} cardKey="attendance" />
        <DashboardCard label="No. of Backlogs" value="02" icon={<GraduationCap className="text-red-500 text-lg mt-2" />} cardKey="backlogs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <StudentCard />
        <Calendar />
      </div>
    </div>
  );
=======
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className={getCardClass("active")}>
          <p className="text-gray-500 font-medium">Active Courses</p>
          <h2 className="text-2xl font-bold text-gray-800">05</h2>
          <NotebookPen className="text-indigo-500 text-lg mt-2" />
        </div>

        <div className={getCardClass("cgpa")}>
          <p className="text-gray-500 font-medium">CGPA</p>
          <h2 className="text-2xl font-bold text-gray-800">8.8</h2>
          <Star className="text-yellow-400 text-lg mt-2" />
        </div>

        <div className={getCardClass("credits")}>
          <p className="text-gray-500 font-medium">Credits Earned</p>
          <h2 className="text-2xl font-bold text-gray-800">120</h2>
          <CalendarDays className="text-purple-500 text-lg mt-2" />
        </div>

        <div className={getCardClass("attendance")}>
          <p className="text-gray-500 font-medium">Attendance %</p>
          <h2 className="text-2xl font-bold text-gray-800">92%</h2>
          <Rocket className="text-rose-500 text-lg mt-2" />
        </div>

        <div className={getCardClass("backlogs")}>
          <p className="text-gray-500 font-medium">No. of Backlogs</p>
          <h2 className="text-2xl font-bold text-gray-800">02</h2>
          <GraduationCap className="text-red-500 text-lg mt-2" />
        </div>
      </div>

      {/* Profile + Academic Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card with Equal Height */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 lg:col-span-1 h-[450px]">
          <div className="relative h-24 bg-gradient-to-r from-blue-100 to-blue-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
              alt="Student Avatar"
              className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 shadow-md"
            />
          </div>
          <div className="pt-12 pb-4 px-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Riya Sharma</h2>
          </div>
          <div className="px-4 pb-4">
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3 text-sm">
              <DetailRow label="Register No:" value="21CSE019" />
              <DetailRow label="Department:" value="CSE" />
              <DetailRow label="Batch:" value="2022" />
              <DetailRow label="Year:" value="3" />
              <DetailRow label="Semester:" value="6" />
            </div>
          </div>
        </div>

        {/* Calendar Box */}
        <div className="bg-white p-4 rounded-2xl shadow-md lg:col-span-2 h-[450px] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📅 Academic Calendar
          </h3>

          {/* Month Navigation */}
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
                {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              onClick={nextMonth}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next →
            </button>
          </div>

          {/* Calendar Grid */}
          <h2 className="text-md font-bold text-center mb-2">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <div className="grid grid-cols-7 border text-center text-xs">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div key={d} className="p-2 font-semibold border-b bg-gray-50">
                {d}
              </div>
            ))}

            {/* Empty slots */}
            {Array(firstDayOfMonth)
              .fill("")
              .map((_, i) => (
                <div key={`empty-${i}`} className="p-4 border"></div>
              ))}

            {/* Dates */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
              const events = getEventsForDate(date);
              const hasEvent = events.length > 0;
              const isToday =
                today.getDate() === date &&
                today.getMonth() === currentMonth &&
                today.getFullYear() === currentYear;

              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate({ day: date, events })}
                  className={`p-3 h-16 border cursor-pointer relative text-center hover:bg-gray-100 truncate
                    ${selectedDate?.day === date ? "border-2 border-black" : ""}
                    ${isToday ? "bg-blue-100" : ""}
                    ${hasEvent ? "bg-green-100" : ""}`}
                >
                  <div className="font-bold">{date}</div>
                  {hasEvent && (
                    <div className="text-[10px] mt-1 text-green-700 font-medium truncate">
                      {events[0].title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
>>>>>>> main
}
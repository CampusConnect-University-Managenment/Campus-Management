import React, { useState } from "react";
import {
  CalendarDays,
  NotebookPen,
  Rocket,
  Star,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function StudentDashboard() {
  const [enlargedCard, setEnlargedCard] = useState(null);

  // Calendar State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Dummy Academic Events (Admin will add in real case)
  const academicEvents = [
    // Exams (Blue)
    { date: "2025-07-30", title: "Internal 1", type: "Exam" },
    { date: "2025-08-10", title: "Internal 2", type: "Exam" },
    { date: "2025-08-5", title: "Model Lab 1", type: "Exam" },
    { date: "2025-08-18", title: "Model Lab 2", type: "Exam" },
    { date: "2025-08-25", title: "End Semester Exam", type: "Exam" },

    // Government Holidays (Red)
    { date: "2025-08-15", title: "Independence Day Holiday", type: "Holiday" },
    {date: "2025-01-26", title: "Republic Day Holiday", type: "Holiday" },

    // Events (Green)
    { date: "2025-08-12", title: "Musical Evening", type: "Event" },
    { date: "2025-08-14", title: "Flash Mob", type: "Event" },
    { date: "2025-08-19", title: "Hostel Day", type: "Event" },
    { date: "2025-08-21", title: "Technical Event", type: "Event" },
    { date: "2025-08-28", title: "Intercollege Fest (Dhruva)", type: "Event" },
  ];

  const getCardClass = (cardKey) =>
    `rounded-xl shadow-md p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
      enlargedCard === cardKey ? "scale-110 bg-blue-100" : "bg-white hover:bg-blue-50"
    }`;

  // Calendar Helpers
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

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

  const formatDate = (date) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
  };

  const getEventsForDate = (date) => {
    const formatted = formatDate(date);
    const sundayEvent = new Date(currentYear, currentMonth, date).getDay() === 0
      ? [{ title: "Weekend Holiday", type: "Holiday" }]
      : [];
    const events = academicEvents.filter((event) => event.date === formatted);
    return [...sundayEvent, ...events];
  };

  const getDotColor = (events) => {
    if (events.some(e => e.type === "Holiday")) return "bg-red-500";
    if (events.some(e => e.type === "Exam")) return "bg-blue-500";
    if (events.some(e => e.type === "Event")) return "bg-green-500";
    return "";
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Welcome back, Riya! 👋</h1>
        <p className="text-gray-600 text-md mt-2">Stay focused and keep learning 🚀</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 lg:col-span-1">
          <div className="relative h-28 bg-gradient-to-r from-blue-100 to-blue-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
              alt="Student Avatar"
              className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 translate-y-8 shadow-md"
            />
          </div>
          <div className="pt-8 pb-2 px-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Riya Sharma</h2>
          </div>
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
              <DetailRow label="Register No:" value="21CSE019" />
              <DetailRow label="Department:" value="CSE" />
              <DetailRow label="Batch:" value="2022" />
              <DetailRow label="Year:" value="3" />
              <DetailRow label="Semester:" value="6" />
            </div>
          </div>
        </div>

        {/* Academic Calendar */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Academic Calendar</h3>

          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-700">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center mb-6">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-semibold text-gray-400">{d}</div>
            ))}

            {/* Empty slots for starting day */}
            {Array(firstDayOfMonth).fill("").map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}

            {/* Dates */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
              const events = getEventsForDate(date);
              const dotColor = getDotColor(events);
              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate({ day: date, events })}
                  className={`p-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
                    selectedDate?.day === date ? "bg-blue-200" : ""
                  }`}
                >
                  <p className="font-medium">{date}</p>
                  {dotColor && (
                    <span className={`block w-2 h-2 ${dotColor} rounded-full mx-auto mt-1`}></span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Date Events */}
          {selectedDate && selectedDate.events.length > 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700 mb-2">
                Events on {selectedDate.day} {monthNames[currentMonth]}:
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                {selectedDate.events.map((event, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{event.title}</span> ({event.type})
                  </li>
                ))}
              </ul>
            </div>
          ) : selectedDate ? (
            <p className="text-gray-500 italic">No events on this date.</p>
          ) : (
            <p className="text-gray-500 italic">Select a date to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

import React from "react";
import {
  CalendarDays,
  NotebookPen,
  Rocket,
  Star,
  GraduationCap,
} from "lucide-react";

export default function StudentDashboard() {
  const scheduleData = [
    { date: "Jul 14", time: "10:00 AM", title: "Mock Test - Algorithms" },
    { date: "Jul 16", time: "5:00 PM", title: "Assignment Submission - DBMS" },
    { date: "Jul 18", time: "9:00 AM", title: "Mid-Term Exam - OS" },
    { date: "Jul 20", time: "11:00 AM", title: "Project Review - AI" },
    { date: "Jul 22", time: "1:00 PM", title: "Quiz - Cyber Security" },
    { date: "Jul 24", time: "3:00 PM", title: "Lab - Operating Systems" },
    { date: "Jul 26", time: "10:00 AM", title: "Seminar - Machine Learning" },
  ];

  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(scheduleData.length / itemsPerPage);
  const paginatedSchedule = scheduleData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Welcome back, Riya! 👋
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Stay focused and keep learning 🚀
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard
          title="Active Courses"
          value="05"
          icon={<NotebookPen />}
          color="indigo"
        />
        <StatCard
          title="Upcoming Exams"
          value="03"
          icon={<CalendarDays />}
          color="purple"
        />
        <StatCard
          title="Credits Earned"
          value="120"
          icon={<Star />}
          color="amber"
        />
        <StatCard
          title="Attendance %"
          value="92%"
          icon={<Rocket />}
          color="rose"
        />
        <StatCard
          title="No. of Backlogs"
          value="02"
          icon={<GraduationCap />}
          color="red"
        />
      </div>

      {/* Profile + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 lg:col-span-1">
          {/* Banner with Avatar */}
          <div className="relative h-28 bg-gradient-to-r from-blue-100 to-blue-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
              alt="Student Avatar"
              className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 translate-y-8 shadow-md"
            />
          </div>

          {/* Name Section */}
          <div className="pt-8 pb-2 px-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Riya Sharma
            </h2>
          </div>

          {/* Boxed Details Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
              <DetailRow label="Register No:" value="21CSE019" />
              <DetailRow label="Department:" value="CSE" />
              <DetailRow label="Batch:" value="2021-2025" />
              <DetailRow label="Year:" value="3" />
              <DetailRow label="Semester:" value="6" />
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            🗓️ Upcoming Schedule
          </h3>
          <div className="relative border-l-2 border-indigo-200 pl-4 space-y-6 max-h-[400px] overflow-y-auto">
            {paginatedSchedule.map((item, index) => (
              <ScheduleItem
                key={index}
                date={item.date}
                time={item.time}
                title={item.title}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {scheduleData.length > itemsPerPage && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className={`px-4 py-2 text-sm rounded-lg border ${
                  currentPage === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={currentPage >= totalPages - 1}
                className={`px-4 py-2 text-sm rounded-lg border ${
                  currentPage >= totalPages - 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stat Card
function StatCard({ title, value, icon, color }) {
  const bgColor = {
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
    red: "bg-red-100 text-red-600",
  }[color];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
    </div>
  );
}

// Detail Row
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

// Schedule Item
function ScheduleItem({ date, time, title }) {
  const [month, day] = date.split(" ");
  return (
    <div className="relative flex items-start gap-4">
      {/* Dot */}
      <div className="absolute -left-[10px] top-1 w-3 h-3 rounded-full bg-indigo-500"></div>

      {/* Date Card */}
      <div className="flex flex-col items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-700 font-semibold rounded-lg shadow-sm text-sm">
        <span>{day}</span>
        <span className="text-xs">{month}</span>
      </div>

      {/* Content Box */}
      <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}

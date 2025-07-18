import React from "react";
import { CalendarDays, NotebookPen, Rocket, Star } from "lucide-react";

export default function StudentDashboard() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          title="Overall Grade"
          value="A+"
          icon={<Star />}
          color="amber"
        />
        <StatCard
          title="Achievements"
          value="07"
          icon={<Rocket />}
          color="rose"
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
            <h2 className="text-lg font-semibold text-gray-800">Riya Sharma</h2>
          </div>

          {/* Boxed Details Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
              <DetailRow label="Roll No:" value="21CSE019" />
              <DetailRow label="Department:" value="CSE" />
              <DetailRow label="Year:" value="3rd Year" />
              <DetailRow label="Semester:" value="6th" />
            </div>
          </div>
        </div>

        {/* 📅 Redesigned Upcoming Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            🗓️ Upcoming Schedule
          </h3>
          <div className="relative border-l-2 border-indigo-200 pl-4 space-y-6">
            <ScheduleItem
              date="Jul 14"
              time="10:00 AM"
              title="Mock Test - Algorithms"
            />
            <ScheduleItem
              date="Jul 16"
              time="5:00 PM"
              title="Assignment Submission - DBMS"
            />
            <ScheduleItem
              date="Jul 18"
              time="9:00 AM"
              title="Mid-Term Exam - OS"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Cards
function StatCard({ title, value, icon, color }) {
  const bgColor = {
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
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
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// New ScheduleItem Component
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

import React from "react";
import {
  CircleUser,
  CalendarDays,
  NotebookPen,
  Rocket,
  Star,
} from "lucide-react";

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
        {/* Normal Profile Card */}
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center lg:col-span-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt="Student Avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold text-blue-900">Riya Sharma</h2>
          <p className="text-sm text-blue-700 mt-1 mb-4">Web Developer</p>
          <div className="w-full bg-white rounded-xl p-4 mt-2 text-left space-y-3">
            <p>
              <span className="font-semibold text-gray-700">Roll No:</span>{" "}
              21CSE019
            </p>
            <p>
              <span className="font-semibold text-gray-700">Department:</span>{" "}
              Computer Science Engineering
            </p>
            <p>
              <span className="font-semibold text-gray-700">Year:</span> 3rd
              Year
            </p>
            <p>
              <span className="font-semibold text-gray-700">Semester:</span> 6th
            </p>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🗓️ Upcoming Schedule
          </h3>
          <div className="space-y-4">
            <TimelineItem
              title="Mock Test - Algorithms"
              time="Jul 14, 10:00 AM"
            />
            <TimelineItem
              title="Assignment Submission - DBMS"
              time="Jul 16, 5:00 PM"
            />
            <TimelineItem title="Mid-Term Exam - OS" time="Jul 18, 9:00 AM" />
            <TimelineItem
              title="Project Demo - AI Chatbot"
              time="Jul 21, 3:00 PM"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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

function TimelineItem({ title, time }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border hover:border-blue-300 hover:shadow-sm transition-all">
      <div className="text-sm font-medium text-gray-800">{title}</div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
}

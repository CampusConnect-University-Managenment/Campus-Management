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
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 py-16">
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

      {/* Profile and Academic Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <CircleUser className="text-indigo-600 w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Riya Sharma</h2>
              <p className="text-gray-500 text-sm">3rd Year, CSE Department</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>
              <strong>Email:</strong> riya.sharma@univ.edu
            </p>
            <p>
              <strong>Roll No:</strong> 21CSE019
            </p>
            <p>
              <strong>Semester:</strong> 6th
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📅 Upcoming Schedule
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
    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border hover:border-indigo-300 hover:shadow-sm transition-all">
      <div className="text-sm font-medium text-gray-800">{title}</div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
}

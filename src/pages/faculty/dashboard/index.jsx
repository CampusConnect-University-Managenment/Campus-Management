// src/pages/faculty/dashboard/index.jsx

import React, { useState } from "react";
import {
  CalendarClock,
  BookOpen,
  FileText,
  ClipboardCheck,
  Users,
} from "lucide-react";

// Reusable Card component
const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
    <div className="mb-2">{icon}</div>
    <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

// Schedule item component
const ScheduleItem = ({ date, month, title, time }) => (
  <div className="flex items-start gap-4">
    <div className="bg-indigo-100 text-indigo-600 rounded-md px-3 py-1 text-center">
      <div className="text-xl font-bold">{date}</div>
      <div className="text-sm">{month}</div>
    </div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm">{time}</p>
    </div>
  </div>
);

const FacultyDashboard = () => {
  const scheduleData = [
    { date: "24", month: "Jul", title: "Upload Assignment Marks - DBMS", time: "4:00 PM" },
    { date: "26", month: "Jul", title: "Internal Test - CN", time: "10:00 AM" },
    { date: "28", month: "Jul", title: "Department Meeting", time: "2:00 PM" },
    { date: "30", month: "Jul", title: "Project Review - AI", time: "11:00 AM" },
    { date: "02", month: "Aug", title: "Lab Submission Deadline", time: "5:00 PM" },
    { date: "05", month: "Aug", title: "Workshop on IoT", time: "3:00 PM" },
    { date: "08", month: "Aug", title: "Mock Interview", time: "9:00 AM" },
  ];

  const recentActivities = [
    { activity: "Updated Internal Marks for DBMS", time: "Today, 9:45 AM" },
    { activity: "Attended Department Meeting", time: "Yesterday, 2:00 PM" },
    { activity: "Uploaded Assignment on CN", time: "3 days ago, 11:30 AM" },
    { activity: "Reviewed Project Proposals - AI", time: "Last Week, 4:00 PM" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(scheduleData.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const currentItems = scheduleData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Welcome back, Professor! 👋</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <Card title="Courses Handled" value="04" icon={<BookOpen size={24} className="text-blue-600" />} />
        <Card title="Upcoming Tasks" value="03" icon={<CalendarClock size={24} className="text-purple-600" />} />
        <Card title="Papers Evaluated" value="120" icon={<FileText size={24} className="text-yellow-600" />} />
        <Card title="Students" value="110" icon={<Users size={24} className="text-red-600" />} />
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CalendarClock className="text-indigo-600" />
          Upcoming Schedule
        </h2>

        <div className="space-y-4">
          {currentItems.map((item, index) => (
            <ScheduleItem
              key={index}
              date={item.date}
              month={item.month}
              title={item.title}
              time={item.time}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === totalPages - 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-10 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="divide-y divide-gray-200">
          {recentActivities.map((item, index) => (
            <li key={index} className="py-3">
              <p className="text-gray-700 font-medium">{item.activity}</p>
              <p className="text-gray-500 text-sm">{item.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FacultyDashboard;

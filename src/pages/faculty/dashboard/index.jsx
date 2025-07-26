import React, { useState } from "react";
import FacultyCalendar from "./FacultyCalendar";
import {
  Megaphone,
  Library,
  LayoutGrid,
  GraduationCap,
  Building2,
} from "lucide-react";

// Reusable Card Component
const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
    <div className="mb-2">{icon}</div>
    <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

const FacultyDashboard = () => {
  const [announcements] = useState([
    { title: "Exam Schedule Released", date: "22 Jul 2025" },
    { title: "New Course Material Uploaded", date: "21 Jul 2025" },
    { title: "Semester Registration Deadline", date: "20 Jul 2025" },
    { title: "Lab Manuals Updated", date: "19 Jul 2025" },
    { title: "Guest Lecture on AI", date: "18 Jul 2025" },
  ]);

  const [announcementPage, setAnnouncementPage] = useState(1);
  const itemsPerPage = 3;

  const paginatedAnnouncements = announcements.slice(
    (announcementPage - 1) * itemsPerPage,
    announcementPage * itemsPerPage
  );

  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Welcome back, Professor! 👋
      </h1>

      {/* Profile + Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Profile Card */}
        <div className="bg-white shadow rounded-xl p-6 col-span-1">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Faculty"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Dr. Ashokkumar</h3>
              <p className="text-gray-500 text-sm">Assistant Professor, CSE</p>
              <p className="text-gray-400 text-xs mt-1">Faculty ID: FAC1234</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 col-span-2">
          <Card
            title="Courses Handling"
            value="05"
            icon={<Library size={24} className="text-blue-600" />}
          />
          <Card
            title="Total Classes"
            value="12"
            icon={<LayoutGrid size={24} className="text-purple-600" />}
          />
          <Card
            title="Total Students"
            value="340"
            icon={<GraduationCap size={24} className="text-green-600" />}
          />
          <Card
            title="Dept Handling"
            value="6"
            icon={<Building2 size={24} className="text-teal-600" />}
          />
        </div>
      </div>

      {/* Calendar + Announcements Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Calendar Section (larger) */}
        <div className="flex-[2] bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Faculty Calendar</h2>
          <FacultyCalendar />
        </div>

        {/* Announcements Section (smaller) */}
        <div className="flex-[1] bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Megaphone className="text-orange-500" /> Announcements
          </h2>
          <ul className="space-y-3">
            {paginatedAnnouncements.map((ann, idx) => (
              <li key={idx} className="border-b pb-2">
                <p className="font-medium text-gray-700">{ann.title}</p>
                <p className="text-sm text-gray-500">{ann.date}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setAnnouncementPage((prev) => Math.max(prev - 1, 1))}
              disabled={announcementPage === 1}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>
            <button
              onClick={() => setAnnouncementPage((prev) => prev + 1)}
              disabled={announcementPage * itemsPerPage >= announcements.length}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

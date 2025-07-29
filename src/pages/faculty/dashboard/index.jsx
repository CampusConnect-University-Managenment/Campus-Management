import React, { useState } from "react";
import FacultyCalendar from "./FacultyCalendar";
import {
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
  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Welcome back, Professor! 👋
      </h1>

      {/* Stats Cards + Profile Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
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

        {/* Compact Profile Card */}
        <div className="bg-gradient-to-tr from-blue-100 via-white to-purple-100 rounded-xl shadow p-4 flex flex-col items-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Faculty"
            className="w-12 h-12 rounded-full border border-gray-300 mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-800">Dr. Ashokkumar</h3>
          <p className="text-xs text-gray-600">Asst. Professor, CSE</p>
          <p className="text-xs text-gray-400">ID: FAC1234</p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Faculty Calendar</h2>
          <FacultyCalendar />
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

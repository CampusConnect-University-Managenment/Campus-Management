import React from "react";
import { FaBriefcase, FaUsers, FaBuilding, FaCheckCircle } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const AboutStudent = ({ students }) => {
  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const placed = students.filter((s) => s.placement).length;
  const departments = new Set(students.map((s) => s.department)).size;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        🎓 Student Management
      </h1>
      <p className="text-gray-600 mt-1 mb-6">
        Manage student records, enrollment, and academic information
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<MdGroups className="text-3xl text-white" />}
          title="Total Students"
          value={total}
          gradient="bg-gradient-to-r from-purple-500 to-indigo-500"
        />
        <StatCard
          icon={<FaCheckCircle className="text-3xl text-white" />}
          title="Active Students"
          value={active}
          gradient="bg-gradient-to-r from-green-400 to-green-600"
        />
        <StatCard
          icon={<FaBriefcase className="text-3xl text-white" />}
          title="Placed Students"
          value={placed}
          gradient="bg-gradient-to-r from-violet-500 to-purple-700"
        />
        <StatCard
          icon={<FaBuilding className="text-3xl text-white" />}
          title="Departments"
          value={departments}
          gradient="bg-gradient-to-r from-orange-400 to-orange-600"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, gradient }) => (
  <div className={`rounded-xl shadow p-5 text-white ${gradient}`}>
    <div className="flex justify-between items-center mb-1">
      <div className="text-sm font-semibold">{title}</div>
      {icon}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs mt-1 opacity-80">Academic stats</p>
  </div>
);

export default AboutStudent;

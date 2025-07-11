import React from "react";

const AboutStudent = ({ students }) => {
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
          title="Total Students"
          value={students.length}
          icon="👥"
          color="text-purple-700"
        />
        <StatCard
          title="Active Students"
          value={students.filter((s) => s.status === "Active").length}
          icon="🟢"
          color="text-green-600"
        />
        <StatCard
          title="Graduated"
          value={students.filter((s) => s.status === "Graduated").length}
          icon="🎓"
          color="text-purple-600"
        />
        <StatCard
          title="Departments"
          value={new Set(students.map((s) => s.department)).size}
          icon="🟠"
          color="text-orange-600"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>
      <span className={`text-2xl ${color}`}>{icon}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default AboutStudent;

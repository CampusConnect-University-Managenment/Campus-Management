// FacultyOnLeave.jsx

import React from "react";

const FacultyOnLeave = () => {
  const leaveData = [
    {
      name: "Dr. Michael Chen",
      department: "Computer Science",
      duration: "8/1/2025 - 15/1/2025",
      reason: "Medical Leave",
    },
    {
      name: "Prof. Emily Rodriguez",
      department: "IT",
      duration: "10/1/2025 - 12/1/2025",
      reason: "Conference",
    },
    {
      name: "Dr. James Wilson",
      department: "EEE",
      duration: "9/1/2025 - 16/1/2025",
      reason: "Annual Leave",
    },
    {
      name: "Dr. Lisa Thompson",
      department: "ECE",
      duration: "11/1/2025 - 13/1/2025",
      reason: "Personal",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-wide">
        📅 Faculty on Leave
      </h2>
      <div className="space-y-4">
        {leaveData.map((faculty, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            <p className="font-bold text-lg">{faculty.name}</p>
            <p className="font-semibold text-blue-600 hover:text-blue-200">
              {faculty.department}
            </p>
            <p className="font-medium">
              <span className="font-bold">Duration:</span> {faculty.duration}
            </p>
            <p className="font-medium">
              <span className="font-bold">Reason:</span> {faculty.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyOnLeave;

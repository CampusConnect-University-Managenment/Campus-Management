// DepartmentOverview.jsx

import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  School,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const allDepartments = [
  { name: "CS", total: 130, enrolled: 120, placed: 40, rate: "92%", color: "gray", icon: <BookOpen className="w-5 h-5" /> },
  { name: "IT", total: 654, enrolled: 621, placed: 33, rate: "95%", color: "green", icon: <GraduationCap className="w-5 h-5" /> },
  { name: "ECE", total: 478, enrolled: 456, placed: 22, rate: "95%", color: "orange", icon: <School className="w-5 h-5" /> },
  { name: "EEE", total: 510, enrolled: 495, placed: 18, rate: "94%", color: "sky", icon: <Briefcase className="w-5 h-5" /> },
  { name: "ETE", total: 312, enrolled: 298, placed: 16, rate: "91%", color: "purple", icon: <BookOpen className="w-5 h-5" /> },
  { name: "CT", total: 428, enrolled: 410, placed: 19, rate: "89%", color: "blue", icon: <GraduationCap className="w-5 h-5" /> },
  { name: "MECH", total: 540, enrolled: 500, placed: 25, rate: "92%", color: "red", icon: <School className="w-5 h-5" /> },
  { name: "CYBER", total: 220, enrolled: 205, placed: 10, rate: "88%", color: "teal", icon: <Briefcase className="w-5 h-5" /> },
];

const DepartmentOverview = () => {
  const [page, setPage] = useState(0);
  const [rotating, setRotating] = useState(false);
  const departmentsPerPage = 4;
  const totalPages = Math.ceil(allDepartments.length / departmentsPerPage);

  const handleNext = () => {
    if (rotating) return;
    setRotating(true);
    setTimeout(() => {
      setPage((prev) => (prev + 1) % totalPages);
      setRotating(false);
    }, 400);
  };

  const currentDepartments = allDepartments.slice(
    page * departmentsPerPage,
    page * departmentsPerPage + departmentsPerPage
  );

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-sm border h-full mb-10">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 tracking-wide">
        Department-wise Student Overview
      </h2>

      {/* Rotating Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-transform duration-700`}
        style={{
          transform: rotating ? "rotateY(90deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {currentDepartments.map((dept) => {
          const enrollmentRate = parseInt(dept.rate);
          const barColor =
            enrollmentRate >= 90
              ? "bg-green-500"
              : enrollmentRate >= 75
              ? "bg-yellow-500"
              : "bg-red-500";

          return (
            <div
              key={dept.name}
              className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className={`text-${dept.color}-600`}>{dept.icon}</div>
                  <div>
                    <h4
                      className={`${
                        dept.name === "CS" ? "font-extrabold" : "font-bold"
                      } text-lg text-gray-800`}
                    >
                      {dept.name}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">
                      Department
                    </p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {dept.total}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium">
                    Currently Enrolled
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {dept.enrolled}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium">
                    Students Placed
                  </p>
                  <p className="text-lg font-bold text-gray-700">
                    {dept.placed}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1 font-medium">
                  Enrollment Rate
                </p>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full ${barColor} transition-all duration-500`}
                    style={{ width: dept.rate }}
                  />
                </div>
                <p className="text-xs text-right text-gray-600 mt-1 font-medium">
                  {dept.rate}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button INSIDE grid - smaller */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-200 transition transform hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default DepartmentOverview;

import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  School,
  Briefcase,
  ChevronRight,
} from "lucide-react";

// ✅ All departments with year-wise student distribution
const allDepartments = [
  {
    name: "CS",
    total: 630,
    yearDistribution: { first: 160, second: 150, third: 160, fourth: 160 },
    color: "gray",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "IT",
    total: 654,
    yearDistribution: { first: 170, second: 160, third: 162, fourth: 162 },
    color: "green",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: "ECE",
    total: 478,
    yearDistribution: { first: 120, second: 120, third: 120, fourth: 118 },
    color: "orange",
    icon: <School className="w-5 h-5" />,
  },
  {
    name: "EEE",
    total: 510,
    yearDistribution: { first: 130, second: 130, third: 125, fourth: 125 },
    color: "sky",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    name: "CT",
    total: 620,
    yearDistribution: { first: 155, second: 155, third: 155, fourth: 155 },
    color: "blue",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: "MECH",
    total: 540,
    yearDistribution: { first: 135, second: 135, third: 135, fourth: 135 },
    color: "red",
    icon: <School className="w-5 h-5" />,
  },
  {
    name: "ETE",
    total: 480,
    yearDistribution: { first: 120, second: 120, third: 120, fourth: 120 },
    color: "purple",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "CYBER",
    total: 390,
    yearDistribution: { first: 98, second: 97, third: 97, fourth: 98 },
    color: "teal",
    icon: <Briefcase className="w-5 h-5" />,
  },
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
        {currentDepartments.map((dept) => (
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
              <h4 className="text-2xl font-bold text-gray-900">{dept.total}</h4>
            </div>

            {/* Year-wise student distribution */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">
                  First Year
                </p>
                <p className="text-lg font-bold text-gray-700">
                  {dept.yearDistribution.first}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">
                  Second Year
                </p>
                <p className="text-lg font-bold text-gray-700">
                  {dept.yearDistribution.second}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">
                  Third Year
                </p>
                <p className="text-lg font-bold text-gray-700">
                  {dept.yearDistribution.third}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">
                  Fourth Year
                </p>
                <p className="text-lg font-bold text-gray-700">
                  {dept.yearDistribution.fourth}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Page Button */}
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

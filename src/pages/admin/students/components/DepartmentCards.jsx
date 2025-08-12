// src/pages/admin/students/components/DepartmentCards.jsx
import React from "react";
import { FaLaptopCode, FaMicrochip, FaBolt, FaRobot, FaDatabase } from "react-icons/fa";

const icons = {
  CSE: <FaLaptopCode className="text-4xl text-white opacity-90" />,
  ECE: <FaMicrochip className="text-4xl text-white opacity-90" />,
  EEE: <FaBolt className="text-4xl text-white opacity-90" />,
  AIDS: <FaRobot className="text-4xl text-white opacity-90" />,
  IT: <FaDatabase className="text-4xl text-white opacity-90" />,
};

const DepartmentCards = ({ students, onDeptClick }) => {
  const departmentOptions = ["IT", "CSE", "ECE", "EEE", "AIDS"];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-blue-900 mb-5">📊 Department Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {departmentOptions.map((dept) => {
          const count = students.filter((s) => s.department === dept).length;
          return (
            <div
              key={dept}
              className="flex justify-between items-center px-5 py-4 rounded-2xl shadow bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:shadow-xl transition cursor-pointer"
              onClick={() => onDeptClick(dept)}
            >
              <div>
                <div className="text-sm font-semibold text-white/80">Total Students</div>
                <div className="text-3xl font-extrabold">{count}</div>
                <div className="text-sm mt-1 text-white/90">{dept}</div>
              </div>
              <div>{icons[dept]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentCards;

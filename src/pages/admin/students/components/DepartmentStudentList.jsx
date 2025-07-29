import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const DepartmentStudentList = ({ department, students, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // Filter logic
  const filtered = students.filter((s) => {
    const matchDept = s.department === department;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = selectedYear === "All" || s.year === selectedYear;
    return matchDept && matchSearch && matchYear;
  });

  return (
    <div className="mt-10 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back to Department Cards
      </button>

      <h2 className="text-xl font-bold text-blue-900 mb-4">
        {department} Department Students ({filtered.length})
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {/* Search Bar */}
        <div className="flex items-center border rounded-md px-2 py-1 bg-white flex-1 max-w-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        {/* Year Filter */}
        <select
          className="border px-3 py-2 rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All Years</option>
          {yearOptions.map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3 border">REG NO</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Year</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{s.regNo}</td>
                <td className="p-3 border">{s.name}</td>
                <td className="p-3 border">{s.year}</td>
                <td className="p-3 border">{s.email || s.mail}</td>
                <td className="p-3 border">{s.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentStudentList;

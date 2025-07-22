import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Sample assignment data
const assignments = [
  {
    name: "CSE A - OOPS Assignment 1",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "A",
    url: "/assignments/oops-assignment1.pdf",
  },
  {
    name: "ECE B - Signals Assignment",
    type: "docx",
    year: "Second",
    department: "ECE",
    section: "B",
    url: "/assignments/signals-assignment.docx",
  },
  {
    name: "MECH C - Thermo Assignment",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "C",
    url: "/assignments/thermo-assignment.pdf",
  },
  {
    name: "CIVIL A - Survey Assignment",
    type: "docx",
    year: "Third",
    department: "CIVIL",
    section: "A",
    url: "/assignments/survey-assignment.docx",
  },
];

const ViewAssignmentQuestions = () => {
  const [filters, setFilters] = useState({
    year: "All",
    department: "All",
    section: "All",
  });
  const navigate = useNavigate();

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredAssignments = assignments.filter((assignment) => {
    return (
      (filters.year === "All" || assignment.year === filters.year) &&
      (filters.department === "All" ||
        assignment.department === filters.department) &&
      (filters.section === "All" || assignment.section === filters.section)
    );
  });

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📝 View Assignment Questions
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Filter and download uploaded assignment question files.
      </p>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
        >
          <option value="All">All Years</option>
          <option value="First">First Year</option>
          <option value="Second">Second Year</option>
          <option value="Third">Third Year</option>
          <option value="Final">Final Year</option>
        </select>

        <select
          value={filters.department}
          onChange={(e) => handleFilterChange("department", e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <select
          value={filters.section}
          onChange={(e) => handleFilterChange("section", e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
        >
          <option value="All">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>

      {/* File List */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredAssignments.map((assignment, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {assignment.type === "pdf" ? (
                  <FaFilePdf className="text-red-600 text-xl" />
                ) : (
                  <FaFileWord className="text-blue-600 text-xl" />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{assignment.name}</p>
                  <p className="text-sm text-gray-500">
                    {assignment.year} Year • {assignment.department} • Section{" "}
                    {assignment.section}
                  </p>
                </div>
              </div>
              <a
                href={assignment.url}
                download
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 text-sm"
              >
                <FaDownload /> Download
              </a>
            </li>
          ))}
          {filteredAssignments.length === 0 && (
            <li className="text-center text-gray-500 px-6 py-6">
              No assignments found for selected filters.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewAssignmentQuestions;

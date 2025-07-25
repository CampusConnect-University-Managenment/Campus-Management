import React from "react";
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
    postedDate: "2025-07-20",
    deadline: "2025-07-30",
  },
  {
    name: "ECE B - Signals Assignment",
    type: "docx",
    year: "Second",
    department: "ECE",
    section: "B",
    url: "/assignments/signals-assignment.docx",
    postedDate: "2025-07-18",
    deadline: "2025-07-28",
  },
  {
    name: "MECH C - Thermo Assignment",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "C",
    url: "/assignments/thermo-assignment.pdf",
    postedDate: "2025-07-15",
    deadline: "2025-07-25",
  },
  {
    name: "CIVIL A - Survey Assignment",
    type: "docx",
    year: "Third",
    department: "CIVIL",
    section: "A",
    url: "/assignments/survey-assignment.docx",
    postedDate: "2025-07-10",
    deadline: "2025-07-22",
  },
];

const ViewAssignmentQuestions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>

      {/* Upload button at top-right */}
     

      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📝 View Assignment Questions
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Download uploaded assignment question files.
      </p>

       <div className="flex justify-end items-center mt-4 mb-6 px-4">
        <button
          onClick={() => navigate("/faculty/ExamInterFace/upload-assignment")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Add new
        </button>
      </div>

      {/* Assignment List */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {assignments.map((assignment, idx) => (
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
                    {assignment.year} Year • {assignment.department} • Section {assignment.section}
                  </p>
                  <p className="text-xs text-gray-400">
                    Posted: {assignment.postedDate} | Deadline: {assignment.deadline}
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
        </ul>
      </div>
      <br />
      <br />
    </div>
  );
};

export default ViewAssignmentQuestions;

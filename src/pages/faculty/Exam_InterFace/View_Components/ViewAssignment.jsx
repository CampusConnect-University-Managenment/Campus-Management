import React from "react";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const assignments = [
  {
    name: "CSE A - OOPS Assignment 1",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "A",
    url: "/assignments/oops-assignment1.pdf",
    postedDate: "Feb 10, 2025",
  },
  {
    name: "ECE B - Signals Assignment",
    type: "docx",
    year: "Second",
    department: "ECE",
    section: "B",
    url: "/assignments/signals-assignment.docx",
    postedDate: "Feb 12, 2025",
  },
  {
    name: "MECH C - Thermo Assignment",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "C",
    url: "/assignments/thermo-assignment.pdf",
    postedDate: "Feb 15, 2025",
  },
  {
    name: "CIVIL A - Survey Assignment",
    type: "docx",
    year: "Third",
    department: "CIVIL",
    section: "A",
    url: "/assignments/survey-assignment.docx",
    postedDate: "Feb 18, 2025",
  },
];

const ViewAssignmentQuestions = () => {
  const navigate = useNavigate();
  const location= useLocation();
  const courseName = location.state?.courseName || "Unknown Course";
  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-8 font-sans">
      {/* Header + Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          {location.state.courseName}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-300 flex space-x-8 mb-8 text-lg">
        <button
          onClick={() => navigate("/faculty/ExamInterFace/view-material",{state:{courseName}})}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Student Materials
        </button>
        <button
          onClick={() => navigate("/faculty/ExamInterFace/view-question",{state:{courseName}})}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Question Papers
        </button>
        <button className="pb-2 text-blue-600 font-semibold border-b-2 border-blue-600">
          Assignments
        </button>
      </div>

      {/* +Add New Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/faculty/ExamInterFace/upload-assignment")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Assignment Cards */}
      <div className="max-w-4xl mx-auto space-y-4">
        {assignments.map((file, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center border"
          >
            {/* Left: Icon + Name */}
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-lg ${
                  file.type === "pdf"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {file.type === "pdf" ? (
                  <FaFilePdf className="text-xl" />
                ) : (
                  <FaFileWord className="text-xl" />
                )}
              </div>
              <a
                href={file.url}
                download
                className="text-blue-700 font-semibold hover:underline"
              >
                {idx + 1}. {file.name}
              </a>
            </div>

            {/* Right: Date + Tag */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">
                Posted {file.postedDate}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full">
                Assignment
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAssignmentQuestions;

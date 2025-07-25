import React from "react";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Sample data
const studyMaterials = [
  {
    name: "Week 1 - Introduction Notes",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "A",
    url: "/files/week1-intro.pdf",
  },
  {
    name: "Chapter 2 - Summary",
    type: "docx",
    year: "Second",
    department: "ECE",
    section: "B",
    url: "/files/chapter2-summary.docx",
  },
  // ... (keep all other entries here as-is)
];

const ViewStudyMaterial = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📘 View Study Materials
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Filter and download uploaded notes, slides, lab manuals, etc.
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/faculty/ExamInterFace/upload-material")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +Add new
        </button>
      </div>
      <br />

      {/* File List */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {studyMaterials.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {file.type === "pdf" ? (
                  <FaFilePdf className="text-red-600 text-xl" />
                ) : (
                  <FaFileWord className="text-blue-600 text-xl" />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.year} Year • {file.department} • Section {file.section}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                download
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 text-sm"
              >
                <FaDownload /> Download
              </a>
            </li>
          ))}
          {studyMaterials.length === 0 && (
            <li className="text-center text-gray-500 px-6 py-6">
              No study materials found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewStudyMaterial;

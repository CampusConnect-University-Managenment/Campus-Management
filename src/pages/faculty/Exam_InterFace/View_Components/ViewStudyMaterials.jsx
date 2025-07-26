import React from "react";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const studyMaterials = [
  {
    name: "MLT Lecture Notes.pdf",
    type: "pdf",
    year: "Third",
    department: "CSE",
    section: "A",
    url: "/files/mlt-lecture-notes.pdf",
    posted: "Jan 20, 2025",
    tag: "Material",
  },
];

const ViewStudyMaterial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName || "Unknown Course";

  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">{courseName}</h1>
        <button
          onClick={() => navigate("/faculty/Course")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 flex space-x-8 mb-8 text-lg">
        <button className="pb-2 text-blue-600 font-semibold border-b-2 border-blue-600">
          Study Materials
        </button>
        <button
          onClick={() => navigate("/faculty/ExamInterFace/view-question", {
            state: { courseName },
          })}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Question Papers
        </button>
        <button
          onClick={() => navigate("/faculty/ExamInterFace/view-assignment", {
            state: { courseName },
          })}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Assignments
        </button>
        <button
          onClick={() => navigate("/faculty/ExamInterFace/upload-marks", {
            state: { courseName },
          })}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Upload Marks
        </button>
      </div>

      {/* +Add New */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/faculty/ExamInterFace/upload-material", {
            state: { courseName },
          })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Material Cards */}
      <div className="max-w-4xl mx-auto">
        {studyMaterials.map((file, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center mb-4 border"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                {file.type === "pdf" ? (
                  <FaFilePdf className="text-xl" />
                ) : (
                  <FaFileWord className="text-xl" />
                )}
              </div>
              <a
                href={file.url}
                className="text-blue-700 font-semibold hover:underline"
              >
                {idx + 1}. {file.name}
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">Posted {file.posted}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full">
                {file.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudyMaterial;

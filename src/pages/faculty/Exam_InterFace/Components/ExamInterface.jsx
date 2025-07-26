import React from "react";
import { useNavigate } from "react-router-dom";

const CourseInterface = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-8">
      {/* Top Heading and Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Machine Learning Techniques Portal
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-300 mb-6 text-lg">
        <button className="pb-2 text-gray-700 hover:text-blue-600"
           onClick={() => navigate("/faculty/ExamInterFace/view-material")}>
          Student Materials
        </button>
        <button
          onClick={() => navigate("/faculty/ExamInterFace/view-question")}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Question Papers
        </button>
        <button
          onClick={() => navigate("/faculty/ExamInterFace/view-assignment")}
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Assignments
        </button>
      </div>

      {/* Material Card */}
      <div className="bg-white shadow-md rounded-xl border p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Side - Icon + File Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 text-purple-600 rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m2 0a2 2 0 100-4h-1.586a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H9a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2v-4"
                />
              </svg>
            </div>
            <a
              href="#"
              className="text-blue-700 font-medium hover:underline text-lg"
            >
              1. MLT Lecture Notes.pdf
            </a>
          </div>

          {/* Right Side - Date & Tag */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Posted Jan 20, 2025</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full">
              Material
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInterface;

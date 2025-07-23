import React, { useState } from "react";
import { ArrowRight, User, BookOpen } from "lucide-react";
import AddCourse from "./AddCourse";

// ✅ 3 Courses
const courses = [
  {
    id: 1,
    courseName: "Machine Learning Techniques",
    faculty: "Dr. R. Kala",
    icon: <BookOpen className="w-5 h-5 text-purple-800" />,
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    badge: "bg-white text-purple-700",
    text: "text-purple-900",
  },
  {
    id: 2,
    courseName: "Artificial Intelligence",
    faculty: "Prof. Arvind Iyer",
    icon: <BookOpen className="w-5 h-5 text-blue-800" />,
    bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    badge: "bg-white text-blue-700",
    text: "text-blue-900",
  },
  {
    id: 3,
    courseName: "Database Management Systems",
    faculty: "Dr. Priya Singh",
    icon: <BookOpen className="w-5 h-5 text-green-800" />,
    bg: "bg-gradient-to-br from-green-100 to-green-200",
    badge: "bg-white text-green-700",
    text: "text-green-900",
  },
];

// ✅ Course-specific Dummy Data with URLs
const courseData = {
  1: {
    materials: [
      {
        title: "MLT Lecture Notes.pdf",
        postedOn: "Jan 20, 2025",
        type: "Material",
        url: "/files/mlt-stud.pdf", // public folder link
      },
    ],
    questions: [
      {
        title: "Midterm 2023.pdf",
        type: "Question Paper",
        url: "/files/mlt-qb.pdf",
      },
    ],
  },
  2: {
    materials: [
      {
        title: "AI Lecture 1.pdf",
        postedOn: "Jan 12, 2025",
        type: "Material",
        url: "/files/ai-stud.pdf",
      },
    ],
    questions: [
      {
        title: "Final Exam 2024.pdf",
        type: "Question Paper",
        url: "/files/ai-qb.pdf",
      },
    ],
  },
  3: {
    materials: [
      {
        title: "DBMS Notes.docx",
        postedOn: "Jan 15, 2025",
        type: "Material",
        url: "/files/dbms-stud.pdf",
      },
    ],
    questions: [
      {
        title: "Midterm 2023.pdf",
        type: "Question Paper",
        url: "/files/dbms-qb.pdf",
      },
    ],
  },
};

export default function CoursesOverview() {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("materials");

  if (showAddCourse) {
    return <AddCourse onBack={() => setShowAddCourse(false)} />;
  }

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setActiveTab("materials");
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  if (selectedCourse) {
    const data = courseData[selectedCourse.id];
    return (
      <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f4f6ff] to-[#fbfbff]">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-blue-600">
            {selectedCourse.courseName} Portal
          </h1>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            ← Back
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-6 border-b pb-2">
          <button
            className={`${
              activeTab === "materials"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-600"
            } pb-2`}
            onClick={() => setActiveTab("materials")}
          >
            Student Materials
          </button>
          <button
            className={`${
              activeTab === "questions"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-600"
            } pb-2`}
            onClick={() => setActiveTab("questions")}
          >
            Question Papers
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "materials" ? (
            <ul className="space-y-4">
              {data.materials.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
                >
                  {/* Left: File Name */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">📄</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-700 hover:underline"
                    >
                      {index + 1}. {item.title}
                    </a>
                  </div>

                  {/* Right: Date + Type */}
                  <div className="flex items-center gap-4">
                    {item.postedOn && (
                      <span className="text-sm text-gray-500">
                        Posted {item.postedOn}
                      </span>
                    )}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {item.type}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-4">
              {data.questions.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">📄</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-700 hover:underline"
                    >
                      {index + 1}. {item.title}
                    </a>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {item.type}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f4f6ff] to-[#fbfbff]">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-blue-600">📘 My Courses</h1>
        <button
          onClick={() => setShowAddCourse(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          + Course Enrollment
        </button>
      </div>

      {/* Show only 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`${course.bg} ${course.text} rounded-2xl p-6 border shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">{course.courseName}</div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${course.badge}`}
              >
                {course.icon}
              </div>
            </div>

            <div className="flex items-center text-sm mt-2 gap-2">
              <User size={16} className="opacity-70" />
              <span className="font-medium">{course.faculty}</span>
            </div>

            <div
              onClick={() => handleViewDetails(course)}
              className="mt-4 text-sm text-blue-700 flex items-center gap-1 font-medium hover:underline cursor-pointer"
            >
              View Details <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

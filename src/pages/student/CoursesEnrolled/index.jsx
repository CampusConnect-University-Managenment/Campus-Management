import React, { useState } from "react";
import { ArrowRight, User, BookOpen, ChevronDown } from "lucide-react";
import AddCourse from "./AddCourse"; // ✅ Import AddCourse

const courses = [
  {
    id: 1,
    courseName: "Data Structures & Algorithms",
    faculty: "Dr. Meena Kumar",
    icon: <BookOpen className="w-5 h-5 text-purple-800" />,
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    badge: "bg-white text-purple-700",
    text: "text-purple-900",
  },
  {
    id: 2,
    courseName: "Operating Systems",
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
  {
    id: 4,
    courseName: "Artificial Intelligence",
    faculty: "Dr. Rakesh Rao",
    icon: <BookOpen className="w-5 h-5 text-pink-800" />,
    bg: "bg-gradient-to-br from-pink-100 to-pink-200",
    badge: "bg-white text-pink-700",
    text: "text-pink-900",
  },
  {
    id: 5,
    courseName: "Computer Networks",
    faculty: "Prof. Kavitha M",
    icon: <BookOpen className="w-5 h-5 text-yellow-800" />,
    bg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    badge: "bg-white text-yellow-700",
    text: "text-yellow-900",
  },
  {
    id: 6,
    courseName: "Software Engineering",
    faculty: "Dr. Suresh R",
    icon: <BookOpen className="w-5 h-5 text-red-800" />,
    bg: "bg-gradient-to-br from-red-100 to-red-200",
    badge: "bg-white text-red-700",
    text: "text-red-900",
  },
];

export default function CoursesOverview() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false); // ✅ Navigation state

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  if (showAddCourse) {
    return <AddCourse onBack={() => setShowAddCourse(false)} />; // ✅ Show AddCourse
  }

  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f4f6ff] to-[#fbfbff]">
      {/* Header row */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-blue-600">📘 My Courses</h1>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1 shadow-md"
          >
            + Course Enrollment <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
              <ul className="text-sm text-gray-700">
                <li
                  onClick={() => setShowAddCourse(true)} // ✅ Navigation trigger
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                >
                  Add New Course
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`${course.bg} ${course.text} 
              rounded-2xl p-6 border shadow-md hover:shadow-xl 
              hover:-translate-y-2 transition duration-300 ease-in-out cursor-pointer`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold leading-tight">
                {course.courseName}
              </div>
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

            <div className="mt-4 text-sm text-blue-700 flex items-center gap-1 font-medium hover:underline">
              View Details <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

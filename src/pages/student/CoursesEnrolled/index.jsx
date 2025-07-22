import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, MessageSquare } from "lucide-react";

const courses = [
  {
    id: 1,
    courseName: "Data Structures & Algorithms",
    faculty: "Dr. Meena Kumar",
    bg: "bg-purple-100",
    color: "text-purple-800",
  },
  {
    id: 2,
    courseName: "Operating Systems",
    faculty: "Prof. Arvind Iyer",
    bg: "bg-blue-100",
    color: "text-blue-800",
  },
  {
    id: 3,
    courseName: "Database Management Systems",
    faculty: "Dr. Priya Singh",
    bg: "bg-green-100",
    color: "text-green-800",
  },
  {
    id: 4,
    courseName: "Artificial Intelligence",
    faculty: "Dr. Rakesh Rao",
    bg: "bg-pink-100",
    color: "text-pink-800",
  },
  {
    id: 5,
    courseName: "Computer Networks",
    faculty: "Prof. Kavitha M",
    bg: "bg-yellow-100",
    color: "text-yellow-800",
  },
  {
    id: 6,
    courseName: "Software Engineering",
    faculty: "Dr. Suresh R",
    bg: "bg-red-100",
    color: "text-red-800",
  },
];

const CoursesEnrolled = () => {
  const navigate = useNavigate();

  const handleViewDetails = (course) => {
    navigate("/student/CoursesEnrolled/Studymaterial", { state: { course } });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          My Courses
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
          + Course Enrollment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`${course.bg} p-6 rounded-xl shadow-md transition-all hover:shadow-lg`}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className={`text-xl font-semibold ${course.color}`}>
                {course.courseName}
              </h2>
              <MessageSquare className={`w-6 h-6 ${course.color}`} />
            </div>
            <p className="flex items-center gap-2 text-gray-700 mb-4">
              <User className="w-4 h-4" />
              {course.faculty}
            </p>
            <button
              onClick={() => handleViewDetails(course)}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesEnrolled;

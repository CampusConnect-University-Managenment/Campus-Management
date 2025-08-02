
import React, { useState } from "react";
import { ArrowRight, User, BookOpen } from "lucide-react";
import AddCourse from "./AddCourse";

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

const courseData = {
  1: {
    materials: [
      {
        title: "MLT Lecture Notes.pdf",
        postedOn: "Jan 20, 2025",
        type: "Material",
        url: "/files/mlt-stud.pdf",
      },
      {
        title: "MLT Algorithms.docx",
        postedOn: "Jan 25, 2025",
        type: "Material",
        url: "/files/mlt-algo.docx",
      },
    ],
    questions: [
      {
        title: "Midterm 2023.pdf",
        type: "Question Paper",
        url: "/files/mlt-qb.pdf",
      },
      {
        title: "Final 2024.pdf",
        type: "Question Paper",
        url: "/files/mlt-final.pdf",
      },
    ],
    assignments: [
      {
        title: "Assignment 1 - ML Basics.pdf",
        url: "/files/mlt-stud.pdf",
        postedOn: "July 20, 2025",
        deadline: "July 30, 2025",
        grade: null, // No grade yet
      },
      {
        title: "Assignment 2 - Supervised vs Unsupervised.pdf",
        url: "/files/ml-assignment2.pdf",
        postedOn: "July 22, 2025",
        deadline: "August 1, 2025",
        grade: "A", // Faculty has graded
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
    assignments: [
      {
        title: "Assignment 1 - ER Diagrams",
        postedOn: "July 10, 2025",
        deadline: "July 25, 2025",
        url: "/files/ai-stud.pdf",
        grade: "B+",
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
    assignments: [
      {
        title: "Assignment 1 - ER Diagrams",
        postedOn: "July 10, 2025",
        deadline: "July 25, 2025",
        url: "/files/ai-stud.pdf",
        grade: null,
      },
    ],
  },
};

export default function CoursesOverview() {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("materials");
  const [assignmentStatus, setAssignmentStatus] = useState({}); // Renamed from uploadedAssignments for clarity

  if (showAddCourse) return <AddCourse onBack={() => setShowAddCourse(false)} />;

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setActiveTab("materials");
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  const handleFileChange = (courseId, index, file) => {
    setAssignmentStatus((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [index]: { file, submitted: false }, // Store file and its submission status
      },
    }));
  };

  const handleSubmit = (courseId, index) => {
    const currentStatus = assignmentStatus[courseId]?.[index];
    const currentFile = currentStatus?.file;

    if (currentFile) {
      setAssignmentStatus((prev) => ({
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [index]: { ...currentStatus, submitted: true }, // Mark as submitted
        },
      }));
      alert(`✅ Submitted: ${currentFile.name}`);
    }
  };

  const handleRemoveSubmittedFile = (courseId, index) => {
    setAssignmentStatus((prev) => {
      const updated = { ...prev };
      if (updated[courseId] && updated[courseId][index]) {
        delete updated[courseId][index]; // Remove the entry
      }
      return updated;
    });
    alert("❌ File removed! You can upload a new one.");
  };

  if (selectedCourse) {
    const data = courseData[selectedCourse.id];

    return (
      <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f4f6ff] to-[#fbfbff]">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-blue-600">{selectedCourse.courseName} Portal</h1>
          <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
            ← Back
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-6 border-b pb-2">
          {["materials", "questions", "assignments"].map((tab) => (
            <button
              key={tab}
              className={`${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-600"} pb-2 capitalize`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "materials" ? "Student Materials" : tab === "questions" ? "Question Papers" : "Assignments"}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Materials Section */}
          {activeTab === "materials" && (
            <ul className="space-y-4">
              {data.materials.map((item, index) => (
                <li key={index} className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">📄</span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
                      {index + 1}. {item.title}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.postedOn && <span className="text-sm text-gray-500">Posted {item.postedOn}</span>}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.type}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Questions Section */}
          {activeTab === "questions" && (
            <ul className="space-y-4">
              {data.questions.map((item, index) => (
                <li key={index} className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">📄</span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
                      {index + 1}. {item.title}
                    </a>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{item.type}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Assignments Section */}
          {activeTab === "assignments" && (
            <ul className="space-y-4">
              {data.assignments.map((item, index) => {
                const status = assignmentStatus[selectedCourse.id]?.[index];
                const fileSelected = status?.file;
                const submitted = status?.submitted;

                return (
                  <li key={index} className="flex flex-col border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">📄</span>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
                          {index + 1}. {item.title}
                        </a>
                      </div>
                      <a href={item.url} download className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        ⬇️ Download
                      </a>
                    </div>

                    <div className="text-sm text-gray-500 mb-2">
                      Deadline: {item.deadline} | Posted on: {item.postedOn}
                    </div>

                    {/* Grade Display */}
                    <p className="text-sm font-semibold mb-2">
                      Grade:{" "}
                      {item.grade ? (
                        <span className="text-green-600">{item.grade}</span>
                      ) : (
                        <span className="text-gray-500">Not graded yet</span>
                      )}
                    </p>

                    {/* Upload & Submit Section */}
                    {!submitted ? (
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(selectedCourse.id, index, e.target.files[0])}
                          className="border rounded p-2 w-full sm:w-auto"
                        />

                        <button
                          disabled={!fileSelected}
                          onClick={() => handleSubmit(selectedCourse.id, index)}
                          className={`px-4 py-2 rounded text-white ${fileSelected ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-green-600 font-semibold">
                          ✅ Submitted: {fileSelected?.name}
                        </p>
                        <button
                          onClick={() => handleRemoveSubmittedFile(selectedCourse.id, index)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`${course.bg} ${course.text} rounded-2xl p-6 border shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">{course.courseName}</div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${course.badge}`}>{course.icon}</div>
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
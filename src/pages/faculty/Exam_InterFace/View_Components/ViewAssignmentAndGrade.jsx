import React, { useEffect, useState } from "react";
import { FaDownload, FaEye, FaTimesCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const FacultyAssignmentGrading = () => {
  const [assignments, setAssignments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName || "Machine Learning Techniques";

  useEffect(() => {
    // Replace with API call in production
    setAssignments([
      {
        id: "1",
        studentName: "Riyaas Deen",
        rollNo: "CSE001",
        fileUrl: "/uploads/oops-assignment1-riyaas.pdf",
        submittedDate: "July 25, 2025",
        grade: "",
        rejected: false,
      },
      {
        id: "2",
        studentName: "Ayesha Ali",
        rollNo: "CSE002",
        fileUrl: "/uploads/oops-assignment1-ayesha.pdf",
        submittedDate: "July 24, 2025",
        grade: "",
        rejected: false,
      },
    ]);
  }, []);

  const handleGradeChange = (id, gradeValue) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, grade: gradeValue } : item
      )
    );
  };

  const handleReject = (id) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rejected: true, grade: "" } : item
      )
    );
  };

  const handleViewFile = (url) => {
    if (url) window.open(url, "_blank");
  };

  const handleSubmitGrades = () => {
    const graded = assignments.filter((a) => !a.rejected);
    const rejected = assignments.filter((a) => a.rejected);
    
    setIsSubmitting(true);
    console.log("Graded Assignments:", graded);
    console.log("Rejected Assignments:", rejected);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Grades submitted successfully!");
    }, 1000);
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">{courseName}</h1>
        <button
          onClick={() => navigate("/faculty/Course")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex space-x-8 mb-8 text-lg">
        {[
          { label: "Study Materials", route: "view-material" },
          { label: "Question Papers", route: "view-question" },
          { label: "Assignments Questions", route: "view-assignment" },
        ].map((tab) => (
          <button
            key={tab.route}
            onClick={() => navigate(`/faculty/ExamInterFace/${tab.route}`, { state: { courseName } })}
            className="pb-2 text-gray-700 hover:text-blue-600"
          >
            {tab.label}
          </button>
        ))}
        <button className="pb-2 text-blue-600 font-semibold border-b-2 border-blue-600 cursor-default">
          Grade Assignment
        </button>
      </div>

      {/* Assignment Cards */}
      <div className="max-w-4xl mx-auto space-y-4">
        {assignments.map((item, index) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-md p-5 flex justify-between items-center border transition ${
              item.rejected ? "opacity-50" : ""
            }`}
          >
            {/* Left Content */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <div className="text-blue-700 font-semibold">
                {index + 1}. {item.studentName} ({item.rollNo})
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleViewFile(item.fileUrl)}
                  className="text-green-600 flex items-center gap-1 text-sm hover:underline"
                >
                  <FaEye /> View
                </button>
                <a
                  href={item.fileUrl}
                  download
                  className="text-blue-600 flex items-center gap-1 text-sm hover:underline"
                >
                  <FaDownload /> Download
                </a>
              </div>

              <span className="text-gray-500 text-sm">
                Submitted {item.submittedDate}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex gap-3 items-center">
              {!item.rejected ? (
                <>
                  <select
                    value={item.grade}
                    onChange={(e) => handleGradeChange(item.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Grade</option>
                    <option value="O">O</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="RA">RA</option>
                  </select>

                  <button
                    onClick={() => handleReject(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                  >
                    <FaTimesCircle />
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-red-600 font-medium">Rejected</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSubmitGrades}
          disabled={isSubmitting || assignments.length === 0}
          className={`px-8 py-2 rounded-lg shadow text-white font-medium transition ${
            isSubmitting || assignments.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Grades"}
        </button>
      </div>
    </div>
  );
};

export default FacultyAssignmentGrading;

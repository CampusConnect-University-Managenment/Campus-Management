import React, { useEffect, useState } from "react";
import AssignmentForm from "./AssignmentForm";
import axios from "axios";

const AssignmentManager = () => {
  const [assignments, setAssignments] = useState([]);
  const [confirmedAssignments, setConfirmedAssignments] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8081/admin/class-assignments/with-names").then((res) => {
      const data = res.data.data || [];
      const converted = data.map((a) => ({
        id: a.id,
        year: a.year,
        semester: a.semester,
        department: a.department,
        course: a.courseId,
        faculty: a.facultyId,
        facultyName: a.facultyName,
        assignedCount: a.studentCount,
      }));
      setConfirmedAssignments(converted);
    });
  }, []);

  // ✅ Build map of assigned students per course (empty Set, since with-names doesn't return studentIds)
  const courseToAssignedStudents = {};
  confirmedAssignments.forEach((a) => {
    if (!courseToAssignedStudents[a.course]) {
      courseToAssignedStudents[a.course] = new Set();
    }
    // No studentIds in detailed data, so we skip this
  });

  const handleCreateAssignment = (assignment) => {
    setAssignments((prev) => [
      ...prev,
      { ...assignment, id: Date.now(), selectedStudents: [] },
    ]);
  };

  const handleFinalConfirm = async (assignment) => {
    if (assignment.selectedStudents.length === 0) {
      setPopupMessage("Please select at least one student before confirming.");
      setShowPopup(true);
      return;
    }

    const payload = {
      year: assignment.year,
      semester: getSemesterNumber(assignment.year, assignment.semester),
      department: assignment.department,
      courseId: assignment.course,
      facultyId: assignment.faculty,
      studentIds: assignment.selectedStudents,
    };

    try {
      const res = await axios.post("http://localhost:8081/admin/class-assignments", payload);
      const data = res.data.data;

      const confirmedAssignment = {
        id: data.id,
        year: data.year,
        semester: data.semester,
        department: data.department,
        course: data.courseId,
        faculty: data.facultyId,
        facultyName: "Faculty " + data.facultyId, // Placeholder name
        assignedCount: data.studentIds.length,
      };

      setConfirmedAssignments((prev) => [...prev, confirmedAssignment]);
      setAssignments((prev) => prev.filter((a) => a.id !== assignment.id));
      setPopupMessage(`Assignment confirmed for ${data.facultyId}.`);
      setShowPopup(true);
    } catch (err) {
      console.error("Error confirming assignment:", err);
      setPopupMessage("Assignment failed.");
      setShowPopup(true);
    }
  };

  const getSemesterNumber = (year, semester) => {
    const romanToInt = { I: 1, II: 2, III: 3, IV: 4 };
    const yearNum = romanToInt[year];
    const semNum = semester === "I" ? 1 : 2;
    return ((yearNum - 1) * 2 + semNum).toString();
  };

  return (
    <div className="pt-28 px-4">
      <AssignmentForm
        onCreateAssignment={handleCreateAssignment}
        courseToAssignedStudents={courseToAssignedStudents}
      />

      {/* 🔽 Ongoing Assignments being created (checkbox view) */}
      {assignments.map((assignment) => (
        <div key={assignment.id} className="bg-gray-100 p-4 my-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Assignment: {assignment.course} - {assignment.faculty}
          </h3>

          {/* Student Selection */}
          <div className="mb-2">
            <p className="text-sm text-gray-600 mb-1">Select students to assign:</p>
            {assignment.students.length === 0 ? (
              <p className="text-red-500">No students available</p>
            ) : (
              assignment.students.map((student) => (
                <div key={student.roll} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={assignment.selectedStudents.includes(student.roll)}
                    onChange={() => {
                      setAssignments((prev) =>
                        prev.map((a) =>
                          a.id === assignment.id
                            ? {
                                ...a,
                                selectedStudents: a.selectedStudents.includes(student.roll)
                                  ? a.selectedStudents.filter((id) => id !== student.roll)
                                  : [...a.selectedStudents, student.roll],
                              }
                            : a
                        )
                      );
                    }}
                  />
                  <span className="text-gray-700">
                    {student.roll} - {student.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Confirm Button */}
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => handleFinalConfirm(assignment)}
          >
            Confirm Assignment
          </button>
        </div>
      ))}

      {/* 🔽 ✅ Confirmed Assignments Display */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmed Class Assignments</h2>
        {confirmedAssignments.length === 0 ? (
          <p className="text-gray-600">No confirmed assignments yet.</p>
        ) : (
          <div className="grid gap-4">
            {confirmedAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-md shadow p-4 border">
                <h3 className="text-md font-bold text-indigo-700 mb-2">
                  {assignment.course} - {assignment.facultyName} ({assignment.faculty})
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Year:</strong> {assignment.year} | <strong>Semester:</strong> {assignment.semester} |{" "}
                  <strong>Department:</strong> {assignment.department}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Assigned Students:</strong> {assignment.assignedCount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔽 Popup Message */}
      {showPopup && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
          <strong className="font-bold">Notice:</strong>
          <span className="block sm:inline ml-2">{popupMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowPopup(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 010 1.414L11.414 10l2.934 2.934a1 1 0 11-1.414 1.414L10 11.414l-2.934 2.934a1 1 0 11-1.414-1.414L8.586 10 5.652 7.066a1 1 0 111.414-1.414L10 8.586l2.934-2.934a1 1 0 011.414 0z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default AssignmentManager;

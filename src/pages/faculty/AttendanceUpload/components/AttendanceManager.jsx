import React, { useState, useEffect, useMemo } from "react";
import AttendanceUploadPage from "./AttendanceUploadPage";
import HistoryReportScreen from "./HistoryReportScreen";

/* ---------- HELPER FUNCTIONS (Inlined) ---------- */
const getUniqueValues = (data, key) => [
  ...new Set(data.map((item) => item[key])),
];

const toYYYYMMDD = (date) =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    : "";
/* ------------------------------------------------ */

const AttendanceManager = () => {
  const [view, setView] = useState("upload");

  const [attendanceHistory, setAttendanceHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("attendanceHistory");
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse attendance history:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "attendanceHistory",
      JSON.stringify(attendanceHistory)
    );
  }, [attendanceHistory]);

  const submittedHours = useMemo(
    () => getUniqueValues(attendanceHistory, "classId"),
    [attendanceHistory]
  );

  const handleNewSubmission = (submissionData) => {
    const { filters, selectedClasses, students, attendanceData } =
      submissionData;
    const newRecords = [];
    const date = toYYYYMMDD(filters.date);

    for (const sClass of selectedClasses) {
      for (const student of students) {
        newRecords.push({
          date,
          batch: sClass.batch,
          courseCode: sClass.courseCode,
          courseName: sClass.courseName,
          hour: sClass.hour,
          classId: sClass.id,
          studentId: student.id,
          studentName: student.name,
          status: attendanceData[student.id] || "N/A",
        });
      }
    }

    setAttendanceHistory((prev) =>
      [...prev, ...newRecords].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <main className="max-w-6xl p-4 mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {view === "upload" && (
            <>
              <div className="flex justify-end p-4 border-b border-gray-200">
                <button
                  onClick={() => setView("history")}
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  View History Report →
                </button>
              </div>
              <AttendanceUploadPage
                onNewSubmission={handleNewSubmission}
                submittedHours={submittedHours}
              />
            </>
          )}
          {view === "history" && (
            <HistoryReportScreen
              history={attendanceHistory}
              onBack={() => setView("upload")}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AttendanceManager;

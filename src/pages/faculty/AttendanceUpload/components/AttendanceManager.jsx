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
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // Fetch attendance history from backend
  const fetchHistory = () => {
    fetch("http://localhost:5003/attendance/history")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAttendanceHistory(sorted);
      })
      .catch((err) => console.error("Failed to fetch history:", err));
  };

  useEffect(() => {
    fetchHistory();
  }, [view]);

  const submittedHours = useMemo(
    () => getUniqueValues(attendanceHistory, "classId"),
    [attendanceHistory]
  );

  const handleNewSubmission = (submissionData) => {
    const { filters, selectedClasses, students, attendanceData } =
      submissionData;
    const date = toYYYYMMDD(filters.date);
    const newRecords = [];

    const alreadySubmitted = new Set(submittedHours);

    for (const sClass of selectedClasses) {
      if (
        !sClass ||
        !sClass.batch ||
        !sClass.courseCode ||
        !sClass.courseName ||
        sClass.hour == null ||
        alreadySubmitted.has(sClass.id)
      ) {
        console.warn("Skipped invalid or already submitted class:", sClass);
        continue;
      }

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

    if (newRecords.length === 0) {
      console.warn("No valid attendance records to submit.");
      return;
    }

    fetch("http://localhost:5003/attendance/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecords),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit attendance");
        return res.json();
      })
      .then(() => {
        fetchHistory(); // refresh history after successful submission
      })
      .catch((err) => console.error("Error submitting attendance:", err));
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

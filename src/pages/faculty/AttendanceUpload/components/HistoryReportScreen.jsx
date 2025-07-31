import React from "react";

const HistoryReportScreen = ({ history, onBack }) => {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        ← Back to Upload
      </button>

      <h2 className="text-xl font-bold mb-4">Attendance History</h2>

      {history.length === 0 ? (
        <div className="text-gray-500">No records available.</div>
      ) : (
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Batch</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Hour</th>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 border">{record.date}</td>
                <td className="p-2 border">{record.batch}</td>
                <td className="p-2 border">
                  {record.courseCode} - {record.courseName}
                </td>
                <td className="p-2 border">{record.hour}</td>
                <td className="p-2 border">
                  {record.studentId} - {record.studentName}
                </td>
                <td className="p-2 border">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryReportScreen;

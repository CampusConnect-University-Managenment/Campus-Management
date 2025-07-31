import React, { useState, useEffect } from "react";

const MarkAttendanceScreen = ({
  selectedClasses,
  students,
  onBack,
  onSubmit,
}) => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    setAttendance(
      students.reduce((acc, student) => ({ ...acc, [student.id]: "P" }), {})
    );
  }, [students]);

  const handleStatusChange = (studentId, status) =>
    setAttendance((prev) => ({ ...prev, [studentId]: status }));

  const selectedHoursText = selectedClasses
    .map((c) => c.hour)
    .sort((a, b) => a - b)
    .map((h) => {
      const ordinals = { 1: "st", 2: "nd", 3: "rd" };
      return `${h}${ordinals[h] || "th"}`;
    })
    .join(" & ");

  const courseInfo = selectedClasses[0];

  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200">
        {courseInfo && (
          <h2 className="text-2xl font-bold text-gray-800">
            Mark Attendance: {courseInfo.courseCode}
          </h2>
        )}
        <p className="text-gray-500">
          <strong>Hour(s):</strong> {selectedHoursText}
        </p>
      </div>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["S.No", "Roll No", "Student Name", "Status"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-600 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {student.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    {["P", "A", "OD"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`status_${student.id}`}
                          checked={attendance[student.id] === status}
                          onChange={() =>
                            handleStatusChange(student.id, status)
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ← Back
        </button>
        <button
          onClick={() => onSubmit(attendance)}
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceScreen;

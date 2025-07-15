import React, { useState } from 'react';

const sampleStudents = [
  { id: 1, name: "Arun Kumar" },
  { id: 2, name: "Priya Sharma" },
  { id: 3, name: "Ravi Raj" },
  { id: 4, name: "Sneha Singh" },
  { id: 5, name: "Naren Boobesh" }
];

function FacultyAttendanceUpload() {
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = sampleStudents.map(student => ({
      studentId: student.id,
      name: student.name,
      status: attendance[student.id] || 'Absent'
    }));

    const payload = {
      date,
      subject,
      attendance: finalData
    };

    console.log("Uploading Attendance:", payload);
    alert("Attendance uploaded successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl mt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6  mt-5 text-center">
        Faculty Attendance Upload
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">Subject</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Eg: Computer Science"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-4 text-gray-700 font-medium text-lg">Mark Attendance</label>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-center">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="border px-4 py-2">Student</th>
                  <th className="border px-4 py-2">Present</th>
                  <th className="border px-4 py-2">Absent</th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map(student => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="border px-4 py-2 font-medium text-gray-800">{student.name}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={attendance[student.id] === 'Present'}
                        onChange={() => handleAttendanceChange(student.id, 'Present')}
                        className="accent-green-600"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={attendance[student.id] === 'Absent'}
                        onChange={() => handleAttendanceChange(student.id, 'Absent')}
                        className="accent-red-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Upload Attendance
          </button>
        </div>
      </form>
    </div>
  );
}

export default FacultyAttendanceUpload;

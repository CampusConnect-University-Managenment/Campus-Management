import React, { useState } from 'react';

const sampleStudents = [
  { id: 1, name: "Arun Kumar" },
  { id: 2, name: "Priya Sharma" },
  { id: 3, name: "Ravi Raj" },
  { id: 4, name: "Sneha Singh" },
  {id :5 ,name:"naren boobesh"}
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
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Faculty Attendance Upload</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="border px-2 py-1 w-full"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            className="border px-2 py-1 w-full"
            placeholder="Eg: Computer Science"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Mark Attendance</label>
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Student</th>
                <th className="border px-2 py-1">Present</th>
                <th className="border px-2 py-1">Absent</th>
              </tr>
            </thead>
            <tbody>
              {sampleStudents.map(student => (
                <tr key={student.id}>
                  <td className="border px-2 py-1">{student.name}</td>
                  <td className="border px-2 py-1 text-center">
                    <input
                      type="radio"
                      name={`status-${student.id}`}
                      checked={attendance[student.id] === 'Present'}
                      onChange={() => handleAttendanceChange(student.id, 'Present')}
                    />
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <input
                      type="radio"
                      name={`status-${student.id}`}
                      checked={attendance[student.id] === 'Absent'}
                      onChange={() => handleAttendanceChange(student.id, 'Absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Attendance
        </button>
      </form>
    </div>
  );
}

export default FacultyAttendanceUpload;

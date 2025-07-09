import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#ff6b6b', '#4dabf7'];

const attendanceData = {
  'Semester 1': [
    { subject: 'Math', attendance: 85 },
    { subject: 'Physics', attendance: 78 },
    { subject: 'C Programming', attendance: 92 },
  ],
  'Semester 2': [
    { subject: 'Data Structures', attendance: 88 },
    { subject: 'Discrete Math', attendance: 75 },
    { subject: 'Web Tech', attendance: 80 },
  ],
  'Semester 3': [
    { subject: 'DBMS', attendance: 95 },
    { subject: 'OS', attendance: 82 },
    { subject: 'OOPs', attendance: 91 },
  ],
  'Semester 4 (Current)': [
    { subject: 'Java', attendance: 87 },
    { subject: 'CN', attendance: 76 },
    { subject: 'AI', attendance: 90 },
  ]
};

const totalDays = 100;

export default function StudentDashboard() {
  const [selectedSemester, setSelectedSemester] = useState('Semester 4 (Current)');
  const currentData = attendanceData[selectedSemester];
  const navigate = useNavigate();

  const averageAttendance = Math.round(
    currentData.reduce((acc, cur) => acc + cur.attendance, 0) / currentData.length
  );

  const leavesTaken = totalDays - Math.round((averageAttendance / 100) * totalDays);

  const pieData = [
    { name: 'Attendance', value: averageAttendance },
    { name: 'Leaves', value: leavesTaken },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">KCE</h1>
        <nav className="flex flex-col gap-4 text-gray-700">
<span onClick={() => navigate('/course')} className="cursor-pointer hover:text-blue-700">📚 My Course</span>
<span onClick={() => navigate('/calendar')} className="cursor-pointer hover:text-blue-700">📃 Calendar</span>
<span onClick={() => navigate('/enrollment')} className="cursor-pointer hover:text-blue-700">📤 Course Enrollment</span>

        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Profile Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={() => navigate('/profile')}
          >
            View Profile
          </button>
        </div>

        {/* Basic Student Info */}
        <div className="bg-white p-4 rounded shadow mb-6 w-full max-w-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-2">👩 Student Info</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><strong>Name:</strong> Vidhya</p>
            <p><strong>Email:</strong> vn@kce.ac.in</p>
            <p><strong>Enrollment No:</strong> p360</p>
            <p><strong>Course:</strong> BE</p>
            <p><strong>Session:</strong> Nov 2022 - march 2026</p>
            <p><strong>Semester:</strong> V</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded shadow col-span-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Student Progress</h3>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {Object.keys(attendanceData).map((sem, idx) => (
                  <option key={idx} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={currentData}>
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="attendance" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded shadow flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Overall Attendance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 text-sm text-gray-700 text-center">
              <p><strong>Total Working Days:</strong> {totalDays}</p>
              <p><strong>Leaves Taken:</strong> {leavesTaken}</p>
              <p><strong>Attendance %:</strong> {averageAttendance}%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

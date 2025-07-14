import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#4f46e5', '#f87171'];

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

  const averageAttendance = Math.round(
    currentData.reduce((acc, cur) => acc + cur.attendance, 0) / currentData.length
  );

  const leavesTaken = totalDays - Math.round((averageAttendance / 100) * totalDays);

  const pieData = [
    { name: 'Attendance', value: averageAttendance },
    { name: 'Leaves', value: leavesTaken },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="mb-8">
      
      </div>

      {/* Student Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6 w-full max-w-4xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📘 Student Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 font-medium">
          <p><strong>Name:</strong> Vidhya</p>
          <p><strong>Email:</strong> vn@kce.ac.in</p>
          <p><strong>Enrollment No:</strong> p360</p>
          <p><strong>Course:</strong> BE</p>
          <p><strong>Session:</strong> Nov 2022 - Mar 2026</p>
          <p><strong>Semester:</strong> V</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">📊 Subject-wise Attendance</h3>
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
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={currentData}>
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="attendance" fill="#4f46e5" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Overall Attendance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-700 text-center font-medium">
            <p><strong>Total Days:</strong> {totalDays}</p>
            <p><strong>Leaves Taken:</strong> {leavesTaken}</p>
            <p><strong>Attendance %:</strong> {averageAttendance}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

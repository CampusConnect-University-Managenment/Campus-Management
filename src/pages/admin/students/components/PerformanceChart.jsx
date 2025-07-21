import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PerformanceChart = ({ students }) => {
  const departmentAbbreviations = {
    "Computer Science and Engineering": "CSE",
    "Electronics and Communication Engineering": "ECE",
    "Electrical and Electronics Engineering": "EEE",
    "Information Technology": "IT",
    "Mechanical Engineering": "ME",
    "Civil Engineering": "CE",
    "Artificial Intelligence and Data Science": "AI&DS",
    // Add more as needed
  };

  const departmentData = {};

  students.forEach((student) => {
    const dept = student.department;
    if (!departmentData[dept]) {
      departmentData[dept] = { cgpaTotal: 0, attendanceTotal: 0, count: 0 };
    }
    departmentData[dept].cgpaTotal += student.cgpa;
    departmentData[dept].attendanceTotal += student.attendance;
    departmentData[dept].count += 1;
  });

  const chartData = Object.entries(departmentData).map(([dept, data]) => ({
    department: departmentAbbreviations[dept] || dept, // Use abbreviation if available
    avgCGPA: parseFloat((data.cgpaTotal / data.count).toFixed(2)),
    avgAttendance: parseFloat((data.attendanceTotal / data.count).toFixed(2)),
    strength: data.count,
  }));

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-blue-800 mb-4">
        📊 Department-wise Performance Overview
      </h3>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="department"
              angle={-15}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgCGPA" fill="#6366f1" name="Avg CGPA" />
            <Bar dataKey="avgAttendance" fill="#10b981" name="Avg Attendance (%)" />
            <Bar dataKey="strength" fill="#f59e0b" name="Student Strength" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

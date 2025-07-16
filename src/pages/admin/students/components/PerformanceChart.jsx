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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PerformanceChart = ({ students }) => {
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
    department: dept,
    avgCGPA: parseFloat((data.cgpaTotal / data.count).toFixed(2)),
    avgAttendance: parseFloat((data.attendanceTotal / data.count).toFixed(2)),
    strength: data.count,
  }));

  const pieColors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Department-wise Performance (Bar)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" angle={-15} textAnchor="end" interval={0} height={60} />
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

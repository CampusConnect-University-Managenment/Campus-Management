
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GraduationCap, Activity, BookOpen } from "lucide-react";

// ✅ CGPA data for each semester
const chartData = [
  { name: "Sem 1", CGPA: 7.8 },
  { name: "Sem 2", CGPA: 8.2 },
  { name: "Sem 3", CGPA: 7.5 },
  { name: "Sem 4", CGPA: 8.8 },
  { name: "Sem 5", CGPA: 8.4 },
  { name: "Sem 6", CGPA: 9.0 },
];

// 📊 Stats on top
const quickStats = [
  {
    id: 1,
    title: "CGPA",
    value: "8.7",
    icon: <GraduationCap className="text-indigo-600 w-5 h-5" />,
    color: "from-indigo-100 to-indigo-200",
  },
  {
    id: 2,
    title: "Attendance",
    value: "92%",
    icon: <Activity className="text-green-600 w-5 h-5" />,
    color: "from-green-100 to-green-200",
  },
  {
    id: 3,
    title: "Credits",
    value: "102",
    icon: <BookOpen className="text-blue-600 w-5 h-5" />,
    color: "from-blue-100 to-blue-200",
  },
];

// 🧠 Custom tooltip to avoid colon
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded p-2 shadow">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">CGPA {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function PerformanceAnalytics() {
  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f6f8fc] to-[#ffffff]">
      <h1 className="text-3xl font-bold text-blue-700 mb-10">
        📊 Performance Analytics
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {quickStats.map((stat) => (
          <div
            key={stat.id}
            className={`bg-gradient-to-br ${stat.color} p-5 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition`}
          >
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div className="p-2 rounded-full bg-white shadow-sm">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* ✅ Bar Chart for Semester-Wise CGPA */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          🎓 Semester-wise CGPA
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis domain={[0, 10]} stroke="#4b5563" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="CGPA"
              fill="url(#cgpaGradient)"
              radius={[10, 10, 0, 0]}
              barSize={40}
            />
            <defs>
              <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

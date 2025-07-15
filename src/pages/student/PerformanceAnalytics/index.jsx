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
import { GraduationCap, Activity, BookOpen, Star } from "lucide-react";

const chartData = [
  { name: "Jan", Score: 72 },
  { name: "Feb", Score: 78 },
  { name: "Mar", Score: 82 },
  { name: "Apr", Score: 75 },
  { name: "May", Score: 88 },
  { name: "Jun", Score: 90 },
];

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
    title: "Subjects Passed",
    value: "34",
    icon: <BookOpen className="text-blue-600 w-5 h-5" />,
    color: "from-blue-100 to-blue-200",
  },
  {
    id: 4,
    title: "Rank",
    value: "12th",
    icon: <Star className="text-yellow-500 w-5 h-5" />,
    color: "from-yellow-100 to-yellow-200",
  },
];

export default function PerformanceAnalytics() {
  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f6f8fc] to-[#ffffff]">
      <h1 className="text-3xl font-bold text-blue-700 mb-10">
        📊 Performance Analytics
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {quickStats.map((stat) => (
          <div
            key={stat.id}
            className={`bg-gradient-to-br ${stat.color} p-5 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition`}
          >
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div className="p-2 rounded-full bg-white shadow-sm">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Monthly Performance Score
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis domain={[0, 100]} stroke="#4b5563" />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
            />
            <Legend />
            <Bar
              dataKey="Score"
              fill="url(#barGradient)"
              radius={[10, 10, 0, 0]}
              barSize={40}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
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

import React from "react";
import { BarChart2, ScrollText, CalendarCheck } from "lucide-react";

const results = [
  {
    id: 1,
    subject: "Data Structures",
    score: "92",
    grade: "A+",
    color: "from-purple-200 to-purple-500",
  },
  {
    id: 2,
    subject: "DBMS",
    score: "85",
    grade: "A",
    color: "from-blue-200 to-blue-500",
  },
  {
    id: 3,
    subject: "Operating Systems",
    score: "78",
    grade: "B+",
    color: "from-yellow-200 to-yellow-500",
  },
  {
    id: 4,
    subject: "AI & ML",
    score: "94",
    grade: "A+",
    color: "from-emerald-200 to-emerald-500",
  },
];

export default function ResultPortal() {
  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f7faff] to-[#ffffff]">
      <h1 className="text-3xl font-bold text-blue-700 mb-10 flex items-center gap-2">
        <ScrollText className="text-blue-600" /> Student Result Portal
      </h1>

      {/* 🔹 Student Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <InfoCard label="Name" value="Yeswanth S" />
        <InfoCard label="Roll No" value="21CSE019" />
        <InfoCard label="Semester" value="6th" />
      </div>

      {/* 🔸 Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {results.map((result) => (
          <div
            key={result.id}
            className={`rounded-2xl p-6 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${result.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{result.subject}</h2>
              <BarChart2 className="w-5 h-5 text-gray-700" />
            </div>
            <p className="text-sm text-gray-700">Score</p>
            <h3 className="text-4xl font-extrabold text-gray-900">
              {result.score}
            </h3>
            <div className="mt-3 flex justify-between items-center text-sm">
              <span className="bg-white/50 px-3 py-1 rounded-full text-gray-700 font-medium">
                Grade: {result.grade}
              </span>
              <CalendarCheck className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎁 Small card for student details
function InfoCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
    </div>
  );
}

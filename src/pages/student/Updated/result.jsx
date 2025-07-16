import React from "react";
import { BarChart2, ScrollText, CalendarCheck } from "lucide-react";

const results = [
  {
    id: 1,
    subject: "Data Structures",
    score: "92",
    grade: "A+",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    subject: "DBMS",
    score: "85",
    grade: "A",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    subject: "Operating Systems",
    score: "78",
    grade: "B+",
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 4,
    subject: "AI & ML",
    score: "94",
    grade: "A+",
    badge: "bg-emerald-100 text-emerald-800",
  },
];

export default function ResultPortal() {
  return (
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-[#2e3a59] mb-8 flex items-center gap-2">
          <ScrollText className="text-blue-600" />
          Student Result Portal
        </h2>

        {/* Student Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <InfoCard label="Name" value="Yeswanth S" />
          <InfoCard label="Roll No" value="21CSE019" />
          <InfoCard label="Semester" value="6th" />
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-[#f9fafb] border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2e3a59]">
                  {result.subject}
                </h3>
                <BarChart2 className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500">Score</p>
              <h4 className="text-4xl font-bold text-gray-800">{result.score}</h4>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium ${result.badge}`}>
                  Grade: {result.grade}
                </span>
                <CalendarCheck className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-[#f9fafb] border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition-all">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <h4 className="text-lg font-semibold text-[#2e3a59]">{value}</h4>
    </div>
  );
}

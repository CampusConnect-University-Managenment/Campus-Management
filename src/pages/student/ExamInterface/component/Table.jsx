import React from "react";
import { Timer, BookOpen, ClipboardList, PlayCircle } from "lucide-react";

export default function PracticeExamPage() {
  return (
    <div className="ml-[19rem] pt-[7.5rem] pr-6 pl-4 pb-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Practice Exam</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Exam Details Card */}
        <div className="col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Mock Test - General Aptitude
          </h2>
          <p className="text-gray-700 mb-6">
            Prepare yourself with this mock exam designed to simulate real test
            conditions. This exam covers reasoning, verbal ability, and general
            problem-solving skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              icon={<ClipboardList />}
              label="Total Questions"
              value="40"
            />
            <StatCard icon={<BookOpen />} label="Total Marks" value="100" />
            <StatCard icon={<Timer />} label="Time Limit" value="60 mins" />
          </div>

          <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
            <PlayCircle className="w-5 h-5" />
            Start Exam
          </button>
        </div>
        {/* Sidebar Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-2">
            <li>Each question carries 2.5 marks.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Time starts when you click "Start Exam".</li>
            <li>Make sure you're in a distraction-free environment.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-2">
            <li>Each question carries 2.5 marks.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Time starts when you click "Start Exam".</li>
            <li>Make sure you're in a distraction-free environment.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-2">
            <li>Each question carries 2.5 marks.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Time starts when you click "Start Exam".</li>
            <li>Make sure you're in a distraction-free environment.</li>
          </ul>
        </div>{" "}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-2">
            <li>Each question carries 2.5 marks.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Time starts when you click "Start Exam".</li>
            <li>Make sure you're in a distraction-free environment.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-2">
            <li>Each question carries 2.5 marks.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Time starts when you click "Start Exam".</li>
            <li>Make sure you're in a distraction-free environment.</li>
          </ul>
        </div>{" "}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ul className="list-disc text-sm text-gray-600 pl-5 space-y-2">
            <li>Each question carries 2.5 marks.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Time starts when you click "Start Exam".</li>
            <li>Make sure you're in a distraction-free environment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div className="p-2 bg-white rounded-full shadow">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h4 className="text-lg font-bold text-gray-800">{value}</h4>
      </div>
    </div>
  );
}

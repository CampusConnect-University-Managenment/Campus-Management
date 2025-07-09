import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Student() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl shadow-xl bg-white">
        <h1 className="text-3xl font-extrabold text-gray-700 mb-4">👩‍🎓 Student Page</h1>
        
        <button
          onClick={() => navigate('/profile')}
          className="w-64 px-6 py-3 text-lg font-medium text-gray-800 bg-gray-100 rounded-xl border border-gray-300 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md active:scale-95"
        >
          👤 Profile
        </button>

        <button
          onClick={() => navigate('/calendar')}
          className="w-64 px-6 py-3 text-lg font-medium text-gray-800 bg-gray-100 rounded-xl border border-gray-300 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md active:scale-95"
        >
          📅 Calendar
        </button>

        <button
          onClick={() => navigate('/course-enrollment')}
          className="w-64 px-6 py-3 text-lg font-medium text-gray-800 bg-gray-100 rounded-xl border border-gray-300 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md active:scale-95"
        >
          📝 Course Enrollment
        </button>

        <button
          onClick={() => navigate('/student-dashboard')}
          className="w-64 px-6 py-3 text-lg font-medium text-gray-800 bg-gray-100 rounded-xl border border-gray-300 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md active:scale-95"
        >
          🖥️ Student Dashboard
        </button>
      </div>
    </div>
  );
}

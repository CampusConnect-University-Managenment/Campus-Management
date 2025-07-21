import React from "react";

export default function FacultyProfile() {
  const user = {
    name: "Vishwanathan S",
    email: "vishwanathan@example.com",
    role: "Faculty",
    joined: "Jan 15, 2024",
    department: "Computer Science",
    avatar: "https://via.placeholder.com/100", // replace with actual image if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8 border-b pb-6">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">{user.role}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
          <div>
            <h2 className="text-gray-500 font-semibold text-sm mb-1">Department</h2>
            <p className="font-medium">{user.department}</p>
          </div>

          <div>
            <h2 className="text-gray-500 font-semibold text-sm mb-1">Joined On</h2>
            <p className="font-medium">{user.joined}</p>
          </div>

          <div>
            <h2 className="text-gray-500 font-semibold text-sm mb-1">Email</h2>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <h2 className="text-gray-500 font-semibold text-sm mb-1">Role</h2>
            <p className="font-medium">{user.role}</p>
          </div>
        </div>

        {/* Buttons (Optional) */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full shadow hover:bg-gray-200 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
//profile.jsx
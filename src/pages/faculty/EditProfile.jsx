// src/pages/faculty/EditProfile.jsx
import React from "react";

const EditProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              placeholder="Enter department"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              placeholder="e.g., M.Tech in Computer Science"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Office Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Office Location</label>
            <input
              type="text"
              placeholder="e.g., Room 214, CSE Block"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="number"
              placeholder="Years of experience"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Subjects Taught */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subjects Taught</label>
            <textarea
              placeholder="List the subjects you teach (e.g., Data Structures, OS)"
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

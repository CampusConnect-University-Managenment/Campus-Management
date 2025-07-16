import React from "react";

const StudentPlacement = ({ student, onClose }) => {
  if (!student || !student.placement) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">🎯 Placement Details</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>
        <div className="text-gray-700 space-y-2 text-sm">
          <p><strong>Company:</strong> {student.placement.company}</p>
          <p><strong>Package:</strong> {student.placement.package}</p>
          <p><strong>Date of Placement:</strong> {student.placement.date}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentPlacement;

import React, { useEffect, useState } from "react";

const StudentProfile = ({ student, onClose, onEdit, onDelete }) => {
  const [currentStudent, setCurrentStudent] = useState(student);

  // Update local state when student prop changes
  useEffect(() => {
    setCurrentStudent(student);
  }, [student]);

  if (!currentStudent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black bg-opacity-40 py-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Profile Body */}
        <div className="px-6 py-4 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <img
              src={currentStudent.photo || "/default-avatar.png"}
              alt={currentStudent.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{currentStudent.name || 'N/A'}</h3>
              <p className="text-gray-500">{currentStudent.email || 'N/A'}</p>
              <p className="text-sm text-gray-500">{currentStudent.contact || 'N/A'}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong>Reg No:</strong> {currentStudent.regNo || 'N/A'}</div>
            <div><strong>Batch:</strong> {currentStudent.batch || 'N/A'}</div>
            <div><strong>Section:</strong> {currentStudent.section || 'N/A'}</div>
            <div><strong>Department:</strong> {currentStudent.department || 'N/A'}</div>
            <div><strong>Semester:</strong> {currentStudent.sem || 'N/A'}</div>
            <div><strong>Year:</strong> {currentStudent.year || 'N/A'}</div>
            <div><strong>DOB:</strong> {currentStudent.dob || 'N/A'}</div>
            <div><strong>Gender:</strong> {currentStudent.gender || 'N/A'}</div>
            <div><strong>Blood Group:</strong> {currentStudent.bloodGroup || 'N/A'}</div>
            <div><strong>Contact:</strong> {currentStudent.contact || 'N/A'}</div>
            <div><strong>Email:</strong> {currentStudent.email || 'N/A'}</div>
            <div><strong>Address:</strong> {currentStudent.address || 'N/A'}</div>
            <div><strong>Adhar:</strong> {currentStudent.adhar || 'N/A'}</div>
            <div><strong>10th Mark:</strong> {currentStudent.tenthMark || 'N/A'}</div>
            <div><strong>12th Mark:</strong> {currentStudent.twelfthMark || currentStudent.diplomaMark || 'N/A'}</div>
            <div><strong>Quota:</strong> {currentStudent.quota || 'N/A'}</div>
            <div><strong>Total Credits:</strong> {currentStudent.totalCredits || 'N/A'}</div>
            <div><strong>Parent Name:</strong> {currentStudent.parentName || 'N/A'}</div>
            <div><strong>Parent Contact:</strong> {currentStudent.parentPhoneNo || 'N/A'}</div>
            <div><strong>CGPA:</strong> {currentStudent.cgpa || 'N/A'}</div>
            <div><strong>Attendance:</strong> {currentStudent.attendance || 'N/A'}</div>
            <div className="col-span-2">
              <strong>Bio:</strong><br />{currentStudent.bio || 'N/A'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => onEdit(currentStudent)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            Manage
          </button>
          <button
            onClick={() => onDelete(currentStudent.regNo)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

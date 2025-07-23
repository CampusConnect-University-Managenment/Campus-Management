import React from "react";

const StudentProfile = ({ student, onClose, onEdit, onDelete }) => {

  if (!student) return null;

  return (
   <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black bg-opacity-40 py-10">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <img
              src={student.photo || "/default-avatar.png"}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
              <p className="text-gray-500">{student.mail}</p>
              <p className="text-sm text-gray-500">{student.phone}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong>Reg No:</strong> {student.regNo}</div>
            <div><strong>Batch:</strong> {student.batch}</div>
            <div><strong>Section:</strong> {student.section}</div>
            <div><strong>Department:</strong> {student.dept}</div>
            <div><strong>Semester:</strong> {student.sem}</div>
            <div><strong>Year:</strong> {student.year}</div>
            <div><strong>DOB:</strong> {student.dob}</div>
            <div><strong>Gender:</strong> {student.gender}</div>
            <div><strong>Blood Group:</strong> {student.bloodGroup}</div>
            <div><strong>Contact:</strong> {student.contact}</div>
            <div><strong>Email:</strong> {student.mail}</div>
            <div><strong>Address:</strong> {student.address}</div>
            <div><strong>Adhar:</strong> {student.adhar}</div>
            <div><strong>10th Mark:</strong> {student.tenthMark}</div>
            <div><strong>12th Mark:</strong> {student.twelfthMark}</div>
            <div><strong>Quota:</strong> {student.quota}</div>
            <div><strong>Total Credits:</strong> {student.totalCredits}</div>
            <div><strong>Parent Name:</strong> {student.parentName}</div>
            <div><strong>Parent Contact:</strong> {student.parentPhoneNo}</div>
            <div><strong>CGPA:</strong> {student.cgpa}</div>
            <div><strong>Attendance:</strong> {student.attendance}</div>
            <div className="col-span-2">
              <strong>Bio:</strong> <br />{student.bio}
            </div>
          </div>
        </div>

       <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
  <button
    onClick={() => onEdit(student)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
  >
    Manage
  </button>
  <button
    onClick={() => onDelete(student.regNo)}
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

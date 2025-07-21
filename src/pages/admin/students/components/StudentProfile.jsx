import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentProfile = ({ student, onClose, onEdit, onDelete }) => {
  if (!student) return null;

  const getCgpaColor = (cgpa) => {
    if (cgpa >= 9) return "bg-green-100 text-green-800";
    if (cgpa >= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const attendance = parseFloat(student.attendance ?? 0);

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Profile Picture and Basic Info */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
            <p className="text-gray-600">{student.phone}</p>
          </div>
        </div>

        {/* Student Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div><strong>ID:</strong> {student.id}</div>
          <div><strong>Department:</strong> {student.department}</div>
          <div><strong>Degree:</strong> {student.degree}</div>
          <div><strong>Year:</strong> {student.year}</div>
          <div><strong>Semester:</strong> {student.semester}</div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs ${
                student.placement
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {student.placement ? "Placed" : "Active"}
            </span>
          </div>
          <div>
            <strong>CGPA:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs ${getCgpaColor(
                student.cgpa || 0
              )}`}
            >
              {student.cgpa ?? "N/A"}
            </span>
          </div>
          <div>
            <strong>Attendance:</strong>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-1 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getAttendanceColor(
                  attendance
                )}`}
                style={{ width: `${attendance}%` }}
              ></div>
            </div>
            <div className="text-xs text-right mt-1">{attendance}%</div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="border-t pt-4 text-gray-700 mb-6">
          <h3 className="font-semibold mb-2">Bio Data</h3>
          <p>{student.bio}</p>
        </div>

        {/* Placement Details */}
        {student.placement && (
          <div className="border-t pt-4 text-gray-700 mb-6">
            <h3 className="font-semibold mb-2">Placement Details</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Company:</strong> {student.placement.company}</li>
              <li><strong>Location:</strong> {student.placement.location}</li>
              <li><strong>Position:</strong> {student.placement.position}</li>
              <li><strong>Package:</strong> ₹{student.placement.package} LPA</li>
              <li><strong>Date:</strong> {student.placement.date}</li>
              {student.placement.proof && (
                <li>
                  <strong>Proof:</strong>{" "}
                  <a
                    href={student.placement.proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Edit / Delete Actions */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

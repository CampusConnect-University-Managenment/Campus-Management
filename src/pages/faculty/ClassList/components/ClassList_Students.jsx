import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ClassList_Students() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: classDetails } = location;

  if (!classDetails) {
    return (
      <div className="p-6 font-sans">
        <h1 className="text-2xl text-left font-semibold text-black py-6 mt-16">
          No class details found.
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Hardcoded student data. In a real application, you would fetch this from an API.
  const allStudents = [
    { id: 1, name: 'Alice Smith', batch: 'III-CSE A' },
    { id: 2, name: 'Bob Johnson', batch: 'III-CSE A' },
    { id: 3, name: 'Charlie Brown', batch: 'III-CSE B' },
    { id: 4, name: 'David Wilson', batch: 'III-CSE B' },
    { id: 5, name: 'Eva Green', batch: 'IV-CSE A' },
    { id: 6, name: 'Frank White', batch: 'IV-CSE A' },
    { id: 7, name: 'Grace Taylor', batch: 'III-CSE A' },
    { id: 8, name: 'Henry Martin', batch: 'III-CSE C' },
    { id: 9, name: 'Ivy Davis', batch: 'IV-CSE C' },
  ];

  // Filter students based on the batch received from the previous component
  const studentsInClass = allStudents.filter(
    (student) => student.batch === classDetails.batch
  );

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl text-left font-semibold text-black py-6 mt-16">
         {classDetails.code} / {classDetails.subject} ({classDetails.batch})
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-6 py-3">S.No</th>
              <th className="border px-6 py-3">Student ID</th>
              <th className="border px-6 py-3">Student Name</th>
              <th className="border px-6 py-3">Batch</th>
            </tr>
          </thead>
          <tbody>
            {studentsInClass.length > 0 ? (
              studentsInClass.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border px-6 py-4">{index + 1}</td>
                  <td className="border px-6 py-4">{student.id}</td>
                  <td className="border px-6 py-4">{student.name}</td>
                  <td className="border px-6 py-4">{student.batch}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-6 py-4 text-center text-gray-500">
                  No students found for this class.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-6"
      >
        Go Back
      </button>
    </div>
  );
}

export default ClassList_Students;
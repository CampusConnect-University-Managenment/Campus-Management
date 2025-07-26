import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ClassList_Students() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: classDetails } = location;

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // You can adjust this number

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
  // UPDATED: Added attendancePercent and internalMark
  const allStudents = [
    { id: '717823p101', name: 'Alice Smith', batch: 'III-CSE A', attendancePercent: 85, internalMark: 42 },
    { id: '717823p102', name: 'Bob Johnson', batch: 'III-CSE A', attendancePercent: 92, internalMark: 48 },
    { id: '717823p103', name: 'Charlie Brown', batch: 'III-CSE A', attendancePercent: 78, internalMark: 35 },
    { id: '717823p104', name: 'David Wilson', batch: 'III-CSE A', attendancePercent: 95, internalMark: 49 },
    { id: '717823p105', name: 'Eva Green', batch: 'III-CSE A', attendancePercent: 88, internalMark: 40 },
    { id: '717823p106', name: 'Frank White', batch: 'III-CSE A', attendancePercent: 70, internalMark: 30 },
    { id: '717823p107', name: 'Grace Taylor', batch: 'III-CSE A', attendancePercent: 90, internalMark: 45 },
    { id: '717823p108', name: 'Henry Martin', batch: 'III-CSE A', attendancePercent: 82, internalMark: 38 },
    { id: '717823p109', name: 'Ivy Davis', batch: 'III-CSE A', attendancePercent: 91, internalMark: 47 },
    { id: '717823p110', name: 'Jack Miller', batch: 'III-CSE A', attendancePercent: 75, internalMark: 33 },
    { id: '717823p111', name: 'Karen Davis', batch: 'III-CSE A', attendancePercent: 93, internalMark: 46 },
    { id: '717823p112', name: 'Liam Wilson', batch: 'III-CSE A', attendancePercent: 80, internalMark: 39 },
    { id: '717823p201', name: 'Mia Johnson', batch: 'III-CSE B', attendancePercent: 87, internalMark: 41 },
    { id: '717823p202', name: 'Noah Brown', batch: 'III-CSE B', attendancePercent: 79, internalMark: 36 },
    { id: '717823p203', name: 'Olivia Smith', batch: 'III-CSE B', attendancePercent: 94, internalMark: 49 },
    { id: '717823p204', name: 'Peter Jones', batch: 'III-CSE B', attendancePercent: 83, internalMark: 40 },
    { id: '717823p205', name: 'Quinn Taylor', batch: 'III-CSE B', attendancePercent: 72, internalMark: 32 },
    { id: '717823p301', name: 'Rachel Green', batch: 'III-CSE C', attendancePercent: 89, internalMark: 43 },
    { id: '717823p302', name: 'Sam White', batch: 'III-CSE C', attendancePercent: 76, internalMark: 34 },
    { id: '717822p101', name: 'Tina Black', batch: 'IV-CSE A', attendancePercent: 96, internalMark: 50 },
    { id: '717822p102', name: 'Uma Thurman', batch: 'IV-CSE A', attendancePercent: 81, internalMark: 37 },
    { id: '717822p301', name: 'Victor Stone', batch: 'IV-CSE C', attendancePercent: 90, internalMark: 44 },
  ];

  // Filter students based on the batch received from the previous component
  const studentsInClass = allStudents.filter(
    (student) => student.batch === classDetails.batch
  );

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentsInClass.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(studentsInClass.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl text-left font-semibold text-black py-6 mt-16">
        Students for {classDetails.code} / {classDetails.subject} ({classDetails.batch})
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-6 py-3">S.No</th>
              <th className="border px-6 py-3">Student ID</th>
              <th className="border px-6 py-3">Student Name</th>
              <th className="border px-6 py-3">Batch</th>
              <th className="border px-6 py-3">Attendance (%)</th> {/* NEW HEADER */}
              <th className="border px-6 py-3">Internal Mark</th>   {/* NEW HEADER */}
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border px-6 py-4">{indexOfFirstStudent + index + 1}</td>
                  <td className="border px-6 py-4">{student.id}</td>
                  <td className="border px-6 py-4">{student.name}</td>
                  <td className="border px-6 py-4">{student.batch}</td>
                  <td className="border px-6 py-4">{student.attendancePercent}%</td> {/* NEW DATA CELL */}
                  <td className="border px-6 py-4">{student.internalMark}</td>   {/* NEW DATA CELL */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border px-6 py-4 text-center text-gray-500"> {/* Updated colspan */}
                  No students found for this class.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="flex justify-center items-center space-x-2 mt-8" aria-label="Pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  pageNumber === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      )}

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
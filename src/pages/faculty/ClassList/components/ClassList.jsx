import React from 'react';
import { useNavigate } from 'react-router-dom';

function ClassList() {
  const navigate = useNavigate();
  const facultyName = "Dr. R. Ichshanackiyan";

  const semesterClasses = [
    { code: '21CS31', subject: 'Data Structures', batch: 'III-CSE A', room: '101' },
    { code: '21CS32', subject: 'Data Structures', batch: 'III-CSE B', room: '102' },
    { code: '21CS41', subject: 'Computer Networks', batch: 'III-CSE A', room: '103' },
    { code: '21CS42', subject: 'Operating Systems', batch: 'III-CSE B', room: '104' },
    { code: '21CS51', subject: 'Java Programming', batch: 'IV-CSE A', room: '105' },
    { code: '21CS33', subject: 'Data Structures', batch: 'III-CSE C', room: '106' },
    { code: '21CS61', subject: 'Machine Learning Techniques', batch: 'IV-CSE C', room: '107' },
  ];

  const uniqueClasses = semesterClasses.filter((value, index, self) =>
    index === self.findIndex(
      (t) => t.code === value.code && t.batch === value.batch
    )
  );

  const handleNavigate = (cls) => {
    // UPDATED path to match your routes.jsx structure
    navigate('/faculty/students', { state: cls });
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl text-left font-semibold text-black py-6 mt-16">
        {facultyName}
      </h1>

      {/* Class List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-6 py-3">S.No</th>
              <th className="border px-6 py-3">Course Code & Name</th>
              <th className="border px-6 py-3">Batch (Year - Dept - Section)</th>
              <th className="border px-6 py-3">View Students</th>
            </tr>
          </thead>
          <tbody>
            {uniqueClasses.map((cls, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-6 py-4">{index + 1}</td>
                <td className="border px-6 py-4">{cls.code} / {cls.subject}</td>
                <td className="border px-6 py-4">{cls.batch}</td>
                <td className="border px-6 py-4">
                  <button
                    onClick={() => handleNavigate(cls)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassList;
import React from 'react';

import { useNavigate } from 'react-router-dom';

function ClassList() {
  const navigate = useNavigate();
  const facultyName = "Dr. R. Ichshanackiyan";

  // Sample timetable data
  const timetable = {
    Monday: ['CSE A - Math', 'CSE B - Physics', null, null, 'CSE A - DSA', null],
    Tuesday: [null, 'CSE A - English', 'CSE B - Math', null, null, 'CSE A - Chemistry'],
    Wednesday: ['CSE B - DSA', null, null, 'CSE A - Physics', null, 'CSE B - English'],
    Thursday: ['CSE A - Math', null, 'CSE B - Chemistry', 'CSE A - DSA', null, null],
    Friday: [null, 'CSE B - Math', null, null, 'CSE A - English', 'CSE B - Physics'],
  };

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

  const handleNavigate = (path, cls) => {
    navigate(path, { state: cls });
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl text-left font-semibold text-black py-6 mt-16">
        {facultyName}
      </h1>

      {/* Weekly Timetable */}
      <div className="overflow-x-auto mb-12">
        <h4 className="text-xl font-semibold mb-4">Weekly Timetable</h4>
        <table className="min-w-full border border-gray-300 text-sm text-center shadow bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-6 py-3">Day / Hour</th>
              {[...Array(6)].map((_, i) => (
                <th key={i} className="border px-6 py-3">
                  Hour {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetable).map(([day, hours]) => (
              <tr key={day} className="hover:bg-gray-50">
                <td className="border px-6 py-3 font-medium text-left">{day}</td>
                {hours.map((slot, i) => (
                  <td key={i} className="border px-6 py-3 text-left">
                    {slot || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Class List Table */}
      <div className="overflow-x-auto">
        <h4 className="text-xl font-semibold mb-4">Class List for Current Semester</h4>
        <table className="min-w-full bg-white border border-gray-300 shadow text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-6 py-3">S.No</th>
              <th className="border px-6 py-3">Course Code & Name</th>
              <th className="border px-6 py-3">Batch (Year - Dept - Section)</th>
              <th className="border px-6 py-3">Room</th>
              <th className="border px-6 py-3">Attendance</th>
              <th className="border px-6 py-3">View Students</th>
              <th className="border px-6 py-3">Study Material</th>
              <th className="border px-6 py-3">Question Paper</th>
              <th className="border px-6 py-3">Marks Upload</th>
            </tr>
          </thead>
          <tbody>
            {uniqueClasses.map((cls, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-6 py-4">{index + 1}</td>
                <td className="border px-6 py-4">{cls.code} / {cls.subject}</td>
                <td className="border px-6 py-4">{cls.batch}</td>
                <td className="border px-6 py-4">{cls.room}</td>

                <td className="border px-6 py-4">
                  <button
                    onClick={() => handleNavigate('/upload-attendance', cls)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Upload
                  </button>
                </td>

                <td className="border px-6 py-4">
                  <button
                    onClick={() => handleNavigate('/students', cls)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>

                <td className="border px-6 py-4">
                  <button
                    onClick={() => handleNavigate('/faculty/ExamInterFace/upload-material', cls)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Upload
                  </button>
                </td>

                <td className="border px-6 py-4">
                  <button
                    onClick={() => handleNavigate('/faculty/ExamInterFace/upload-question', cls)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Upload
                  </button>
                </td>

                <td className="border px-6 py-4">
                  <button
                    onClick={() => handleNavigate('/faculty/ExamInterFace/upload-marks', cls)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Upload
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

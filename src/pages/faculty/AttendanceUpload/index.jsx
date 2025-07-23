import React, { useState } from 'react';

const AttendanceManager = () => {
  // State to store student data
  const [students, setStudents] = useState([
    { sNo: 1, rollNo: 'CS001', name: 'Alice', dept: 'CS', sec: 'A', year: '2025', course: 'Data Structures', attendanceHistory: {} },
    { sNo: 2, rollNo: 'CS002', name: 'Bob', dept: 'CS', sec: 'B', year: '2025', course: 'Algorithms', attendanceHistory: {} },
    { sNo: 3, rollNo: 'EC001', name: 'Charlie', dept: 'EC', sec: 'A', year: '2024', course: 'Digital Electronics', attendanceHistory: {} },
    { sNo: 4, rollNo: 'ME001', name: 'David', dept: 'ME', sec: 'A', year: '2026', course: 'Thermodynamics', attendanceHistory: {} },
    { sNo: 5, rollNo: 'CS003', name: 'Eve', dept: 'CS', sec: 'A', year: '2025', course: 'Data Structures', attendanceHistory: {} },
    { sNo: 6, rollNo: 'CS004', name: 'Frank', dept: 'CS', sec: 'A', year: '2025', course: 'Algorithms', attendanceHistory: {} },
  ]);

  // State for current attendance entry
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentHourSlot, setCurrentHourSlot] = useState(1); // Default to Hour 1

  // State for filters, now including course
  const [filterDept, setFilterDept] = useState('');
  const [filterSec, setFilterSec] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  // History table pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page for hour columns
  const hoursPerPage = 10; // Number of hour columns per page
  const totalHours = 60; // Total hours for the course

  // Get unique filter options for dropdowns
  const uniqueDepartments = [...new Set(students.map(s => s.dept))];
  const uniqueSections = [...new Set(students.map(s => s.sec))];
  const uniqueYears = [...new Set(students.map(s => s.year))];
  const uniqueCourses = [...new Set(students.map(s => s.course))];

  // Function to handle attendance marking
  const handleMarkAttendance = (rollNo, status) => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.rollNo === rollNo) {
          const newAttendanceHistory = { ...student.attendanceHistory };
          if (!newAttendanceHistory[currentDate]) {
            newAttendanceHistory[currentDate] = {};
          }
          newAttendanceHistory[currentDate][currentHourSlot] = status;
          return { ...student, attendanceHistory: newAttendanceHistory };
        }
        return student;
      })
    );
  };

  // Function to calculate total attended hours for a student
  const calculateTotalHours = (student) => {
    let totalHoursCount = 0;
    for (const date in student.attendanceHistory) {
      for (const hourSlot in student.attendanceHistory[date]) {
        // Count 'Present' and 'OD' as attended hours
        if (student.attendanceHistory[date][hourSlot] === 'Present' || student.attendanceHistory[date][hourSlot] === 'OD') {
          totalHoursCount += 1;
        }
      }
    }
    return totalHoursCount;
  };

  // Filtered students based on selected filters
  const filteredStudents = students.filter(student => {
    return (
      filterDept !== '' && student.dept === filterDept &&
      filterSec !== '' && student.sec === filterSec &&
      filterYear !== '' && student.year === filterYear &&
      filterCourse !== '' && student.course === filterCourse
    );
  });

  // Check if all four filters have been selected
  const areAllFiltersSelected = filterDept !== '' && filterSec !== '' && filterYear !== '' && filterCourse !== '';

  // Calculate pages for hour columns
  const totalHourPages = Math.ceil(totalHours / hoursPerPage);
  const indexOfLastHour = currentPage * hoursPerPage;
  const indexOfFirstHour = indexOfLastHour - hoursPerPage;
  const currentHourColumns = Array.from({ length: hoursPerPage }, (_, i) => indexOfFirstHour + 1 + i)
                               .filter(hour => hour <= totalHours);

  // Functions for pagination navigation
  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalHourPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans antialiased mt-20">
      <header className="bg-white shadow-md py-3 mb-6 sticky top-0 z-20">
        <h1 className="text-3xl font-extrabold text-center text-blue-800">Campus Attendance Manager 🎓</h1>
      </header>

      <main className="container mx-auto px-4">
        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Set Current Date & Hour Slot <span role="img" aria-label="calendar">🗓️</span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="date" className="font-semibold text-gray-700 text-base">Date:</label>
              <input
                type="date"
                id="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="hourSlot" className="font-semibold text-gray-700 text-base">Hour Slot:</label>
              <input
                type="number"
                id="hourSlot"
                value={currentHourSlot}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 1 && value <= totalHours) {
                    setCurrentHourSlot(value);
                  } else if (e.target.value === '') {
                    setCurrentHourSlot('');
                  }
                }}
                min="1"
                max={totalHours}
                className="p-2 border border-gray-300 rounded-lg w-20 text-center text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <span className="text-gray-600 text-base"> (1-{totalHours})</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Filter Students by Class & Course <span role="img" aria-label="magnifying glass">🔍</span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="filterDept" className="font-semibold text-gray-700 text-base">Department:</label>
              <select
                id="filterDept"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Department</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="filterSec" className="font-semibold text-gray-700 text-base">Section:</label>
              <select
                id="filterSec"
                value={filterSec}
                onChange={(e) => setFilterSec(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Section</option>
                {uniqueSections.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="filterYear" className="font-semibold text-gray-700 text-base">Year:</label>
              <select
                id="filterYear"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Year</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="filterCourse" className="font-semibold text-gray-700 text-base">Course:</label>
              <select
                id="filterCourse"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Course</option>
                {uniqueCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Student Attendance Table <span role="img" aria-label="student">🧑‍🎓</span>
          </h2>
          {areAllFiltersSelected ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">S.No</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Roll No</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Dept</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Sec</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Course</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status (Date: {currentDate} - Hour: {currentHourSlot})</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Action</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Total Hours Attended</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.sNo} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.sNo}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.dept}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.sec}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.year}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <span className={`font-semibold ${
                            student.attendanceHistory[currentDate]?.[currentHourSlot] === 'Present' ? 'text-green-600' :
                            student.attendanceHistory[currentDate]?.[currentHourSlot] === 'Absent' ? 'text-red-600' :
                            student.attendanceHistory[currentDate]?.[currentHourSlot] === 'OD' ? 'text-blue-600' :
                            'text-gray-500'
                          }`}>
                            {student.attendanceHistory[currentDate]?.[currentHourSlot] || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleMarkAttendance(student.rollNo, 'Present')}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(student.rollNo, 'Absent')}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-2"
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(student.rollNo, 'OD')}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            OD
                          </button>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-bold">
                          {calculateTotalHours(student)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="px-4 py-2 text-center text-gray-500">
                        No students found for the selected criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-48 bg-blue-50 rounded-lg shadow-md mb-6 border border-blue-200">
              <p className="text-lg text-blue-700 font-semibold text-center p-4">
                Please select Department, Section, Year, and Course to view students. 🧐
              </p>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Detailed Attendance History <span role="img" aria-label="scroll">📜</span>
          </h2>
          {areAllFiltersSelected ? (
            <div className="overflow-x-auto">
              {filteredStudents.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4 p-3 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition duration-200 ease-in-out ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
                    >
                      <span role="img" aria-label="arrow left">⬅️</span> Previous {hoursPerPage} Hours
                    </button>
                    <span className="font-semibold text-blue-700 text-base">
                      Hours {indexOfFirstHour + 1} - {Math.min(indexOfLastHour, totalHours)} of {totalHours}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalHourPages}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition duration-200 ease-in-out ${currentPage === totalHourPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
                    >
                      Next {hoursPerPage} Hours <span role="img" aria-label="arrow right">➡️</span>
                    </button>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200 border border-blue-100 rounded-lg">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sticky left-0 bg-blue-50 z-10 shadow-sm rounded-tl-lg">S.No</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sticky left-12 bg-blue-50 z-10 shadow-sm">Roll No</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sticky left-28 bg-blue-50 z-10 shadow-sm">Student Name</th>
                        {currentHourColumns.map(hour => (
                          <th key={hour} className="px-4 py-2 text-center text-xs font-medium text-blue-700 uppercase tracking-wider border-l border-gray-200">
                            Hour {hour}
                          </th>
                        ))}
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-l border-gray-200 rounded-tr-lg">Total Hours</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr key={student.sNo} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">{student.sNo}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 sticky left-12 bg-white z-10 border-r border-gray-200">{student.rollNo}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium sticky left-28 bg-white z-10 border-r border-gray-200">{student.name}</td>
                          {currentHourColumns.map(hour => {
                            let statusForHour = '-';

                            for (const date in student.attendanceHistory) {
                              if (student.attendanceHistory[date][hour]) {
                                statusForHour = student.attendanceHistory[date][hour];
                                break;
                              }
                            }

                            let statusClass = '';
                            if (statusForHour === 'Present') {
                              statusClass = 'text-green-600';
                            } else if (statusForHour === 'Absent') {
                              statusClass = 'text-red-600';
                            } else if (statusForHour === 'OD') {
                              statusClass = 'text-blue-600';
                            }

                            return (
                              <td key={`${student.sNo}-${hour}`} className={`px-4 py-2 whitespace-nowrap text-center text-sm font-semibold ${statusClass} border-l border-gray-200`}>
                                {statusForHour}
                              </td>
                            );
                          })}
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-bold border-l border-gray-200">
                            {calculateTotalHours(student)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-sm text-gray-600 text-center">
                    <span className="font-semibold text-green-600">P</span> = Present, <span className="font-semibold text-red-600">A</span> = Absent, <span className="font-semibold text-blue-600">OD</span> = On Duty (Counts as Present), <span className="font-semibold text-gray-500">-</span> = Not Marked/No Data.
                  </p>
                </>
              ) : (
                <p className="text-lg text-gray-500 text-center p-4">No students to display history for with the selected filters.</p>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-32 bg-blue-50 rounded-lg shadow-md mt-8 border border-blue-200">
              <p className="text-lg text-blue-700 font-semibold text-center p-4">
                Select class filters above to view attendance history. 🧐
              </p>
            </div>
          )}
        </section>
      </main>
      <footer className="mt-6 py-3 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} Campus Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default AttendanceManager;
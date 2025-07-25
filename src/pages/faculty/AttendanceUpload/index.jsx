import React, { useState } from "react";

const AttendanceManager = () => {
  // State to store student data
  const [students, setStudents] = useState([
    {
      sNo: 1,
      rollNo: "CS001",
      name: "Alice",
      dept: "CS",
      sec: "A",
      year: "2025",
      course: "Data Structures",
      attendanceHistory: {},
    },
    {
      sNo: 2,
      rollNo: "CS002",
      name: "Bob",
      dept: "CS",
      sec: "B",
      year: "2025",
      course: "Algorithms",
      attendanceHistory: {},
    },
    {
      sNo: 3,
      rollNo: "EC001",
      name: "Charlie",
      dept: "EC",
      sec: "A",
      year: "2024",
      course: "Digital Electronics",
      attendanceHistory: {},
    },
    {
      sNo: 4,
      rollNo: "ME001",
      name: "David",
      dept: "ME",
      sec: "A",
      year: "2026",
      course: "Thermodynamics",
      attendanceHistory: {},
    },
    {
      sNo: 5,
      rollNo: "CS003",
      name: "Eve",
      dept: "CS",
      sec: "A",
      year: "2025",
      course: "Data Structures",
      attendanceHistory: {},
    },
    {
      sNo: 6,
      rollNo: "CS004",
      name: "Frank",
      dept: "CS",
      sec: "A",
      year: "2025",
      course: "Algorithms",
      attendanceHistory: {},
    },
  ]);

  // State for current attendance entry
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentHourSlot, setCurrentHourSlot] = useState(1); // Default to Hour 1

  // State for filters, now including course
  const [filterDept, setFilterDept] = useState("");
  const [filterSec, setFilterSec] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  // History table pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page for hour columns
  const hoursPerPage = 10; // Number of hour columns per page
  const totalHours = 60; // Total hours for the course

  // Get unique filter options for dropdowns
  const uniqueDepartments = [...new Set(students.map((s) => s.dept))];
  const uniqueSections = [...new Set(students.map((s) => s.sec))];
  const uniqueYears = [...new Set(students.map((s) => s.year))];
  const uniqueCourses = [...new Set(students.map((s) => s.course))];

  // Function to handle attendance marking
  const handleMarkAttendance = (rollNo, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
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
        if (
          student.attendanceHistory[date][hourSlot] === "Present" ||
          student.attendanceHistory[date][hourSlot] === "OD"
        ) {
          totalHoursCount += 1;
        }
      }
    }
    return totalHoursCount;
  };

  // Filtered students based on selected filters
  const filteredStudents = students.filter((student) => {
    return (
      filterDept !== "" &&
      student.dept === filterDept &&
      filterSec !== "" &&
      student.sec === filterSec &&
      filterYear !== "" &&
      student.year === filterYear &&
      filterCourse !== "" &&
      student.course === filterCourse
    );
  });

  // Check if all four filters have been selected
  const areAllFiltersSelected =
    filterDept !== "" &&
    filterSec !== "" &&
    filterYear !== "" &&
    filterCourse !== "";

  // Calculate pages for hour columns
  const totalHourPages = Math.ceil(totalHours / hoursPerPage);
  const indexOfLastHour = currentPage * hoursPerPage;
  const indexOfFirstHour = indexOfLastHour - hoursPerPage;
  const currentHourColumns = Array.from(
    { length: hoursPerPage },
    (_, i) => indexOfFirstHour + 1 + i
  ).filter((hour) => hour <= totalHours);

  // Functions for pagination navigation
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalHourPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans antialiased mt-20">
      <header className="bg-white shadow-md py-3 mb-6 sticky top-0 z-20">
        <h1 className="text-3xl font-extrabold text-center text-blue-800">
          Campus Attendance Manager 🎓
        </h1>
      </header>

      <main className="container mx-auto px-4">
        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Set Current Date & Hour Slot{" "}
            <span role="img" aria-label="calendar">
              🗓️
            </span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="date"
                className="font-semibold text-gray-700 text-base"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="hourSlot"
                className="font-semibold text-gray-700 text-base"
              >
                Hour Slot:
              </label>
              <input
                type="number"
                id="hourSlot"
                value={currentHourSlot}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 1 && value <= totalHours) {
                    setCurrentHourSlot(value);
                  } else if (e.target.value === "") {
                    setCurrentHourSlot("");
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
            Filter Students by Class & Course{" "}
            <span role="img" aria-label="magnifying glass">
              🔍
            </span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="filterDept"
                className="font-semibold text-gray-700 text-base"
              >
                Department:
              </label>
              <select
                id="filterDept"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Department</option>
                {uniqueDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="filterSec"
                className="font-semibold text-gray-700 text-base"
              >
                Section:
              </label>
              <select
                id="filterSec"
                value={filterSec}
                onChange={(e) => setFilterSec(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Section</option>
                {uniqueSections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="filterYear"
                className="font-semibold text-gray-700 text-base"
              >
                Year:
              </label>
              <select
                id="filterYear"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Year</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="filterCourse"
                className="font-semibold text-gray-700 text-base"
              >
                Course:
              </label>
              <select
                id="filterCourse"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
              >
                <option value="">Select Course</option>
                {uniqueCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Student Attendance Table{" "}
            <span role="img" aria-label="student">
              🧑‍🎓
            </span>
          </h2>
          {areAllFiltersSelected ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Dept
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Sec
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Status (Date: {currentDate} - Hour: {currentHourSlot})
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Total Hours Attended
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student.sNo}
                        className="hover:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.sNo}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.dept}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.sec}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.year}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {student.course}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <span
                            className={`font-semibold ${
                              student.attendanceHistory[currentDate]?.[
                                currentHourSlot
                              ] === "Present"
                                ? "text-green-600"
                                : student.attendanceHistory[currentDate]?.[
                                    currentHourSlot
                                  ] === "Absent"
                                ? "text-red-600"
                                : student.attendanceHistory[currentDate]?.[
                                    currentHourSlot
                                  ] === "OD"
                                ? "text-blue-600"
                                : "text-gray-500"
                            }`}
                          >
                            {student.attendanceHistory[currentDate]?.[
                              currentHourSlot
                            ] || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() =>
                              handleMarkAttendance(student.rollNo, "Present")
                            }
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                          >
                            Present
                          </button>
                          <button
                            onClick={() =>
                              handleMarkAttendance(student.rollNo, "Absent")
                            }
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-2"
                          >
                            Absent
                          </button>
                          <button
                            onClick={() =>
                              handleMarkAttendance(student.rollNo, "OD")
                            }
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
                      <td
                        colSpan="10"
                        className="px-4 py-2 text-center text-gray-500"
                      >
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
                Please select Department, Section, Year, and Course to view
                students. 🧐
              </p>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Detailed Attendance History{" "}
            <span role="img" aria-label="scroll">
              📜
            </span>
          </h2>
          {areAllFiltersSelected ? (
            <div className="overflow-x-auto">
              {filteredStudents.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4 p-3 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition duration-200 ease-in-out ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                      }`}
                    >
                      <span role="img" aria-label="arrow left">
                        ⬅️
                      </span>{" "}
                      Previous {hoursPerPage} Hours
                    </button>
                    <span className="font-semibold text-blue-700 text-base">
                      Hours {indexOfFirstHour + 1} -{" "}
                      {Math.min(indexOfLastHour, totalHours)} of {totalHours}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalHourPages}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition duration-200 ease-in-out ${
                        currentPage === totalHourPages
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                      }`}
                    >
                      Next {hoursPerPage} Hours{" "}
                      <span role="img" aria-label="arrow right">
                        ➡️
                      </span>
                    </button>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200 border border-blue-100 rounded-lg">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sticky left-0 bg-blue-50 z-10 shadow-sm rounded-tl-lg">
                          S.No
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sticky left-12 bg-blue-50 z-10 shadow-sm">
                          Roll No
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider sticky left-28 bg-blue-50 z-10 shadow-sm">
                          Student Name
                        </th>
                        {currentHourColumns.map((hour) => (
                          <th
                            key={hour}
                            className="px-4 py-2 text-center text-xs font-medium text-blue-700 uppercase tracking-wider border-l border-gray-200"
                          >
                            Hour {hour}
                          </th>
                        ))}
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-l border-gray-200 rounded-tr-lg">
                          Total Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr
                          key={student.sNo}
                          className="hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                            {student.sNo}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 sticky left-12 bg-white z-10 border-r border-gray-200">
                            {student.rollNo}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium sticky left-28 bg-white z-10 border-r border-gray-200">
                            {student.name}
                          </td>
                          {currentHourColumns.map((hour) => {
                            let statusForHour = "-";

                            for (const date in student.attendanceHistory) {
                              if (student.attendanceHistory[date][hour]) {
                                statusForHour =
                                  student.attendanceHistory[date][hour];
                                break;
                              }
                            }

                            let statusClass = "";
                            if (statusForHour === "Present") {
                              statusClass = "text-green-600";
                            } else if (statusForHour === "Absent") {
                              statusClass = "text-red-600";
                            } else if (statusForHour === "OD") {
                              statusClass = "text-blue-600";
                            }

                            return (
                              <td
                                key={`${student.sNo}-${hour}`}
                                className={`px-4 py-2 whitespace-nowrap text-center text-sm font-semibold ${statusClass} border-l border-gray-200`}
                              >
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
                    <span className="font-semibold text-green-600">P</span> =
                    Present,{" "}
                    <span className="font-semibold text-red-600">A</span> =
                    Absent,{" "}
                    <span className="font-semibold text-blue-600">OD</span> = On
                    Duty (Counts as Present),{" "}
                    <span className="font-semibold text-gray-500">-</span> = Not
                    Marked/No Data.
                  </p>
                </>
              ) : (
                <p className="text-lg text-gray-500 text-center p-4">
                  No students to display history for with the selected filters.
                </p>
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
        &copy; {new Date().getFullYear()} Campus Management System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default AttendanceManager;

// import React, { useState, useEffect } from 'react';

// const LeaveManagement = () => {
//   // Dummy User Role (for demonstration) - In a real app, this would come from authentication context
//   const [userRole, setUserRole] = useState('faculty'); // 'faculty', 'hod', 'admin'

//   // State for faculty leave applications
//   const [leaveApplications, setLeaveApplications] = useState(() => {
//     // Initialize from localStorage or empty array
//     try {
//       const storedApplications = localStorage.getItem('leaveApplications');
//       return storedApplications ? JSON.parse(storedApplications) : [];
//     } catch (error) {
//       console.error("Failed to parse leave applications from localStorage", error);
//       return [];
//     }
//   });

//   // State for current leave application form
//   const [leaveType, setLeaveType] = useState('Casual Leave');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [reason, setReason] = useState('');

//   // Dummy Leave Balances (for demonstration) - In a real app, fetched from backend
//   const [leaveBalances, setLeaveBalances] = useState({
//     'Casual Leave': 12,
//     'Sick Leave': 7,
//     'Professional Leave': 5,
//   });

//   // Simulate storing/fetching from localStorage
//   useEffect(() => {
//     localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));
//   }, [leaveApplications]);

//   // Handle Leave Application Submission
//   const handleSubmitLeave = (e) => {
//     e.preventDefault();
//     if (!startDate || !endDate || !reason) {
//       alert('Please fill in all leave application fields.');
//       return;
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end - start);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start day

//     if (start > end) {
//       alert('End date cannot be before start date.');
//       return;
//     }
//     if (diffDays > leaveBalances[leaveType]) {
//         alert(`You only have ${leaveBalances[leaveType]} days of ${leaveType} remaining.`);
//         return;
//     }

//     const newApplication = {
//       id: Date.now(), // Simple unique ID
//       applicant: 'Dr. John Doe', // Dummy applicant - replace with actual user name
//       applicantId: 'FAC001', // Dummy applicant ID - replace with actual user ID
//       leaveType,
//       startDate,
//       endDate,
//       duration: diffDays,
//       reason,
//       status: 'Pending', // Initial status
//       appliedDate: new Date().toISOString().split('T')[0],
//       approvedBy: null,
//       approvalDate: null,
//       comments: '',
//     };

//     setLeaveApplications([...leaveApplications, newApplication]);
//     setLeaveType('Casual Leave');
//     setStartDate('');
//     setEndDate('');
//     setReason('');
//     alert('Leave application submitted successfully!');
//   };

//   // Handle Leave Approval/Rejection (HODs/Admins)
//   const handleLeaveAction = (id, status, approverName, comments = '') => {
//     setLeaveApplications(prevApplications =>
//       prevApplications.map(app => {
//         if (app.id === id) {
//           if (status === 'Approved') {
//             // Deduct leave balance only if actually approved and not already deducted
//             if (app.status === 'Pending') {
//               setLeaveBalances(prevBalances => ({
//                 ...prevBalances,
//                 [app.leaveType]: prevBalances[app.leaveType] - app.duration
//               }));
//             }
//           } else if (status === 'Rejected') {
//             // If it was previously approved and now rejected, might need to re-add balance (complex, let's keep it simple)
//             // For this simulation, we only deduct on approval of Pending.
//           }
//           return {
//             ...app,
//             status: status,
//             approvedBy: approverName,
//             approvalDate: new Date().toISOString().split('T')[0],
//             comments: comments,
//           };
//         }
//         return app;
//       })
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 font-sans antialiased">
//       <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg py-5 mb-8 rounded-b-xl">
//         <h1 className="text-4xl font-extrabold text-center text-white">Leave Management System ✈️</h1>
//       </header>

//       <main className="container mx-auto px-4">
//         {/* User Role Selector (for demo purposes) */}
//         <div className="mb-8 p-4 bg-yellow-50 rounded-lg shadow-md border border-yellow-200 text-center">
//           <label htmlFor="userRole" className="font-semibold text-yellow-800 text-lg mr-3">Simulate User Role:</label>
//           <select
//             id="userRole"
//             value={userRole}
//             onChange={(e) => {
//               setUserRole(e.target.value);
//               // Reset some states for a clean view when changing roles
//               setLeaveType('Casual Leave');
//               setStartDate('');
//               setEndDate('');
//               setReason('');
//             }}
//             className="p-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 text-base"
//           >
//             <option value="faculty">Faculty</option>
//             <option value="hod">HOD</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         {userRole === 'faculty' && (
//           <>
//             {/* Faculty Leave Application Section */}
//             <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
//               <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Apply for Leave 📝</h2>
//               <form onSubmit={handleSubmitLeave} className="max-w-xl mx-auto space-y-4">
//                 <div>
//                   <label htmlFor="leaveType" className="block text-gray-700 text-base font-semibold mb-2">Leave Type:</label>
//                   <select
//                     id="leaveType"
//                     value={leaveType}
//                     onChange={(e) => setLeaveType(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
//                     required
//                   >
//                     <option value="Casual Leave">Casual Leave</option>
//                     <option value="Sick Leave">Sick Leave</option>
//                     <option value="Professional Leave">Professional Leave</option>
//                   </select>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="startDate" className="block text-gray-700 text-base font-semibold mb-2">Start Date:</label>
//                     <input
//                       type="date"
//                       id="startDate"
//                       value={startDate}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="endDate" className="block text-gray-700 text-base font-semibold mb-2">End Date:</label>
//                     <input
//                       type="date"
//                       id="endDate"
//                       value={endDate}
//                       onChange={(e) => setEndDate(e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="reason" className="block text-gray-700 text-base font-semibold mb-2">Reason:</label>
//                   <textarea
//                     id="reason"
//                     value={reason}
//                     onChange={(e) => setReason(e.target.value)}
//                     rows="4"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
//                     placeholder="Briefly describe your reason for leave..."
//                     required
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 ease-in-out shadow-md"
//                 >
//                   Submit Leave Application
//                 </button>
//               </form>
//             </section>

//             {/* Faculty Leave Balance */}
//             <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-100">
//               <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Your Leave Balance 📊</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
//                 {Object.entries(leaveBalances).map(([type, balance]) => (
//                   <div key={type} className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
//                     <p className="text-lg font-semibold text-green-800">{type}</p>
//                     <p className="text-3xl font-extrabold text-green-700 mt-2">{balance} <span className="text-xl">days</span></p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </>
//         )}

//         {/* Common Section for Faculty/HOD/Admin: Leave Status Tracking */}
//         <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-purple-100">
//           <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
//             {userRole === 'faculty' ? 'Your Leave Applications' : 'All Leave Applications'} 📋
//           </h2>
//           <div className="overflow-x-auto">
//             {leaveApplications.length > 0 ? (
//               <table className="min-w-full divide-y divide-gray-200 border border-purple-100 rounded-lg">
//                 <thead className="bg-purple-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Applicant</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Type</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Dates</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Days</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Reason</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Applied On</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Status</th>
//                     {(userRole === 'hod' || userRole === 'admin') && (
//                       <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Action</th>
//                     )}
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Approved By</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Comments</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {leaveApplications
//                     .filter(app => userRole !== 'faculty' || app.applicantId === 'FAC001') // Faculty only sees their own
//                     .map(app => (
//                       <tr key={app.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicant}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.leaveType}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.startDate} to {app.endDate}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{app.duration}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">{app.reason}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.appliedDate}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                             app.status === 'Approved' ? 'bg-green-100 text-green-800' :
//                             'bg-red-100 text-red-800'
//                           }`}>
//                             {app.status}
//                           </span>
//                         </td>
//                         {(userRole === 'hod' || userRole === 'admin') && (
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             {app.status === 'Pending' ? (
//                               <>
//                                 <button
//                                   onClick={() => handleLeaveAction(app.id, 'Approved', userRole === 'hod' ? 'HOD' : 'Admin')}
//                                   className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm shadow-sm mr-2 transition duration-150"
//                                 >
//                                   Approve
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     const comments = prompt('Reason for rejection:');
//                                     handleLeaveAction(app.id, 'Rejected', userRole === 'hod' ? 'HOD' : 'Admin', comments || 'No reason given');
//                                   }}
//                                   className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm shadow-sm transition duration-150"
//                                 >
//                                   Reject
//                                 </button>
//                               </>
//                             ) : (
//                               <span className="text-gray-500">Actioned</span>
//                             )}
//                           </td>
//                         )}
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.approvedBy || 'N/A'}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">{app.comments || 'N/A'}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-lg text-gray-600 font-medium">
//                   {userRole === 'faculty' ? 'You have no leave applications yet.' : 'No leave applications to display.'}
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       <footer className="mt-8 py-4 text-center text-gray-600 text-sm border-t border-gray-200">
//         &copy; {new Date().getFullYear()} Campus Management System. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default LeaveManagement;

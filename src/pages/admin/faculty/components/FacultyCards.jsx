import React from 'react';
import { FaUsers, FaCalendarAlt, FaBuilding, FaChartLine } from 'react-icons/fa';

const ALL_DEPARTMENTS = ['CSE', 'IT', 'EEE', 'ECE', 'MECH', 'CIVIL'];

const FacultyCards = ({ facultyList, attendanceRecords }) => {
  const totalFaculty = facultyList.length;

  // Average attendance
  const attendanceValues = Object.values(attendanceRecords)
    .flatMap(record => Object.values(record)); // Flatten daily attendance
  const presentCount = attendanceValues.filter(val => val === 'Present').length;
  const totalMarked = attendanceValues.length;
  const averageAttendance = totalMarked
    ? ((presentCount / totalMarked) * 100).toFixed(1) + '%'
    : 'N/A';

  const stats = [
    {
      title: 'Total Faculty',
      value: totalFaculty,
      icon: <FaUsers />,
      color: 'from-blue-400 to-blue-600',
      description: 'Active faculty members',
    },
    {
      title: 'Average Attendance',
      value: averageAttendance,
      icon: <FaChartLine />,
      color: 'from-green-400 to-green-600',
      description: 'Based on daily presence',
    },
    {
      title: 'Total Working Days',
      value: 22,
      icon: <FaCalendarAlt />,
      color: 'from-purple-400 to-purple-600',
      description: 'Days this month',
    },
    {
      title: 'Total Departments',
      value: ALL_DEPARTMENTS.length,
      icon: <FaBuilding />,
      color: 'from-orange-400 to-orange-600',
      description: 'Academic departments',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-2xl p-4 shadow-md text-white bg-gradient-to-r ${stat.color}`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <div className="text-xl font-semibold">{stat.title}</div>
              <div className="text-2xl">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyCards;

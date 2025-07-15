import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

const departments = ['All', 'CSE', 'IT', 'EEE', 'ECE', 'MECH', 'CIVIL'];

const sampleFaculty = [
  { id: 1, name: 'Dr. Lisa Anderson', department: 'CIVIL' },
  { id: 2, name: 'Dr. John Smith', department: 'CSE' },
];

const AttendanceCalendar = () => {
  const [filter, setFilter] = useState('All');
  const [attendance, setAttendance] = useState({}); // { 'facultyId_date': true/false }

  const today = new Date();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const filteredFaculty =
    filter === 'All' ? sampleFaculty : sampleFaculty.filter(f => f.department === filter);

  const toggleAttendance = (facultyId, date) => {
    const key = `${facultyId}_${date}`;
    setAttendance(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Attendance Tracking</h2>
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border rounded-lg">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="border px-2 py-1 text-left">Faculty</th>
              {daysInMonth.map((day) => (
                <th key={day} className="border px-1 text-xs">
                  {format(day, 'd')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1 whitespace-nowrap font-medium">{faculty.name}</td>
                {daysInMonth.map((day) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const key = `${faculty.id}_${dateStr}`;
                  const isPresent = attendance[key];

                  return (
                    <td
                      key={key}
                      className={`border text-center cursor-pointer ${
                        isPresent ? 'bg-green-200' : 'bg-red-200'
                      }`}
                      onClick={() => toggleAttendance(faculty.id, dateStr)}
                      title={isPresent ? 'Present' : 'Absent'}
                    >
                      {isPresent ? '✔' : '✘'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceCalendar;

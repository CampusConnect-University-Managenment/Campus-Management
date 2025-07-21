import React from 'react';
import './ClassList.css';

const classData = [
  {
    id: 1,
    className: 'B.Tech CSE - 2nd Year',
    subject: 'OOP with Java',
    section: 'A',
    semester: '3',
    timings: '9:00 AM - 10:00 AM',
    roomNo: 'CS202'
  },
  {
    id: 2,
    className: 'B.Tech CSE - 3rd Year',
    subject: 'Data Structures',
    section: 'B',
    semester: '5',
    timings: '10:00 AM - 11:00 AM',
    roomNo: 'CS303'
  },
  {
    id: 3,
    className: 'B.Tech IT - 1st Year',
    subject: 'Programming in C',
    section: 'A',
    semester: '1',
    timings: '11:00 AM - 12:00 PM',
    roomNo: 'IT101'
  },
  {
    id: 4,
    className: 'B.Tech ECE - 2nd Year',
    subject: 'Digital Electronics',
    section: 'C',
    semester: '3',
    timings: '12:00 PM - 1:00 PM',
    roomNo: 'EC204'
  },
  {
    id: 5,
    className: 'B.Tech CSE - 4th Year',
    subject: 'Machine Learning',
    section: 'B',
    semester: '7',
    timings: '1:00 PM - 2:00 PM',
    roomNo: 'CS407'
  },
  {
    id: 6,
    className: 'BCA - 2nd Year',
    subject: 'Web Development',
    section: 'A',
    semester: '4',
    timings: '9:00 AM - 10:00 AM',
    roomNo: 'BCA302'
  },
  {
    id: 7,
    className: 'B.Sc CS - 1st Year',
    subject: 'Mathematics',
    section: 'A',
    semester: '2',
    timings: '10:00 AM - 11:00 AM',
    roomNo: 'CS105'
  },
  {
    id: 8,
    className: 'B.Tech ME - 2nd Year',
    subject: 'Thermodynamics',
    section: 'D',
    semester: '3',
    timings: '11:00 AM - 12:00 PM',
    roomNo: 'ME204'
  },
  {
    id: 9,
    className: 'MCA - 1st Year',
    subject: 'Operating Systems',
    section: 'A',
    semester: '1',
    timings: '12:00 PM - 1:00 PM',
    roomNo: 'MCA101'
  },
  {
    id: 10,
    className: 'B.Tech CSE - 3rd Year',
    subject: 'Database Systems',
    section: 'B',
    semester: '5',
    timings: '2:00 PM - 3:00 PM',
    roomNo: 'CS305'
  }
];

const ClassList = () => {
  const handleAction = (action, className) => {
    alert(`${action} for ${className}`);
  };

  return (
    <div className="table-container">
      <h2>📋 Faculty Class List</h2>
      <table className="class-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Subject</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Timings</th>
            <th>Room No</th>
            <th>📄 Students</th>
            <th>📊 Attendance</th>
            <th>📚 Notes</th>
            <th>🗓 Timetable</th>
            <th>📝 Assignments</th>
            <th>📢 Announce</th>
            <th>📈 Performance</th>
            <th>⚙ Edit</th>
            <th>❌ Delete</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((cls, index) => (
            <tr key={cls.id}>
              <td>{index + 1}</td>
              <td>{cls.className}</td>
              <td>{cls.subject}</td>
              <td>{cls.section}</td>
              <td>{cls.semester}</td>
              <td>{cls.timings}</td>
              <td>{cls.roomNo}</td>
              <td><button onClick={() => handleAction('View Students', cls.className)}>View</button></td>
              <td><button onClick={() => handleAction('Attendance', cls.className)}>Mark/View</button></td>
              <td><button onClick={() => handleAction('Notes', cls.className)}>Manage</button></td>
              <td><button onClick={() => handleAction('Timetable', cls.className)}>View</button></td>
              <td><button onClick={() => handleAction('Assignments', cls.className)}>Manage</button></td>
              <td><button onClick={() => handleAction('Announcement', cls.className)}>Post</button></td>
              <td><button onClick={() => handleAction('Performance', cls.className)}>Track</button></td>
              <td><button onClick={() => handleAction('Edit Class', cls.className)}>Edit</button></td>
              <td><button onClick={() => handleAction('Delete Class', cls.className)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
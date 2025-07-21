// FacultyList.js
import React, { useState } from 'react';
import FacultyForm from './FacultyForm';
import FacultyCards from './FacultyCards'; // Adjust path if needed

const initialFaculty = [
  {
    id: 1,
    name: 'Dr. Lisa Anderson',
    email: 'lisa.anderson@university.edu',
    department: 'CIVIL',
    role: 'Assistant Professor',
  },
  {
    id: 2,
    name: 'Dr. John Smith',
    email: 'john.smith@university.edu',
    department: 'CSE',
    role: 'Professor',
  },
];

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState(initialFaculty);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    department: 'CSE',
    role: '',
  });

  const [attendanceRecords, setAttendanceRecords] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const handleMarkAttendance = (id, status) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [today]: status,
      },
    }));
  };

  const handleEdit = (id) => {
    const data = facultyList.find((f) => f.id === id);
    setFormData(data);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      setFacultyList((prev) => prev.filter((f) => f.id !== id));
      setAttendanceRecords((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updated = { ...formData };

    if (formData.id) {
      setFacultyList((prev) =>
        prev.map((f) => (f.id === formData.id ? updated : f))
      );
    } else {
      updated.id = Date.now();
      setFacultyList((prev) => [...prev, updated]);
    }

    setFormData({
      id: null,
      name: '',
      email: '',
      department: 'CSE',
      role: '',
    });
    setShowForm(false);
  };

  const filteredFaculty =
    filter === 'All'
      ? facultyList
      : facultyList.filter((f) => f.department === filter);

  return (
    <div className="space-y-6">
      {/* ✅ Dashboard Cards: RENDER ONLY ONCE */}
      <FacultyCards
        facultyList={facultyList}
        attendanceRecords={attendanceRecords}
      />

      {/* 🔍 Filter + Add */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Faculty Management</h2>
        <div className="flex items-center gap-4">
          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setFormData({
                id: null,
                name: '',
                email: '',
                department: 'CSE',
                role: '',
              });
              setShowForm(true);
            }}
          >
            + Add Faculty
          </button>
        </div>
      </div>

      {/* ✍️ Add/Edit Form */}
      {showForm && (
        <FacultyForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* 🧑‍🏫 Faculty List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredFaculty.map((f) => {
          const todayStatus =
            attendanceRecords[f.id] && attendanceRecords[f.id][today];

          return (
            <div
              key={f.id}
              className="border rounded-xl p-4 shadow-md space-y-2 bg-white"
            >
              <h3 className="text-xl font-semibold">{f.name}</h3>
              <p className="text-sm text-gray-600">{f.role}</p>
              <p className="text-sm">{f.email}</p>
              <p className="text-sm">Department: {f.department}</p>
              <p className="text-sm">
                Today’s Attendance:{' '}
                <span
                  className={`font-medium ${
                    todayStatus === 'Present'
                      ? 'text-green-600'
                      : todayStatus === 'Absent'
                      ? 'text-red-500'
                      : 'text-yellow-600'
                  }`}
                >
                  {todayStatus || 'Not Marked'}
                </span>
              </p>

              <div className="flex gap-2 pt-2 flex-wrap">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleMarkAttendance(f.id, 'Present')}
                >
                  Present
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleMarkAttendance(f.id, 'Absent')}
                >
                  Absent
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(f.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(f.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyList;

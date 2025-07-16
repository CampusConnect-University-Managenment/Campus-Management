import React, { useState } from 'react';

const departments = ['All', 'CSE', 'IT', 'EEE', 'ECE', 'MECH', 'CIVIL'];

const initialFaculty = [
  {
    id: 1,
    name: 'Dr. Lisa Anderson',
    email: 'lisa.anderson@university.edu',
    department: 'CIVIL',
    role: 'Assistant Professor',
    attendance: 94.1,
  },
  {
    id: 2,
    name: 'Dr. John Smith',
    email: 'john.smith@university.edu',
    department: 'CSE',
    role: 'Professor',
    attendance: 95.5,
  },
];

const FacultyList = () => {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for ID: ${id}`);
    // You can implement modal/form here
  };

  const filteredFaculty =
    filter === 'All' ? faculty : faculty.filter((f) => f.department === filter);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Faculty Management</h2>
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
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => alert('Add Faculty modal goes here')}
        >
          + Add Faculty
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredFaculty.map((f) => (
          <div
            key={f.id}
            className="rounded-xl shadow-md border p-4 flex flex-col space-y-2"
          >
            <div className="text-lg font-semibold">{f.name}</div>
            <div className="text-sm text-gray-600">{f.role}</div>
            <div className="text-sm">{f.email}</div>
            <div className="text-sm">Department: {f.department}</div>
            <div className="text-sm">
              Attendance Rate:{' '}
              <span className="text-green-600 font-medium">{f.attendance}%</span>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => handleEdit(f.id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(f.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyList;

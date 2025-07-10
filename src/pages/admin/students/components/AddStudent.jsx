import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AllStudents = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [students, setStudents] = useState([
    {
      id: 'STU001',
      name: 'John Doe',
      phone: '+91-9876543210',
      email: 'john.doe@university.edu',
      department: 'CSE',
      degree: 'B.Tech CSE',
      year: '2nd Year',
      semester: 'Sem 4',
      status: 'Active',
      profile: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 'STU002',
      name: 'Alice Smith',
      phone: '+91-9876543211',
      email: 'alice.smith@university.edu',
      department: 'ECE',
      degree: 'B.Tech ECE',
      year: '3rd Year',
      semester: 'Sem 6',
      status: 'Graduated',
      profile: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 'STU003',
      name: 'Manoj Kumar',
      phone: '+91-9876543212',
      email: 'manoj.kumar@university.edu',
      department: 'IT',
      degree: 'B.Tech IT',
      year: '1st Year',
      semester: 'Sem 2',
      status: 'Active',
      profile: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 'STU004',
      name: 'Divya Reddy',
      phone: '+91-9876543213',
      email: 'divya.reddy@university.edu',
      department: 'EEE',
      degree: 'B.Tech EEE',
      year: '4th Year',
      semester: 'Sem 8',
      status: 'Inactive',
      profile: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 'STU005',
      name: 'Rahul Verma',
      phone: '+91-9876543214',
      email: 'rahul.verma@university.edu',
      department: 'CSE',
      degree: 'B.Tech CSE',
      year: '2nd Year',
      semester: 'Sem 4',
      status: 'Active',
      profile: 'https://i.pravatar.cc/150?img=5',
    },
  ]);

  const handleAddStudent = () => {
    const newStudent = {
      id: `STU00${students.length + 1}`,
      name: 'New Student',
      phone: '+91-9999999999',
      email: `new${students.length + 1}@university.edu`,
      department: 'IT',
      degree: 'B.Tech IT',
      year: '1st Year',
      semester: 'Sem 1',
      status: 'Active',
      profile: `https://i.pravatar.cc/150?img=${students.length + 6}`,
    };
    setStudents([...students, newStudent]);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">🎓 Student Management</h1>
      <p className="text-gray-600 mb-6">Manage student records and information.</p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex items-center border px-2 py-1 bg-white rounded-md w-full md:max-w-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            className="border px-3 py-2 rounded-md"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="IT">IT</option>
          </select>
          <select
            className="border px-3 py-2 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={handleAddStudent}
            className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black"
          >
            <FaPlus />
            Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b font-semibold text-lg">
          Student Records ({filteredStudents.length})
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">Student ID</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Year</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{s.id}</td>
                <td className="p-3">
                  <img
                    src={s.profile}
                    alt={s.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-gray-500 text-sm">{s.phone}</div>
                </td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.department}</td>
                <td className="p-3">
                  {s.year}
                  <div className="text-sm text-gray-500">{s.semester}</div>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      s.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : s.status === 'Graduated'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1">
                      <FaEdit size={14} /> Edit
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-1">
                      <FaTrash size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudents;

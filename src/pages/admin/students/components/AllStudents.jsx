import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AboutStudent from "./AboutStudent";

const AllStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [students] = useState([
    {
      id: "STU001",
      name: "John Doe",
      phone: "+1-555-0123",
      email: "john.doe@university.edu",
      department: "CSE",
      degree: "B.Tech CSE",
      year: "Year 2",
      semester: "Fall 2024",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: "STU002",
      name: "Alice Smith",
      phone: "+1-555-0125",
      email: "alice.smith@university.edu",
      department: "ECE",
      degree: "B.Tech ECE",
      year: "Year 3",
      semester: "Fall 2024",
      status: "Graduated",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: "STU003",
      name: "David Miller",
      phone: "+1-555-0135",
      email: "david.miller@university.edu",
      department: "IT",
      degree: "B.Tech IT",
      year: "Year 1",
      semester: "Spring 2025",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: "STU004",
      name: "Emily Johnson",
      phone: "+1-555-0166",
      email: "emily.j@university.edu",
      department: "EEE",
      degree: "B.Tech EEE",
      year: "Year 4",
      semester: "Fall 2024",
      status: "Graduated",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: "STU005",
      name: "Mark Wilson",
      phone: "+1-555-0188",
      email: "mark.wilson@university.edu",
      department: "CSE",
      degree: "B.Tech CSE",
      year: "Year 1",
      semester: "Fall 2024",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: "STU006",
      name: "Priya Ramesh",
      phone: "+1-555-0191",
      email: "priya.ramesh@university.edu",
      department: "IT",
      degree: "B.Tech IT",
      year: "Year 2",
      semester: "Spring 2025",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
    {
      id: "STU007",
      name: "Arjun Nair",
      phone: "+1-555-0195",
      email: "arjun.nair@university.edu",
      department: "EEE",
      degree: "B.Tech EEE",
      year: "Year 3",
      semester: "Fall 2024",
      status: "Graduated",
      avatar: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: "STU008",
      name: "Nisha Rao",
      phone: "+1-555-0199",
      email: "nisha.rao@university.edu",
      department: "ECE",
      degree: "B.Tech ECE",
      year: "Year 1",
      semester: "Spring 2025",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  ]);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || s.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || s.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const departmentOptions = Array.from(new Set(students.map((s) => s.department)));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AboutStudent students={students} />

      {/* 🔍 Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center border rounded-md px-2 py-1 bg-white w-full md:max-w-md">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        <div className="flex gap-4">
          <select
            className="border px-3 py-2 rounded-md"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departmentOptions.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
          </select>

          <button className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black">
            <FaPlus />
            Add Student
          </button>
        </div>
      </div>

      {/* 📊 Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b font-semibold text-lg">
          Student Records ({filteredStudents.length})
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">Student ID</th>
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
                  <div className="flex items-center gap-3">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-gray-500 text-sm">{s.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">
                  <div>{s.department}</div>
                  <div className="text-sm text-gray-500">{s.degree}</div>
                </td>
                <td className="p-3">
                  <div>{s.year}</div>
                  <div className="text-sm text-gray-500">{s.semester}</div>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
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

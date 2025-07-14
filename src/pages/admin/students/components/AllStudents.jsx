import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import AboutStudent from "./AboutStudent";
import AddStudent from "./AddStudent";
import StudentProfile from "./StudentProfile";

const AllStudents = () => {
  const RECENT_STUDENTS_COUNT = 3;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 555 123 4567",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      department: "Computer Science",
      degree: "BSc Computer Science",
      year: "3rd Year",
      semester: "Spring 2025",
      status: "Active",
      bio: "Alice is a dedicated computer science student passionate about AI and machine learning.",
    },
    {
      id: "STU002",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 555 987 6543",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      department: "Mechanical Engineering",
      degree: "BEng Mechanical Engineering",
      year: "2nd Year",
      semester: "Fall 2024",
      status: "Active",
      bio: "Michael enjoys robotics and has participated in several engineering competitions.",
    },
    {
      id: "STU003",
      name: "Sofia Martinez",
      email: "sofia.martinez@example.com",
      phone: "+1 555 765 4321",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      department: "Business Administration",
      degree: "BBA",
      year: "4th Year",
      semester: "Spring 2025",
      status: "Graduated",
      bio: "Sofia graduated with honors and is interested in entrepreneurship and marketing.",
    },
    {
      id: "STU004",
      name: "David Kim",
      email: "david.kim@example.com",
      phone: "+1 555 321 9876",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      department: "Computer Science",
      degree: "BSc Computer Science",
      year: "1st Year",
      semester: "Fall 2025",
      status: "Active",
      bio: "David is passionate about cybersecurity and networks.",
    },
    {
      id: "STU005",
      name: "Emily Clark",
      email: "emily.clark@example.com",
      phone: "+1 555 654 3210",
      avatar: "https://randomuser.me/api/portraits/women/30.jpg",
      department: "Psychology",
      degree: "BA Psychology",
      year: "3rd Year",
      semester: "Spring 2025",
      status: "Active",
      bio: "Emily is interested in cognitive psychology and human behavior research.",
    },
  ]);

  const addStudent = (newStudent) => {
    const nextId = `STU${String(students.length + 1).padStart(3, "0")}`;
    setStudents([...students, { ...newStudent, id: nextId }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
  };

  const deleteStudent = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      setStudents(students.filter((s) => s.id !== id));
      setSelectedStudent(null);
    }
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowAll(false);
  };

  const onDeptChange = (e) => {
    setSelectedDept(e.target.value);
    setShowAll(false);
  };

  const onStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setShowAll(false);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || s.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || s.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  let displayedStudents = [];

  const noFiltersActive =
    searchTerm === "" && selectedDept === "All" && selectedStatus === "All";

  if (showAll) {
    displayedStudents = noFiltersActive ? students : filteredStudents;
  } else {
    const baseList = noFiltersActive ? students : filteredStudents;
    displayedStudents = baseList.slice(-RECENT_STUDENTS_COUNT);
  }

  const departmentOptions = Array.from(new Set(students.map((s) => s.department)));

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    if (showAll) {
      setSearchTerm("");
      setSelectedDept("All");
      setSelectedStatus("All");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ paddingTop: "120px" }}>
      <AboutStudent students={students} />

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center border rounded-md px-2 py-1 bg-white w-full md:max-w-md">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={onSearchChange}
            className="outline-none w-full"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <select
            className="border px-3 py-2 rounded-md"
            value={selectedDept}
            onChange={onDeptChange}
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
            onChange={onStatusChange}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
          </select>

          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black"
            onClick={() => {
              setEditingStudent(null);
              setShowAddModal(true);
            }}
          >
            <FaPlus />
            Add Student
          </button>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b font-semibold text-lg">
          Student Records ({displayedStudents.length})
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
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((s, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedStudent(s)}
              >
                <td className="p-3 font-semibold">{s.id}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-blue-600 hover:underline">{s.name}</div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOGGLE BUTTON */}
      <div className="p-4 flex justify-center">
        <button
          onClick={toggleShowAll}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showAll ? "Show Recent Students" : "See All Students"}
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <AddStudent
              onClose={() => setShowAddModal(false)}
              onAddStudent={addStudent}
              onEditStudent={updateStudent}
              editingStudent={editingStudent}
            />
          </div>
        </div>
      )}

      {/* Student Profile Modal with Edit/Delete Buttons */}
      {selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onEdit={() => {
            setEditingStudent(selectedStudent);
            setShowAddModal(true);
            setSelectedStudent(null);
          }}
          onDelete={() => deleteStudent(selectedStudent.id)}
        />
      )}
    </div>
  );
};

export default AllStudents;

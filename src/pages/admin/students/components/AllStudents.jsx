import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaBriefcase } from "react-icons/fa";
import AboutStudent from "./AboutStudent";
import AddStudent from "./AddStudent";
import StudentProfile from "./StudentProfile";
import PerformanceChart from "./PerformanceChart";

const AllStudents = () => {
  const RECENT_STUDENTS_COUNT = 3;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const [students, setStudents] = useState([
         {id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 555 123 4567",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      department: "Computer Science",
      degree: "BSc Computer Science",
      year: "3rd Year",
      semester: "Spring 2025",
      status: "Active",
      cgpa: 9.1,
      attendance: 92,
      bio: "Alice is a dedicated computer science student passionate about AI and machine learning.",
      placement: {
        company: "Google",
        package: 18,
        date: "July 5, 2025",
        position: "Software Engineer",
      },
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
      cgpa: 7.8,
      attendance: 76,
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
      cgpa: 8.5,
      attendance: 81,
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
      cgpa: 6.4,
      attendance: 68,
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
      cgpa: 9.3,
      attendance: 95,
      bio: "Emily is interested in cognitive psychology and human behavior research.",
    },
    {
      id: "STU006",
      name: "Rahul Nair",
      email: "rahul.nair@example.com",
      phone: "+91 98765 43210",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
      department: "Information Technology",
      degree: "B.Tech IT",
      year: "2nd Year",
      semester: "Fall 2024",
      status: "Active",
      cgpa: 8.2,
      attendance: 73,
      bio: "Rahul loves programming and building full-stack applications.",
    },
    {
      id: "STU007",
      name: "Priya Ramesh",
      email: "priya.ramesh@example.com",
      phone: "+91 90123 45678",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      department: "Electronics",
      degree: "B.E ECE",
      year: "3rd Year",
      semester: "Spring 2025",
      status: "Active",
      cgpa: 8.9,
      attendance: 78,
      bio: "Priya is working on IoT-based academic research and automation projects.",
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
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
      setSelectedStudent(null);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || s.department === selectedDept;
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Active" && s.status === "Active") ||
      (selectedStatus === "Placed" && s.placement);
    const matchesYear = selectedYear === "All" || s.year === selectedYear;
    return matchesSearch && matchesDept && matchesStatus && matchesYear;
  });

  const departmentOptions = [...new Set(students.map((s) => s.department))];
  const yearOptions = [...new Set(students.map((s) => s.year))];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = showAll
    ? filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
    : filteredStudents.slice(-RECENT_STUDENTS_COUNT);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const topCGPAStudents = [...students].sort((a, b) => b.cgpa - a.cgpa).slice(0, 3);
  const placedStudents = students.filter((s) => s.placement);

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ paddingTop: "120px" }}>
      <AboutStudent students={students} />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex items-center border rounded-md px-2 py-1 bg-white flex-1 max-w-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select className="border px-3 py-2 rounded-md" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
            <option value="All">All Departments</option>
            {departmentOptions.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
          <select
  className="border px-3 py-2 rounded-md"
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
>
  <option value="All">All Status</option>
  <option value="Active">Active</option>
  <option value="Placed">Placed</option>
</select>

          <select className="border px-3 py-2 rounded-md" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="All">All Years</option>
            {yearOptions.map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black"
            onClick={() => {
              setEditingStudent(null);
              setShowAddModal(true);
            }}
          >
            <FaPlus /> Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="p-4 border-b font-semibold text-lg text-gray-800 bg-gray-50 rounded-t-lg">
          Student Records ({filteredStudents.length})
        </div>
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 border-b border-gray-200">Student ID</th>
              <th className="p-4 border-b border-gray-200">Name</th>
              <th className="p-4 border-b border-gray-200">Email</th>
              <th className="p-4 border-b border-gray-200">Department</th>
              <th className="p-4 border-b border-gray-200">Year</th>
              <th className="p-4 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((s, idx) => (
              <tr
                key={idx}
                className="bg-white hover:bg-gray-50 transition border-b border-gray-100 cursor-pointer"
                onClick={() => setSelectedStudent(s)}
              >
                <td className="p-4 font-medium text-gray-800 whitespace-nowrap">{s.id}</td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-700 hover:underline">{s.name}</span>
                        {s.placement && <FaBriefcase className="text-green-600" title="Placed" />}
                      </div>
                      <div className="text-xs text-gray-500">{s.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">{s.email}</td>
                <td className="p-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-800">{s.department}</div>
                  <div className="text-xs text-gray-500">{s.degree}</div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-800">{s.year}</div>
                  <div className="text-xs text-gray-500">{s.semester}</div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    s.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show All Button */}
      <div className="p-4 flex justify-center">
        <button onClick={() => {
          setShowAll(!showAll);
          setCurrentPage(1);
        }} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {showAll ? "Show Recent Students" : "See All Students"}
        </button>
      </div>

      {/* Pagination */}
      {showAll && totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

     {/* Top CGPA + Placed Students - Side by Side */}
<div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Top CGPA Students */}
  <div>
    <h3 className="text-xl font-bold text-blue-800 mb-4">🌟 Top Performing Students (CGPA)</h3>
    <div className="space-y-4">
      {topCGPAStudents.map((s, idx) => {
        const medals = ["🥇", "🥈", "🥉"];
        const bgColors = ["bg-yellow-100", "bg-gray-100", "bg-orange-100"];
        return (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 rounded-lg shadow ${bgColors[idx] || "bg-gray-50"} hover:shadow-md transition cursor-pointer`}
            onClick={() => setSelectedStudent(s)}
          >
            <div className="text-3xl w-10 text-center">{medals[idx] || "🎓"}</div>
            <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-semibold text-blue-800 hover:underline">{s.name}</div>
              <div className="text-sm text-gray-600">{s.department}</div>
              <div className="text-sm font-medium text-green-700">CGPA: {s.cgpa}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* Placed Students */}
  <div>
    <h3 className="text-xl font-bold text-green-800 mb-4">🎓 Placed Students</h3>
    <div className="space-y-4">
      {placedStudents.map((s, idx) => (
        <div
          key={idx}
          className="bg-green-50 border border-green-200 p-4 rounded-lg shadow cursor-pointer hover:bg-green-100"
          onClick={() => setSelectedStudent(s)}
        >
          <div className="flex items-center gap-4">
            <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-semibold text-green-800 hover:underline">{s.name}</div>
              <div className="text-sm text-gray-600">{s.placement.position} @ {s.placement.company}</div>
              <div className="text-sm text-green-700">Package: ₹{s.placement.package} LPA</div>
              <div className="text-xs text-gray-400">Placed on: {s.placement.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      <PerformanceChart students={students} />

      {/* Add Modal */}
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


      {/* Student Profile */}
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

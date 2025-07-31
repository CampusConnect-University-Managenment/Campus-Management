import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaBriefcase } from "react-icons/fa";
import AboutStudent from "./AboutStudent";
import AddStudent from "./AddStudent";
import DepartmentCards from "./DepartmentCards";
import DepartmentStudentList from "./DepartmentStudentList";
import axios from "axios";
import BulkAddStudents from "./BulkAddStudents";

const AllStudents = () => {
  const RECENT_STUDENTS_COUNT = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedDeptForPage, setSelectedDeptForPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [students, setStudents] = useState([]);

  // Fetch and normalize data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/admin/students/all");
        const fetched = result.data.data || [];
        // normalize field names
        const normalized = fetched.map((student) => ({
          id: student.studentId,
          name: student.studentName,
          regNo: student.studentRollNo,
          department: student.studentDepartment,
          year: student.studentYear,
          cgpa: student.studentCgpa,
          placement: student.placement
        }));
        setStudents(normalized);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchData();
  }, []);

  // Add, update and delete student
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
    }
  };

  // Department & year options
  const departmentOptions = ["IT", "CSE", "ECE", "EEE", "AIDS"];
  const yearOptions = ["1", "2", "3", "4"];

  // Filtering & Pagination
  const filteredStudents = students.filter((student) => {
    const matchesDept = selectedDept === "All" || student.department === selectedDept;
    const matchesYear = selectedYear === "All" || String(student.year) === selectedYear;
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesYear && matchesSearch;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ paddingTop: "120px" }}>
      {/* Overview Section */}
      <AboutStudent students={students} />

      {/* Department Overview */}
      {!selectedDeptForPage ? (
        <DepartmentCards
          students={students}
          onDeptClick={(dept) => setSelectedDeptForPage(dept)}
        />
      ) : (
        <DepartmentStudentList
          department={selectedDeptForPage}
          students={students}
          onBack={() => setSelectedDeptForPage(null)}
        />
      )}

      {/* Student List Below Department Overview */}
      <div className="flex flex-wrap items-center justify-between gap-4 my-4">
  {/* Search Bar */}
  <div className="relative flex-1 min-w-[200px]">
    <input
      type="text"
      className="w-full px-4 py-2 pl-10 border rounded shadow-sm"
      placeholder="Search by Name, ID, RegNo..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
  </div>

  {/* Department Dropdown */}
  <select
    value={selectedDept}
    onChange={(e) => setSelectedDept(e.target.value)}
    className="flex-1 min-w-[150px] px-4 py-2 border rounded shadow-sm"
  >
    <option value="All">All Departments</option>
    {departmentOptions.map((dept) => (
      <option key={dept} value={dept}>{dept}</option>
    ))}
  </select>

  {/* Year Dropdown */}
  <select
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
    className="flex-1 min-w-[150px] px-4 py-2 border rounded shadow-sm"
  >
    <option value="All">All Years</option>
    {yearOptions.map((year) => (
      <option key={year} value={year}>{year}</option>
    ))}
  </select>

  {/* Add Student Button */}
  <button
    onClick={() => setShowAddModal(true)}
    className="flex-1 min-w-[150px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    <FaPlus className="inline mr-2" /> Add Student
  </button>

  {/* Bulk Upload Button */}
  <button
    onClick={() => setShowBulkModal(true)}
    className="flex-1 min-w-[150px] px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    <FaBriefcase className="inline mr-2" /> Bulk Upload
  </button>
</div>


      {/* Students Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Reg. No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Department</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Year</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">CGPA</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2">{student.id}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.regNo}</td>
                  <td className="px-4 py-2">{student.department}</td>
                  <td className="px-4 py-2">{student.year}</td>
                  <td className="px-4 py-2">{student.cgpa ?? "-"}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditingStudent(student);
                        setShowAddModal(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddStudent
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingStudent(null);
          }}
          onSave={editingStudent ? updateStudent : addStudent}
          student={editingStudent}
        />
      )}
      {showBulkModal && (
        <BulkAddStudents
          isOpen={showBulkModal}
          onClose={() => setShowBulkModal(false)}
          onBulkAdd={(bulkStudents) => setStudents([...students, ...bulkStudents])}
        />
      )}
    </div>
  );
};

export default AllStudents;

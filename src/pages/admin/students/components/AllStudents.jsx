import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaBriefcase } from "react-icons/fa";
import axios from "axios";

import AboutStudent from "./AboutStudent";
import AddStudent from "./AddStudent";
import DepartmentCards from "./DepartmentCards";
import DepartmentStudentList from "./DepartmentStudentList";
import BulkAddStudents from "./BulkAddStudents";

const AllStudents = () => {
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

  // Fixed department/year options – ideally should come from backend
  const departmentOptions = ["IT", "CSE", "ECE", "EEE", "AIDS"];
  const yearOptions = ["1", "2", "3", "4"];

  // Normalize backend student entity to frontend format
  const normalizeStudent = (student) => ({
    id: student.studentId,
    firstName: student.studentFirstname,
    lastName: student.studentLastname,
    name: `${student.studentFirstname} ${student.studentLastname}`,
    regNo: student.studentRollNo,
    department: student.studentDepartment,
    dob: student.studentDob,
    contact: student.studentPhoneNo,
    email: student.studentEmail,
    adhar: student.studentAadharno,
    tenthMark: student.studentTenthmark,
    diplomaMark: student.studentDiplomamark,
    twelfthMark: student.studentTwelfthmark,
    year: student.studentYear,
    sem: student.studentSem,
    quota: student.studentModeofjoing,
    gender: student.studentGender,
    bloodGroup: student.studentBloodgroup,
    address: student.studentAddress,
    parentRole: student.studentParentorguardian,
    parentName: student.studentParentorguardianname,
    parentPhoneNo: student.studentParentorguardianphone,
    section: student.studentSection,
    totalCredits: student.studentCredits,
    attendance: student.studentAttendance,
    cgpa: student.studentCgpa,
    photo: student.studentProfilepic,
    bio: student.bio,       // If exists in backend
    password: student.password // If exists
  });

  // Fetch students from backend and normalize
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/students/all");
      const fetched = res.data?.data || [];
      const normalized = fetched.map(normalizeStudent);
      setStudents(normalized);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Format frontend student data into backend structure before sending
  const formatForBackend = (formData) => ({
    studentId: formData.id,
    studentFirstname: formData.firstName,
    studentLastname: formData.lastName,
    studentRollNo: formData.regNo,
    studentDepartment: formData.department,
    studentDob: formData.dob,
    studentPhoneNo: formData.contact,
    studentEmail: formData.email,
    studentAadharno: formData.adhar,
    studentTenthmark: parseFloat(formData.tenthMark),
    studentDiplomamark: parseFloat(formData.diplomaMark),
    studentTwelfthmark: parseFloat(formData.twelfthMark),
    studentYear: formData.year,
    studentSem: formData.sem,
    studentModeofjoing: formData.quota,
    studentGender: formData.gender,
    studentBloodgroup: formData.bloodGroup,
    studentAddress: formData.address,
    studentParentorguardian: formData.parentRole,
    studentParentorguardianname: formData.parentName,
    studentParentorguardianphone: formData.parentPhoneNo,
    studentSection: formData.section,
    studentCredits: parseInt(formData.totalCredits) || 0,
    studentAttendance: parseFloat(formData.attendance) || 0,
    studentCgpa: parseFloat(formData.cgpa) || 0,
    studentProfilepic: formData.photo || "", // You may need to upload file separately
    bio: formData.bio,
    password: formData.password,
  });

  // Add student
  const addStudent = async (newStudent) => {
    try {
      const backendData = formatForBackend(newStudent);
      const res = await axios.post("http://localhost:8080/api/admin/students/add", backendData);
      if (res.data?.status === "SUCCESS") {
        alert(res.data.message || "Student added successfully");
        fetchStudents();
      } else {
        alert("Failed to add student: " + (res.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student, check console for details.");
    }
  };

  // Update student
  const updateStudent = async (updatedStudent) => {
    try {
      if (!updatedStudent.regNo) {
        alert("Registration number required for update");
        return;
      }
      const backendData = formatForBackend(updatedStudent);
      const res = await axios.put(
        `http://localhost:8080/api/admin/students/rollno/${updatedStudent.regNo}`,
        backendData
      );
      if (res.data?.status === "SUCCESS") {
        alert(res.data.message || "Student updated successfully");
        fetchStudents();
      } else {
        alert("Failed to update student: " + (res.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student, check console.");
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await axios.delete(`http://localhost:8080/api/admin/students/${id}`);
      if (res.data?.status === "SUCCESS") {
        alert(res.data.message || "Student deleted");
        fetchStudents();
      } else {
        alert("Failed to delete student: " + (res.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete student error:", error);
      alert("Error deleting student, check console.");
    }
  };

  // Filter & paginate students
  const filteredStudents = students.filter((student) => {
    const matchDept = selectedDept === "All" || student.department === selectedDept;
    const matchYear = selectedYear === "All" || String(student.year) === selectedYear;
    const matchSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDept && matchYear && matchSearch;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ paddingTop: "120px" }}>
      <AboutStudent students={students} />
      {!selectedDeptForPage ? (
        <DepartmentCards students={students} onDeptClick={setSelectedDeptForPage} />
      ) : (
        <DepartmentStudentList
          department={selectedDeptForPage}
          students={students}
          onBack={() => setSelectedDeptForPage(null)}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 my-4">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 border rounded shadow-sm"
            placeholder="Search by Name, ID, RegNo..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div>
        <select
          value={selectedDept}
          onChange={e => setSelectedDept(e.target.value)}
          className="flex-1 min-w-[150px] px-4 py-2 border rounded shadow-sm"
        >
          <option value="All">All Departments</option>
          {departmentOptions.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          className="flex-1 min-w-[150px] px-4 py-2 border rounded shadow-sm"
        >
          <option value="All">All Years</option>
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex-1 min-w-[150px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus className="inline mr-2" /> Add Student
        </button>
        <button
          onClick={() => setShowBulkModal(true)}
          className="flex-1 min-w-[150px] px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FaBriefcase className="inline mr-2" /> Bulk Upload
        </button>
      </div>

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
              currentStudents.map(student => (
                <tr key={student.id}>
                  <td className="px-4 py-2">{student.id}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.regNo}</td>
                  <td className="px-4 py-2">{student.department}</td>
                  <td className="px-4 py-2">{student.year}</td>
                  <td className="px-4 py-2">{student.cgpa || "-"}</td>
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

      {showAddModal && (
        <AddStudent
          editingStudent={editingStudent}
          onSave={addStudent}
          onEditStudent={updateStudent}
          onClose={() => {
            setShowAddModal(false);
            setEditingStudent(null);
          }}
          setSelectedStudent={setEditingStudent}
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

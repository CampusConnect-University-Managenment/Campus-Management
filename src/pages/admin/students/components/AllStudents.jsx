import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaBriefcase } from "react-icons/fa";
import AboutStudent from "./AboutStudent";
import AddStudent from "./AddStudent";
import StudentProfile from "./StudentProfile";
import PerformanceChart from "./PerformanceChart";
import BulkAddStudents from "./BulkAddStudents";

const AllStudents = () => {
  const RECENT_STUDENTS_COUNT = 3;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const [students, setStudents] = useState( [
  {
    id: "STU001",
    regNo: "717822F129",
    batch: "2021-2025",
    section: "A",
    department: "Computer Science",
    dob: "2003-05-18",
    gender: "Female",
    contact: "+1 555 123 4567",
    mail: "alice.johnson@example.com",
    address: "123 Main St, NY",
    adhar: "1234-5678-9012",
    tenthMark: "94%",
    twelfthMark: "92%",
    quota: "General",
    bloodGroup: "A+",
    parentName: "John Johnson",
    parentPhoneNo: "+1 555 789 1234",
    totalCredits: "140",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Alice Johnson",
    year: "3rd Year",
    semester: "Spring 2025",
    status: "Active",
    cgpa: 9.1,
    attendance: 92,
    bio: "Alice is a dedicated computer science student passionate about AI and machine learning.",
    placement: {
      company: "Google",
      location: "California",
      package: 18,
      position: "Software Engineer",
      date: "July 5, 2025",
      proof: "https://example.com/offer.pdf"
    }
  },
  {
    id: "STU002",
    regNo: "717822C101",
    batch: "2020-2024",
    section: "B",
    department: "CSE",
    dob: "2002-09-12",
    gender: "Male",
    contact: "+91 98765 43210",
    mail: "ravi.kumar@example.com",
    address: "4th Street, Chennai",
    adhar: "5678-1234-8765",
    tenthMark: "89%",
    twelfthMark: "",
    quota: "Management",
    bloodGroup: "B+",
    parentName: "Sundar Kumar",
    parentPhoneNo: "+91 99999 11111",
    totalCredits: "135",
    photo: "https://randomuser.me/api/portraits/men/31.jpg",
    name: "Ravi Kumar",
    year: "Final Year",
    semester: "Fall 2024",
    status: "Active",
    cgpa: 8.4,
    attendance: 88,
    bio: "Ravi is skilled in backend development and cloud computing.",
    placement: {
      company: "Infosys",
      location: "Bangalore",
      package: 7.5,
      position: "Backend Developer",
      date: "June 15, 2024",
      proof: "https://example.com/infosys_offer.pdf"
    }
  },
  {
    id: "STU003",
    regNo: "717822E203",
    batch: "2022-2026",
    section: "A",
    department: "ECE",
    dob: "2004-04-10",
    gender: "Female",
    contact: "+91 99888 11223",
    mail: "meena.raj@example.com",
    address: "Green Lane, Bangalore",
    adhar: "3456-7890-1234",
    tenthMark: "95%",
    twelfthMark: "91%",
    quota: "General",
    bloodGroup: "O+",
    parentName: "Latha Raj",
    parentPhoneNo: "+91 99876 54321",
    totalCredits: "60",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Meena Raj",
    year: "2nd Year",
    semester: "2nd Sem",
    status: "Active",
    cgpa: 9.3,
    attendance: 96,
    bio: "Meena has a strong interest in electronics and robotics.",
    placement: {
      company: "",
      location: "",
      package: null,
      position: "",
      date: "",
      proof: ""
    }
  },
  {
    id: "STU004",
    regNo: "717822A198",
    batch: "2019-2023",
    section: "C",
    department: "AIDS",
    dob: "2001-07-22",
    gender: "Male",
    contact: "+91 90000 12345",
    mail: "arun.v@example.com",
    address: "5th Cross, Coimbatore",
    adhar: "9876-5432-1010",
    tenthMark: "88%",
    twelfthMark: "86%",
    quota: "Management",
    bloodGroup: "AB+",
    parentName: "Venkatesh",
    parentPhoneNo: "+91 90009 87654",
    totalCredits: "150",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Arun V",
    year: "4th Year",
    semester: "Final Sem",
    status: "Active",
    cgpa: 8.9,
    attendance: 90,
    bio: "Arun is passionate about data science and machine learning.",
    placement: {
      company: "TCS",
      location: "Chennai",
      package: 6,
      position: "Data Analyst",
      date: "July 10, 2023",
      proof: "https://example.com/tcs_offer.pdf"
    }
  },
  {
    id: "STU005",
    regNo: "717822E401",
    batch: "2023-2027",
    section: "A",
    department: "EEE",
    dob: "2005-01-12",
    gender: "Female",
    contact: "+91 90909 12121",
    mail: "divya.r@example.com",
    address: "Main Road, Madurai",
    adhar: "2233-4455-6677",
    tenthMark: "93%",
    twelfthMark: "",
    quota: "General",
    bloodGroup: "B-",
    parentName: "Revathi Ramesh",
    parentPhoneNo: "+91 91234 56789",
    totalCredits: "20",
    photo: "https://randomuser.me/api/portraits/women/72.jpg",
    name: "Divya Ramesh",
    year: "1st Year",
    semester: "1st Sem",
    status: "Active",
    cgpa: 8.7,
    attendance: 85,
    bio: "Divya is exploring embedded systems and renewable energy projects.",
    placement: {
      company: "",
      location: "",
      package: null,
      position: "",
      date: "",
      proof: ""
    }
  },
  {
    id: "STU001",
    regNo: "717822F129",
    batch: "2021-2025",
    section: "A",
    department: "Computer Science",
    dob: "2003-05-18",
    gender: "Female",
    contact: "+1 555 123 4567",
    mail: "alice.johnson@example.com",
    address: "123 Main St, NY",
    adhar: "1234-5678-9012",
    tenthMark: "94%",
    twelfthMark: "92%",
    quota: "General",
    bloodGroup: "A+",
    parentName: "John Johnson",
    parentPhoneNo: "+1 555 789 1234",
    totalCredits: "140",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Alice Johnson",
    year: "3rd Year",
    semester: "Spring 2025",
    status: "Active",
    cgpa: 9.1,
    attendance: 92,
    bio: "Alice is a dedicated computer science student passionate about AI and machine learning.",
    placement: {
      company: "Google",
      location: "California",
      package: 18,
      position: "Software Engineer",
      date: "July 5, 2025",
      proof: "https://example.com/offer.pdf"
    }
  },
  {
    id: "STU002",
    regNo: "717822C101",
    batch: "2020-2024",
    section: "B",
    department: "CSE",
    dob: "2002-09-12",
    gender: "Male",
    contact: "+91 98765 43210",
    mail: "ravi.kumar@example.com",
    address: "4th Street, Chennai",
    adhar: "5678-1234-8765",
    tenthMark: "89%",
    twelfthMark: "",
    quota: "Management",
    bloodGroup: "B+",
    parentName: "Sundar Kumar",
    parentPhoneNo: "+91 99999 11111",
    totalCredits: "135",
    photo: "https://randomuser.me/api/portraits/men/31.jpg",
    name: "Ravi Kumar",
    year: "Final Year",
    semester: "Fall 2024",
    status: "Active",
    cgpa: 8.4,
    attendance: 88,
    bio: "Ravi is skilled in backend development and cloud computing.",
    placement: {
      company: "Infosys",
      location: "Bangalore",
      package: 7.5,
      position: "Backend Developer",
      date: "June 15, 2024",
      proof: "https://example.com/infosys_offer.pdf"
    }
  },
  {
    id: "STU003",
    regNo: "717822E203",
    batch: "2022-2026",
    section: "A",
    department: "ECE",
    dob: "2004-04-10",
    gender: "Female",
    contact: "+91 99888 11223",
    mail: "meena.raj@example.com",
    address: "Green Lane, Bangalore",
    adhar: "3456-7890-1234",
    tenthMark: "95%",
    twelfthMark: "91%",
    quota: "General",
    bloodGroup: "O+",
    parentName: "Latha Raj",
    parentPhoneNo: "+91 99876 54321",
    totalCredits: "60",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Meena Raj",
    year: "2nd Year",
    semester: "2nd Sem",
    status: "Active",
    cgpa: 9.3,
    attendance: 96,
    bio: "Meena has a strong interest in electronics and robotics.",
    placement: {
      company: "",
      location: "",
      package: null,
      position: "",
      date: "",
      proof: ""
    }
  },
  {
    id: "STU004",
    regNo: "717822A198",
    batch: "2019-2023",
    section: "C",
    department: "AIDS",
    dob: "2001-07-22",
    gender: "Male",
    contact: "+91 90000 12345",
    mail: "arun.v@example.com",
    address: "5th Cross, Coimbatore",
    adhar: "9876-5432-1010",
    tenthMark: "88%",
    twelfthMark: "86%",
    quota: "Management",
    bloodGroup: "AB+",
    parentName: "Venkatesh",
    parentPhoneNo: "+91 90009 87654",
    totalCredits: "150",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Arun V",
    year: "4th Year",
    semester: "Final Sem",
    status: "Active",
    cgpa: 8.9,
    attendance: 90,
    bio: "Arun is passionate about data science and machine learning.",
    placement: {
      company: "TCS",
      location: "Chennai",
      package: 6,
      position: "Data Analyst",
      date: "July 10, 2023",
      proof: "https://example.com/tcs_offer.pdf"
    }
  },
  {
    id: "STU005",
    regNo: "717822E401",
    batch: "2023-2027",
    section: "A",
    department: "EEE",
    dob: "2005-01-12",
    gender: "Female",
    contact: "+91 90909 12121",
    mail: "divya.r@example.com",
    address: "Main Road, Madurai",
    adhar: "2233-4455-6677",
    tenthMark: "93%",
    twelfthMark: "",
    quota: "General",
    bloodGroup: "B-",
    parentName: "Revathi Ramesh",
    parentPhoneNo: "+91 91234 56789",
    totalCredits: "20",
    photo: "https://randomuser.me/api/portraits/women/72.jpg",
    name: "Divya Ramesh",
    year: "1st Year",
    semester: "1st Sem",
    status: "Active",
    cgpa: 8.7,
    attendance: 85,
    bio: "Divya is exploring embedded systems and renewable energy projects.",
    placement: {
      company: "",
      location: "",
      package: null,
      position: "",
      date: "",
      proof: ""
    }
  }
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

  

  const departmentOptions = ["IT", "CSE", "ECE", "EEE", "AIDS"];
const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"];




  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
const filteredStudents = students.filter((s) => {
  const matchesYear = selectedYear === "All" || String(s.year) === String(selectedYear);
  const matchesDept = selectedDept === "All" || s.department === selectedDept;
  return matchesYear && matchesDept;
});

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
  value={selectedYear}
  onChange={(e) => setSelectedYear(e.target.value)}
>
  <option value="All">All Years</option>
  <option value="1st Year">1st Year</option>
  <option value="2nd Year">2nd Year</option>
  <option value="3rd Year">3rd Year</option>
  <option value="4th Year">4th Year</option>
  
</select>


          <div className="flex gap-2">
  <button
    className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black"
    onClick={() => {
      setEditingStudent(null);
      setShowAddModal(true);
    }}
  >
    <FaPlus /> Add Student
  </button>
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
    onClick={() => setShowBulkModal(true)}
  >
    📄 Bulk Upload
  </button>
</div>

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
              <th className="p-4 border-b border-gray-200">Department</th>
              <th className="p-4 border-b border-gray-200">Year</th>
              <th className="p-4 border-b border-gray-200">Email</th>
               <th className="p-4 border-b border-gray-200">Phone</th>
              
            </tr>
          </thead>
          <tbody>
  {currentStudents.map((s, idx) => (
    <tr
      key={idx}
      className="bg-white hover:bg-gray-50 transition border-b border-gray-100 cursor-pointer"
      onClick={() => setSelectedStudent(s)}
    >
      {/* Student ID */}
      <td className="p-4 font-medium text-gray-800 whitespace-nowrap">
        {s.id}
      </td>

      {/* Name + Profile Picture */}
      <td className="p-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={s.photo || "https://via.placeholder.com/40"} // Fallback to placeholder if no photo exists
            alt={s.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-700 hover:underline">{s.name}</span>
              {s.placement && <FaBriefcase className="text-green-600" title="Placed" />}
            </div>
          </div>
        </div>
      </td>

      {/* Department */}
      <td className="p-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-800">{s.department}</div>
      </td>

      {/* Year */}
      <td className="p-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-800">{s.year}</div>
      </td>

      {/* Email */}
      <td className="p-4 whitespace-nowrap text-sm text-gray-800">
        {s.email || s.mail}
      </td>

      {/* Phone */}
      <td className="p-4 whitespace-nowrap text-sm text-gray-800">{s.contact}</td>
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
            <img 
              src={s.photo || "https://via.placeholder.com/150"} // Use s.photo and fallback to placeholder if missing
              alt={s.name} 
              className="w-12 h-12 rounded-full object-cover" 
            />
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
      {showBulkModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg">
      <button
        onClick={() => setShowBulkModal(false)}
        className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl"
      >
        &times;
      </button>
      <BulkAddStudents
        onClose={() => setShowBulkModal(false)}
        onBulkAdd={(bulkList) => {
          const startIndex = students.length + 1;
          const newStudents = bulkList.map((s, i) => ({
            ...s,
            id: `STU${String(startIndex + i).padStart(3, "0")}`,
          }));
          setStudents([...students, ...newStudents]);
          setShowBulkModal(false);
        }}
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

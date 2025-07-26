import React, { useState } from "react";
import * as XLSX from "xlsx";

// Exam Schedule Component
function ExamSchedule() {
  const semesterCoursesMap = {
    "1": ["Mathematics I", "Physics", "Chemistry"],
    "2": ["Mathematics II", "Programming in C", "Engineering Graphics"],
    "3": ["Data Structures", "Digital Electronics", "Computer Networks"],
    "4": ["OOPs with Java", "DBMS", "Operating Systems"],
    "5": ["Web Development", "Software Engineering", "AI Basics"],
    "6": ["Machine Learning", "Compiler Design", "Cloud Computing"],
  };

  const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [courseSchedules, setCourseSchedules] = useState([]);

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setSemester("");
    setCourseSchedules([]);
  };

  const handleSemesterChange = (e) => {
    const selectedSem = e.target.value;
    setSemester(selectedSem);
    const courses = semesterCoursesMap[selectedSem] || [];
    setCourseSchedules(
      courses.map((course) => ({
        course,
        date: "",
        time: "",
        semester: selectedSem,
        department,
      }))
    );
  };

  const handleCourseChange = (index, field, value) => {
    const updated = [...courseSchedules];
    updated[index][field] = value;
    setCourseSchedules(updated);
  };

  const handleSubmit = () => {
    if (!department || !semester) {
      alert("Please select both department and semester.");
      return;
    }

    if (courseSchedules.some((c) => !c.date || !c.time)) {
      alert("Please fill date and time for all courses.");
      return;
    }

    console.log("Submitted Schedule:", courseSchedules);
    alert("Exam Schedule Submitted!");
    setDepartment("");
    setSemester("");
    setCourseSchedules([]);
  };

  return (
    <div className="mt-6 w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">📅 Exam Schedule</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={department}
          onChange={handleDepartmentChange}
          className="border px-3 py-2 rounded shadow-sm"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={semester}
          onChange={handleSemesterChange}
          disabled={!department}
          className="border px-3 py-2 rounded shadow-sm"
        >
          <option value="">Select Semester</option>
          {Object.keys(semesterCoursesMap).map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>

      {courseSchedules.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border font-medium">Course</th>
                <th className="p-3 border font-medium">Date</th>
                <th className="p-3 border font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {courseSchedules.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.course}</td>
                  <td className="p-3 border">
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) =>
                        handleCourseChange(index, "date", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                  </td>
                  <td className="p-3 border">
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) =>
                        handleCourseChange(index, "time", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md"
            >
              Submit Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// Marks Upload Component (same as before)
function MarksUpload() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    section: "",
    year: "",
    semester: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const formattedData = rows.map((row) => ({
        name: row.Name || "",
        regNo: row["Reg No"] || "",
        department: row.Department || "",
        section: row.Section || "",
        year: row.Year || "",
        semester: row.Semester || "",
        courseCode: row["Course Code"] || "",
        courseTitle: row["Course Title"] || "",
        credits: row.Credits || "",
        gradePoint: row["Grade Point"] || "",
        letterGrade: row["Letter Grade"] || "",
      }));

      setStudents(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredStudents = students.filter((student) => {
    return (
      (!filters.department || student.department === filters.department) &&
      (!filters.section || student.section === filters.section) &&
      (!filters.year || student.year === filters.year) &&
      (!filters.semester || student.semester === filters.semester)
    );
  });

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      alert("No students to submit.");
      return;
    }
    console.log("Submitting the following marks:", filteredStudents);
    alert("Marks submitted successfully!");
  };

  const getUnique = (key) => [...new Set(students.map((s) => s[key]))];

  return (
    <div className="mt-6 w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">📝 Upload Marks</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
        <span className="text-gray-600 text-sm">📁 Upload Excel File</span>
      </div>

      {students.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["department", "section", "year", "semester"].map((key) => (
            <select
              key={key}
              name={key}
              value={filters[key]}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All {key.charAt(0).toUpperCase() + key.slice(1)}s</option>
              {getUnique(key).map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {filteredStudents.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border font-medium">Reg No</th>
                  <th className="p-3 border font-medium">Name</th>
                  <th className="p-3 border font-medium">Course Code</th>
                  <th className="p-3 border font-medium">Course Title</th>
                  <th className="p-3 border font-medium">Credits</th>
                  <th className="p-3 border font-medium">Grade Point</th>
                  <th className="p-3 border font-medium">Letter Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 text-center">
                    <td className="p-3 border">{student.regNo}</td>
                    <td className="p-3 border">{student.name}</td>
                    <td className="p-3 border">{student.courseCode}</td>
                    <td className="p-3 border">{student.courseTitle}</td>
                    <td className="p-3 border">{student.credits}</td>
                    <td className="p-3 border">{student.gradePoint}</td>
                    <td className="p-3 border">{student.letterGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md"
            >
              Submit Marks
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Admin Exam Interface
export default function AdminExamInterface() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-10 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin - Exam Management</h1>
      </div>

      <div className="flex space-x-10 border-b border-gray-300 mb-6 text-lg">
        <button
          onClick={() => setActiveTab("schedule")}
          className={`pb-2 ${
            activeTab === "schedule"
              ? "text-blue-700 border-b-2 border-blue-700 font-medium"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          Exam Schedule
        </button>
        <button
          onClick={() => setActiveTab("marks")}
          className={`pb-2 ${
            activeTab === "marks"
              ? "text-blue-700 border-b-2 border-blue-700 font-medium"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          Marks Upload
        </button>
      </div>

      {activeTab === "schedule" && <ExamSchedule />}
      {activeTab === "marks" && <MarksUpload />}
    </div>
  );
}

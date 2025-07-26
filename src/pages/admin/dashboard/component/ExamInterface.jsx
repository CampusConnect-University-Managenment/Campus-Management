import React, { useState } from "react";
import * as XLSX from "xlsx";

function ExamSchedule() {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    exam: "",
    date: "",
    time: "",
    venue: "",
    students: "",
  });

  const handleChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (
      newExam.exam &&
      newExam.date &&
      newExam.time &&
      newExam.venue &&
      newExam.students
    ) {
      setExams([...exams, newExam]);
      setNewExam({ exam: "", date: "", time: "", venue: "", students: "" });
    }
  };

  return (
    <div className="mt-6 max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">📅 Exam Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          name="exam"
          value={newExam.exam}
          onChange={handleChange}
          placeholder="Exam"
          className="border px-3 py-2 rounded shadow-sm"
        />
        <input
          name="date"
          value={newExam.date}
          onChange={handleChange}
          type="date"
          className="border px-3 py-2 rounded shadow-sm"
        />
        <input
          name="time"
          value={newExam.time}
          onChange={handleChange}
          type="time"
          className="border px-3 py-2 rounded shadow-sm"
        />
        <input
          name="venue"
          value={newExam.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="border px-3 py-2 rounded shadow-sm"
        />
        <input
          name="students"
          value={newExam.students}
          onChange={handleChange}
          placeholder="Students"
          className="border px-3 py-2 rounded shadow-sm"
        />
      </div>
      <button
        onClick={handleAdd}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Add Exam
      </button>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border font-medium">Exam</th>
              <th className="p-3 border font-medium">Date</th>
              <th className="p-3 border font-medium">Time</th>
              <th className="p-3 border font-medium">Venue</th>
              <th className="p-3 border font-medium">Students</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border">{item.exam}</td>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">{item.time}</td>
                <td className="p-3 border">{item.venue}</td>
                <td className="p-3 border">{item.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
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
                <option key={i} value={val}>{val}</option>
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

export default function AdminExamInterface() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-10 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin - Exam Management</h1>
        {/* <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button> */}
      </div>

      {/* Tabs */}
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

      {/* Content */}
      {activeTab === "schedule" && <ExamSchedule />}
      {activeTab === "marks" && <MarksUpload />}
    </div>
  );
}

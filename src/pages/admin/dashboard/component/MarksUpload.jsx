import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function MarksUpload() {
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

    // Replace with your backend API call
    console.log("Submitting the following marks:", filteredStudents);
    alert("Marks submitted successfully!");
  };

  // Get unique values for dropdowns
  const getUnique = (key) => [...new Set(students.map((s) => s[key]))];

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-16 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59]  mb-2">
        Upload  Marks
      </h2>
      

      {/* Upload file */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4  mt-10 mb-6">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
        <span className="text-gray-600 text-sm">📁 Upload Excel File</span>
      </div>

      {/* Filters */}
      {students.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">All Departments</option>
            {getUnique("department").map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          <select
            name="section"
            value={filters.section}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">All Sections</option>
            {getUnique("section").map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>

          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">All Years</option>
            {getUnique("year").map((y, i) => (
              <option key={i} value={y}>{y}</option>
            ))}
          </select>

          <select
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">All Semesters</option>
            {getUnique("semester").map((sem, i) => (
              <option key={i} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
      )}

      {/* Table */}
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

          {/* Submit */}
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

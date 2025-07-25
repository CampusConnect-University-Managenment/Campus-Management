import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function MarksUpload() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    section: "",
    year: "",
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
        name: row.name || row.Name || "",
        department: row.department || row.Department || "",
        section: row.section || row.Section || "",
        year: row.year || row.Year || "",
        subject: row.subject || row.Subject || "",
        marks: row.marks || row.Marks || "",
      }));

      setStudents(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      alert("No students to submit.");
      return;
    }

    // You can replace this with API call
    console.log("Submitted Students:", filteredStudents);
    alert("Submitted successfully!");
  };

  const filteredStudents = students.filter((student) => {
    return (
      (!filters.department || student.department === filters.department) &&
      (!filters.section || student.section === filters.section) &&
      (!filters.year || String(student.year) === filters.year)
    );
  });

  const departments = [...new Set(students.map((s) => s.department))];
  const sections = [...new Set(students.map((s) => s.section))];
  const years = [...new Set(students.map((s) => String(s.year)))];

  return (
    <div className="mt-[80px] min-h-screen bg-gray-100 px-6 py-16 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📊 Marks Upload
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Upload student marks via Excel (.xlsx)
      </p>

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-8">
        {/* File Upload */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          <span className="text-gray-600 text-sm">📁 Upload Excel File</span>
        </div>

        {/* Dropdown Filters */}
        {students.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Departments</option>
              {departments.map((d, idx) => (
                <option key={idx} value={d}>{d}</option>
              ))}
            </select>

            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Sections</option>
              {sections.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>

            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Years</option>
              {years.map((y, idx) => (
                <option key={idx} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {/* Table Display */}
        {filteredStudents.length > 0 && (
          <>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 border font-medium">Student</th>
                    <th className="p-3 border font-medium">Department</th>
                    <th className="p-3 border font-medium">Section</th>
                    <th className="p-3 border font-medium">Year</th>
                    <th className="p-3 border font-medium">Subject</th>
                    <th className="p-3 border font-medium">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border">{item.name}</td>
                      <td className="p-3 border">{item.department}</td>
                      <td className="p-3 border">{item.section}</td>
                      <td className="p-3 border">{item.year}</td>
                      <td className="p-3 border">{item.subject}</td>
                      <td className="p-3 border">{item.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
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
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import * as XLSX from "xlsx";

const FacultyMarksUpdate = () => {
  const [students, setStudents] = useState([]);
  const [exam, setExam] = useState("");
  const [subExam, setSubExam] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subExamOptions = {
    "Unit Test": ["Unit Test 1", "Unit Test 2"],
    "Internals": ["Internal 1", "Internal 2"],
    "Lab": ["Model Lab", "End Semester Lab"],
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = [".xlsx", ".xls"];
    const fileName = file.name.toLowerCase();
    const isExcel = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isExcel) {
      alert("Only Excel files (.xlsx or .xls) are allowed.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, {
        header: ["name", "marks"],
        defval: "",
      });
      data.shift(); // Remove header row
      const formatted = data.map((row) => ({
        name: row.name || "",
        marks: row.marks !== undefined ? String(row.marks) : "",
      }));
      setStudents(formatted);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!exam || !subExam) {
      alert("Please select exam and sub-exam.");
      return;
    }

    if (students.some((s) => !s.name || s.marks === "")) {
      alert("Please fill all student fields.");
      return;
    }

    console.log("Exam:", exam);
    console.log("Sub Exam:", subExam);
    console.log("Student Marks:", students);
    alert("Marks submitted (simulation)");
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      <br />
      <br />
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <FaClipboardList className="text-indigo-600 text-4xl" />
          <h2 className="text-3xl font-semibold text-[#2e3a59]">Marks Upload</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <select
            value={exam}
            onChange={(e) => {
              setExam(e.target.value);
              setSubExam("");
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Exam</option>
            <option value="Unit Test">Unit Test</option>
            <option value="Internals">Internals</option>
            <option value="Lab">Lab</option>
          </select>

          {exam && subExamOptions[exam] && (
            <select
              value={subExam}
              onChange={(e) => setSubExam(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select {exam} Type</option>
              {subExamOptions[exam].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Excel Upload */}
        <div className="my-4">
          <label className="block mb-2 font-semibold text-gray-700">Upload Excel File</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
            className="border p-2 rounded w-full"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-50 text-indigo-700">
                <tr>
                  <th className="text-left px-6 py-3">Student Name</th>
                  <th className="text-center px-6 py-3">Marks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-t hover:bg-indigo-50 transition duration-150">
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={student.name}
                        readOnly
                        className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="text-center px-6 py-3">
                      <input
                        type="number"
                        value={student.marks}
                        onChange={(e) => handleInputChange(index, "marks", e.target.value)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="0"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
            >
              Submit Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyMarksUpdate;

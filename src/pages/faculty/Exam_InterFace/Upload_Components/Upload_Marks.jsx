import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import * as XLSX from "xlsx";

const FacultyMarksUpdate = () => {
  const [students, setStudents] = useState([]);
  const [exam, setExam] = useState("");
  const [subExam, setSubExam] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName || "Course Title";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subExamOptions = {
    "Unit Test": ["Unit Test 1", "Unit Test 2"],
    Internals: ["Internal 1", "Internal 2"],
    Lab: ["Model Lab", "End Semester Lab"],
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, {
        header: ["name", "marks"],
        defval: "",
      });
      data.shift(); // remove header
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
    if (!exam || !subExam) return alert("Please select exam and sub-exam.");
    if (students.some((s) => !s.name || s.marks === ""))
      return alert("Please complete all student fields.");
    console.log("Exam:", exam, "Sub Exam:", subExam, "Marks:", students);
    alert("Marks submitted!");
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f8faff] px-6 py-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">{courseName}</h1>
        <button
          onClick={() => navigate("/faculty/Course")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex space-x-8 mb-8 text-lg">
        <button
          onClick={() =>
            navigate("/faculty/ExamInterFace/view-material", { state: { courseName } })
          }
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Study Materials
        </button>
        <button
          onClick={() =>
            navigate("/faculty/ExamInterFace/view-question", { state: { courseName } })
          }
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Question Papers
        </button>
        <button
          onClick={() =>
            navigate("/faculty/ExamInterFace/view-assignment", { state: { courseName } })
          }
          className="pb-2 text-gray-700 hover:text-blue-600"
        >
          Assignments
        </button>
        <button className="pb-2 text-blue-600 font-semibold border-b-2 border-blue-600">
          Upload Marks
        </button>
      </div>

      {/* Card Container */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <FaClipboardList className="text-blue-600 text-3xl" />
          <h2 className="text-2xl font-semibold text-gray-800">Upload Marks</h2>
        </div>

        {/* Select Exam */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select
            value={exam}
            onChange={(e) => {
              setExam(e.target.value);
              setSubExam("");
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Exam</option>
            <option value="Unit Test">Unit Test</option>
            <option value="Internals">Internals</option>
            <option value="Lab">Lab</option>
          </select>

          {exam && (
            <select
              value={subExam}
              onChange={(e) => setSubExam(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select {exam} Type</option>
              {subExamOptions[exam].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          )}
        </div>

        {/* Excel Upload */}
        <div className="mb-6">
          <label className="font-medium text-gray-700 block mb-1">
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Table */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="px-6 py-3 text-left">Student Name</th>
                  <th className="px-6 py-3 text-center">Marks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t text-sm hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        readOnly
                        value={student.name}
                        className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <input
                        type="number"
                        placeholder="0"
                        value={student.marks}
                        onChange={(e) =>
                          handleInputChange(index, "marks", e.target.value)
                        }
                        className="w-20 px-3 py-2 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
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
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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

import React, { useState, useEffect } from "react";

const ResultsPortal = () => {
  const [studentData, setStudentData] = useState(null);
  const [studentRollNo, setStudentRollNo] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get Roll No from localStorage on mount
  useEffect(() => {
    const roll = localStorage.getItem("studentRollNo");
    if (roll) {
      setStudentRollNo(roll);
      console.log("Loaded Roll No from localStorage:", roll);
    } else {
      console.warn("⚠️ No roll number found in localStorage");
    }
  }, []);

  // ✅ Fetch Student Info
  useEffect(() => {
    if (!studentRollNo) return;

    const fetchStudent = async () => {
      try {
        console.log("📡 Fetching student info for:", studentRollNo);
        const res = await fetch(
          `http://localhost:8080/api/admin/students/rollno/${studentRollNo}`
        );
        if (!res.ok) throw new Error("Student not found");
        const json = await res.json();
        console.log("✅ Student API Response:", json);
        setStudentData(json.data);
      } catch (err) {
        console.error("❌ Error fetching student data:", err);
      }
    };

    fetchStudent();
  }, [studentRollNo]);

  // ✅ Fetch Results when semester changes
  useEffect(() => {
    if (!selectedSemester || !studentRollNo) {
      console.log(
        "⏩ Skipping results fetch. Semester:",
        selectedSemester,
        "Roll:",
        studentRollNo
      );
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);

        // 👇 Fix: convert sem to "4.0" format to match DB
        const semValue = `${selectedSemester}.0`;

        console.log("📡 Fetching results for", studentRollNo, "Sem", semValue);

        const res = await fetch(
          `http://localhost:5005/api/results/${studentRollNo}/${semValue}`
        );

        if (!res.ok) throw new Error("Results not found");

        const json = await res.json();
        console.log("✅ Results API Response:", json);

        // adjust based on backend response
        setMarks(json.data ?? json ?? []);
      } catch (err) {
        console.error("❌ Error fetching results:", err);
        setMarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedSemester, studentRollNo]);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 bg-white print:pt-0 print:pb-0 print:px-0 print:bg-white">
      

      {/* Header */}
      <div className="text-center print:block">
        <h1 className="text-3xl font-bold text-blue-600 uppercase mb-2 print:text-2xl">
          RESULTS PORTAL
        </h1>
        <p className="text-lg text-gray-600 mb-4 print:text-base">
          To view your semester marks
        </p>

        {/* Dropdown */}
        <div className="inline-flex items-center gap-2 mb-4 print:hidden">
          <select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              console.log("🎓 Semester selected:", e.target.value);
            }}
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Choose Semester --</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Info */}
      {studentData && (
        <div className="max-w-6xl mx-auto print:max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded shadow text-sm">
              <p className="text-gray-500 mb-1">Name</p>
              <p className="font-semibold text-gray-900">
                {studentData?.studentFirstname || "--"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow text-sm">
              <p className="text-gray-500 mb-1">Reg No</p>
              <p className="font-semibold text-gray-900">
                {studentData?.studentRollNo || "--"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow text-sm">
              <p className="text-gray-500 mb-1">Semester</p>
              <p className="font-semibold text-gray-900">
                {selectedSemester || "--"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {selectedSemester && (
        <div className="max-w-6xl mx-auto print:max-w-full">
          {loading ? (
            <div className="text-center text-blue-600 font-medium">
              Loading results...
            </div>
          ) : marks.length === 0 ? (
            <div className="text-center text-red-600 font-medium border border-red-300 p-4 rounded">
              No record found for{" "}
              <span className="font-bold">Semester {selectedSemester}</span>
            </div>
          ) : (
            <table className="w-full border border-gray-400 text-sm shadow print:text-xs print:shadow-none">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-3 py-2">Sem No</th>
                  <th className="border px-3 py-2">Course Code</th>
                  <th className="border px-3 py-2">Course Title</th>
                  <th className="border px-3 py-2">Credits</th>
                  <th className="border px-3 py-2">Grade Point</th>
                  <th className="border px-3 py-2">Letter Grade</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border px-3 py-2 text-center">
                      {selectedSemester}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {item.courseCode}
                    </td>
                    <td className="border px-3 py-2">{item.courseTitle}</td>
                    <td className="border px-3 py-2 text-center">
                      {item.credits}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {item.gradePoints}
                    </td>
                    <td className="border px-3 py-2">{item.letterGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Disclaimer */}
          <p className="text-xs mt-6 text-center text-gray-600">
            Disclaimer: Candidates are requested to verify the original
            marksheet for correctness.
          </p>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-4 mt-6 print:hidden">
            <button
              onClick={() => setSelectedSemester("")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPortal;



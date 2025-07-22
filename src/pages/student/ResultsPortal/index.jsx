import React, { useState, useEffect } from "react";
import './index.css';
// Dummy Data
const dummyMarksData = {
  "Semester 1": [
    { courseCode: "21MA11", title: "Engineering Mathematics - I", credits: 5.0, gradePoint: 9.0, letterGrade: "A+ : Excellent" },
    { courseCode: "21PH11", title: "Engineering Physics - I", credits: 5.0, gradePoint: 8.0, letterGrade: "A : Very Good" },
    { courseCode: "21CH11", title: "Engineering Chemistry", credits: 5.0, gradePoint: 7.0, letterGrade: "B+ : Good" },
  ],
  "Semester 2": [
    { courseCode: "21OB21", title: "Engineering Physics", credits: 5.0, gradePoint: 9.0, letterGrade: "A+ : Excellent" },
    { courseCode: "21OB02", title: "Vector Calculus and Integral Transforms", credits: 5.0, gradePoint: 9.0, letterGrade: "A+ : Excellent" },
    { courseCode: "21OA12", title: "Technical English - II", credits: 4.0, gradePoint: 8.0, letterGrade: "A : Very Good" },
    { courseCode: "21OA51", title: "Heritage of Tamils / தமிழர் மரபு", credits: 1.0, gradePoint: 8.0, letterGrade: "A : Very Good" },
    { courseCode: "21PC12", title: "Fundamentals of Web Scripting", credits: 4.0, gradePoint: 10.0, letterGrade: "O : Outstanding" },
    { courseCode: "21PC04", title: "Advanced C Programming", credits: 5.0, gradePoint: 10.0, letterGrade: "O : Outstanding" },
  ],
  "Semester 3": [],
  "Semester 4": [],
  "Semester 5": [],
};

const ResultsPortal = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (selectedSemester) {
      setMarks(dummyMarksData[selectedSemester] || []);
    }
  }, [selectedSemester]);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 bg-white print:pt-0 print:pb-0 print:px-0 print:bg-white">
      {/* Header */}
      <div className="text-center print:block">
        <h1 className="text-3xl font-bold text-blue-600 uppercase mb-2 print:text-2xl">ACADEMIX</h1>
        <p className="text-lg text-gray-600 mb-4 print:text-base">
        To view your semester marks 
        </p>

        {/* Dropdown */}
        <div className="inline-flex items-center gap-2 mb-4 print:hidden">
          {/* <label className="font-semibold text-base text-gray-700">Select Semester:</label> */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Choose Semester --</option>
            {Object.keys(dummyMarksData).map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
      </div>
       <div className="max-w-6xl mx-auto print:max-w-full">
          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded shadow text-sm">
              <p className="text-gray-500 mb-1">Name</p>
              <p className="font-semibold text-gray-900">Riya S</p>
       
            </div>
            <div className="bg-gray-50 p-4 rounded shadow text-sm">
                     <p className="text-gray-500 mb-1">Reg No</p>
              <p className="font-semibold text-gray-900">717822P346</p>
            </div>
             
           <div className="bg-gray-50 p-4 rounded shadow text-sm">
              <p className="text-gray-500 mb-1">Semester</p>
              <p className="font-semibold text-gray-900">
  {selectedSemester ? selectedSemester.split(" ")[1] : "--"}
</p>

            </div>
            </div>
          </div>
      {/* Result Area */}
      {selectedSemester && (

          <div className="max-w-6xl mx-auto print:max-w-full">
            <div className="print-container avoid-page-break">
 
 </div>
          {/* Table or No Record Message */}
              <div className="max-w-6xl mx-auto print:max-w-full">
          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
         </div></div>
          {marks.length === 0 ? (
            <div className="text-center text-red-600 font-medium border border-red-300 p-4 rounded">
              No record found for <span className="font-bold">{selectedSemester}</span>
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
                    <td className="border px-3 py-2 text-center">{selectedSemester.split(" ")[1]}</td>
                    <td className="border px-3 py-2 text-center">{item.courseCode}</td>
                    <td className="border px-3 py-2">{item.title}</td>
                    <td className="border px-3 py-2 text-center">{item.credits}</td>
                    <td className="border px-3 py-2 text-center">{item.gradePoint}</td>
                    <td className="border px-3 py-2">{item.letterGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Disclaimer */}
          <p className="text-xs mt-6 text-center text-gray-600">
            Disclaimer: Candidates are requested to verify the original marksheet for correctness.
          </p>

          {/* Print Button */}
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

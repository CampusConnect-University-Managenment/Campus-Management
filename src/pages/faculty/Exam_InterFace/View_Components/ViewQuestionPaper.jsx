import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";

// Sample data
const questionPapers = [
  {
    name: "Unit Test - 1",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "A",
    url: "/files/unit-test-1.pdf",
  },
  {
    name: "Mid Term - 2023",
    type: "pdf",
    year: "Second",
    department: "ECE",
    section: "B",
    url: "/files/mid-term-2023.pdf",
  },
  {
    name: "Model Exam",
    type: "docx",
    year: "Third",
    department: "CSE",
    section: "A",
    url: "/files/model-exam.docx",
  },
  {
    name: "End Semester - 2022",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "C",
    url: "/files/endsem-2022.pdf",
  },
  {
    name: "Unit Test - II",
    type: "docx",
    year: "First",
    department: "CIVIL",
    section: "B",
    url: "/files/unit-test-2.docx",
  },
  {
    name: "Lab Exam Questions",
    type: "pdf",
    year: "Second",
    department: "CSE",
    section: "B",
    url: "/files/lab-exam.pdf",
  },
  {
    name: "CAT - 1",
    type: "pdf",
    year: "Third",
    department: "ECE",
    section: "C",
    url: "/files/cat1-ece.pdf",
  },
  {
    name: "CAT - 2",
    type: "docx",
    year: "Final",
    department: "MECH",
    section: "A",
    url: "/files/cat2-mech.docx",
  },
  {
    name: "Internal Assessment 1",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "C",
    url: "/files/internal1-cse.pdf",
  },
  {
    name: "Internal Assessment 2",
    type: "pdf",
    year: "Second",
    department: "ECE",
    section: "A",
    url: "/files/internal2-ece.pdf",
  },
  {
    name: "Semester Exam - Mathematics",
    type: "docx",
    year: "Third",
    department: "CIVIL",
    section: "A",
    url: "/files/sem-math-civil.docx",
  },
  {
    name: "Database Systems Midterm",
    type: "pdf",
    year: "Second",
    department: "CSE",
    section: "B",
    url: "/files/dbms-midterm.pdf",
  },
  {
    name: "Thermodynamics Final",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "B",
    url: "/files/thermo-final.pdf",
  },
  {
    name: "Surveying Model Exam",
    type: "docx",
    year: "Third",
    department: "CIVIL",
    section: "C",
    url: "/files/surveying-model.docx",
  },
  {
    name: "Compiler Design Test",
    type: "pdf",
    year: "Final",
    department: "CSE",
    section: "A",
    url: "/files/compiler-test.pdf",
  },
];

const ViewQuestionPaper = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      <br />
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📄 View Question Papers
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Download previous question papers.
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/faculty/ExamInterFace/upload-question")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +Add new 
        </button>
      </div><br/>

      {/* File List */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {questionPapers.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {file.type === "pdf" ? (
                  <FaFilePdf className="text-red-600 text-xl" />
                ) : (
                  <FaFileWord className="text-blue-600 text-xl" />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.year} Year • {file.department} • Section {file.section}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                download
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 text-sm"
              >
                <FaDownload /> Download
              </a>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default ViewQuestionPaper;

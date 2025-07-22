import React from "react";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";

const questionPapers = [
  {
    name: "Unit Test - 1",
    type: "pdf",
    url: "/files/unit-test-1.pdf",
  },
  {
    name: "Mid Term - 2023",
    type: "pdf",
    url: "/files/mid-term-2023.pdf",
  },
  {
    name: "Model Exam",
    type: "docx",
    url: "/files/model-exam.docx",
  },
];

const ViewQuestionPaper = () => {
  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📄 View Question Papers
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Browse or download previous question papers.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {questionPapers.map((file, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            {file.type === "pdf" ? (
              <FaFilePdf className="text-red-600 text-5xl mb-3" />
            ) : (
              <FaFileWord className="text-blue-600 text-5xl mb-3" />
            )}
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{file.name}</h3>
            <a
              href={file.url}
              download
              className="mt-auto inline-flex items-center gap-2 text-sm text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              <FaDownload /> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewQuestionPaper;

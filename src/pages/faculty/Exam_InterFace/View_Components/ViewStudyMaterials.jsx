import React from "react";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";

const studyMaterials = [
  {
    name: "Week 1 - Introduction Notes",
    type: "pdf",
    url: "/files/week1-intro.pdf",
  },
  {
    name: "Chapter 2 - Summary",
    type: "docx",
    url: "/files/chapter2-summary.docx",
  },
  {
    name: "Lecture Slides - Unit 3",
    type: "pdf",
    url: "/files/unit3-slides.pdf",
  },
];

const ViewStudyMaterial = () => {
  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📘 View Study Materials
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Access uploaded notes, slides, and reference materials.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {studyMaterials.map((file, idx) => (
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

export default ViewStudyMaterial;

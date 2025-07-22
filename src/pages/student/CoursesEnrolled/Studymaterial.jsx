import React from "react";
import { useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

const studyMaterials = [
  {
    id: 1,
    title: "FSJ-A1-Git",
    url: "/pdfs/FSJ-A1-Git.pdf"
  },
  {
    id: 2,
    title: "FSJ-A2-Core Java 1",
    url: "/pdfs/FSJ-A2-Core-Java-1.pdf"
  },
  {
    id: 3,
    title: "FSJ-A3-Core Java 2",
    url: "/pdfs/FSJ-A3-Core-Java-2.pdf"
  },
  {
    id: 4,
    title: "FSJ-A4-Adv. Java 1",
    url: "/pdfs/FSJ-A4-Adv-Java-1.pdf"
  },
  {
    id: 5,
    title: "FSJ-A5-DBMS",
    url: "/pdfs/FSJ-A5-DBMS.pdf"
  },
];

export default function Studymaterial() {
  const location = useLocation();
  const course = location.state?.course;

  return (
    <div className="p-6">
      {course && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-1">{course.courseName}</h2>
          <p className="text-gray-600">Faculty: {course.faculty}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">📘 Study Materials</h2>
      <div className="space-y-4">
        {studyMaterials.map((material) => (
          <div
            key={material.id}
            className="flex items-center space-x-4 p-4 bg-blue-100 rounded-md shadow-sm hover:bg-blue-200 transition"
          >
            <div className="bg-blue-500 p-3 rounded-full text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">PDF</p>
              <a
                href={material.url}
                download
                className="text-blue-800 font-medium hover:underline"
              >
                {material.title}
              </a>
            </div>
            <a
              href={material.url}
              download
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

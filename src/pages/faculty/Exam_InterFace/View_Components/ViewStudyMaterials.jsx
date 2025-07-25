import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Sample data (you can load this dynamically later)
const studyMaterials = [
  {
    name: "Week 1 - Introduction Notes",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "A",
    url: "/files/week1-intro.pdf",
  },
  {
    name: "Chapter 2 - Summary",
    type: "docx",
    year: "Second",
    department: "ECE",
    section: "B",
    url: "/files/chapter2-summary.docx",
  },
  {
    name: "Lecture Slides - Unit 3",
    type: "pdf",
    year: "Third",
    department: "CSE",
    section: "A",
    url: "/files/unit3-slides.pdf",
  },
  {
    name: "Unit 5 - Advanced Topics",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "C",
    url: "/files/unit5-mech.pdf",
  },
  {
    name: "Lab Manual - Semester 2",
    type: "docx",
    year: "Second",
    department: "CIVIL",
    section: "B",
    url: "/files/lab-manual-civil.docx",
  },
  {
    name: "Maths Formulas Sheet",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "B",
    url: "/files/maths-formulas.pdf",
  },
  {
    name: "Python Programming Notes",
    type: "docx",
    year: "Second",
    department: "CSE",
    section: "A",
    url: "/files/python-notes.docx",
  },
  {
    name: "Digital Electronics Charts",
    type: "pdf",
    year: "Third",
    department: "ECE",
    section: "C",
    url: "/files/digital-charts.pdf",
  },
  {
    name: "Thermodynamics Lecture",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "B",
    url: "/files/thermo-lecture.pdf",
  },
  {
    name: "Surveying Lab Record",
    type: "docx",
    year: "Third",
    department: "CIVIL",
    section: "A",
    url: "/files/surveying-lab.docx",
  },
  {
    name: "C++ Programming Guide",
    type: "pdf",
    year: "First",
    department: "CSE",
    section: "C",
    url: "/files/cpp-guide.pdf",
  },
  {
    name: "Signal Processing Notes",
    type: "docx",
    year: "Second",
    department: "ECE",
    section: "A",
    url: "/files/signal-processing.docx",
  },
  {
    name: "Machine Design Notes",
    type: "pdf",
    year: "Final",
    department: "MECH",
    section: "A",
    url: "/files/machine-design.pdf",
  },
  {
    name: "Strength of Materials",
    type: "pdf",
    year: "Third",
    department: "CIVIL",
    section: "B",
    url: "/files/strength-materials.pdf",
  },
  {
    name: "Operating Systems Notes",
    type: "docx",
    year: "Second",
    department: "CSE",
    section: "B",
    url: "/files/os-notes.docx",
  },
];


const ViewStudyMaterial = () => {
  const [filters, setFilters] = useState({
    year: "All",
    department: "All",
    section: "All",
  });
  const navigate = useNavigate();
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredMaterials = studyMaterials.filter((file) => {
    return (
      (filters.year === "All" || file.year === filters.year) &&
      (filters.department === "All" || file.department === filters.department) &&
      (filters.section === "All" || file.section === filters.section)
    );
  });

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📘 View Study Materials
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Filter and download uploaded notes, slides, lab manuals, etc.
      </p>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
        >
          <option value="All">All Years</option>
          <option value="First">First Year</option>
          <option value="Second">Second Year</option>
          <option value="Third">Third Year</option>
          <option value="Final">Final Year</option>
        </select>

        <select
          value={filters.department}
          onChange={(e) => handleFilterChange("department", e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <select
          value={filters.section}
          onChange={(e) => handleFilterChange("section", e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
        >
          <option value="All">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>

      {/* File List */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredMaterials.map((file, idx) => (
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
          {filteredMaterials.length === 0 && (
            <li className="text-center text-gray-500 px-6 py-6">
              No study materials found for selected filters.
            </li>
            
          )}
        </ul>
      </div><br/>
      <br/><button
        onClick={() => navigate("/faculty/ExamInterFace/upload-material")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Upload new studyMaterial
      </button>
      
      <div className="flex justify-end p-4">
      <button
        onClick={() => navigate("/faculty/ExamInterFace/upload-marks")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Upload marks
      </button>
      </div>

    </div>
  );
};

export default ViewStudyMaterial;

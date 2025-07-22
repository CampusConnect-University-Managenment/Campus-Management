import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

const UploadStudyMaterial = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: "",
    year: "",
    section: "",
    subject: "",
    category: "notes",
    date: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { department, year, section, subject, file, date } = formData;

    if (!department || !year || !section || !subject || !file || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Uploading Study Material...");
    console.log("Form Data:", formData);
    alert("Study Material upload simulated");

    setFormData({
      department: "",
      year: "",
      section: "",
      subject: "",
      category: "notes",
      date: "",
      description: "",
      file: null,
    });

    document.getElementById("studyFileInput").value = "";
  };

  const handleReset = () => {
    setFormData({
      department: "",
      year: "",
      section: "",
      subject: "",
      category: "notes",
      date: "",
      description: "",
      file: null,
    });
    document.getElementById("studyFileInput").value = "";
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-6">
        <div className="flex gap-2 justify-center items-center mb-6">
          <FaBookOpen className="text-blue-600 text-4xl" />
          <h2 className="text-3xl font-semibold text-[#2e3a59]">
            Upload Study Material
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="EEE">Electrical</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Year</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Fourth">Fourth</option>
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Section
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Subject</option>
                <option value="DSA">Data Structures</option>
                <option value="OS">Operating Systems</option>
                <option value="DBMS">DBMS</option>
                <option value="CN">Computer Networks</option>
                <option value="Maths">Mathematics</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Material Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="notes">Notes</option>
              <option value="slides">Slides</option>
              <option value="reference-book">Reference Book</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Description (optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Add a short description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              id="studyFileInput"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full"
              required
            />
            {formData.file && (
              <p className="text-sm mt-1 text-gray-600">
                Selected File:{" "}
                <span className="font-medium">{formData.file.name}</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-green-700 shadow transition"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 shadow transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadStudyMaterial;

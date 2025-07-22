import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadAssignment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    year: "First",
    department: "CSE",
    section: "A",
    file: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.file) {
      setMessage("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("year", formData.year);
    data.append("department", formData.department);
    data.append("section", formData.section);
    data.append("file", formData.file);

    // Replace the fetch below with your actual backend endpoint
    fetch("/api/assignments/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          setMessage("✅ Assignment uploaded successfully!");
          setFormData({
            name: "",
            year: "First",
            department: "CSE",
            section: "A",
            file: null,
          });
        } else {
          setMessage("❌ Upload failed. Try again.");
        }
      })
      .catch(() => setMessage("❌ Server error. Please try later."));
  };

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📤 Upload Assignment Question
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Fill the form below to upload a new assignment.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
        encType="multipart/form-data"
      >
        {message && (
          <div className="text-center text-sm text-red-600 font-medium">
            {message}
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Assignment Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded shadow-sm focus:ring-indigo-500"
            placeholder="Eg: OOPS Assignment 1"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[120px]">
            <label className="block font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded shadow-sm"
            >
              <option>First</option>
              <option>Second</option>
              <option>Third</option>
              <option>Final</option>
            </select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded shadow-sm"
            >
              <option>CSE</option>
              <option>ECE</option>
              <option>MECH</option>
              <option>CIVIL</option>
            </select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded shadow-sm"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Upload File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Accepted formats: .pdf, .doc, .docx
          </p>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          Upload Assignment
        </button>
      </form>
    </div>
  );
};

export default UploadAssignment;

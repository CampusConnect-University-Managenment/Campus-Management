import React, { useState } from 'react';
const UploadStudyMaterial = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "notes",
    date: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.file || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Uploading Study Material...");
    console.log("Form Data:", formData);
    alert("Study Material upload simulated");

    setFormData({
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
      subject: "",
      category: "notes",
      date: "",
      description: "",
      file: null,
    });
    document.getElementById("studyFileInput").value = "";
  };

  return (
    <div className="mt-[100px] max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Study Material</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Subject */}
        <div>
          <label className="block font-medium text-sm mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Data Structures"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-sm mb-1">Material Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="notes">Notes</option>
            <option value="slides">Slides</option>
            <option value="reference-book">Reference Book</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium text-sm mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description about the material"
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium text-sm mb-1">File Upload</label>
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
            <p className="text-sm mt-1 text-gray-600">Selected File: {formData.file.name}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadStudyMaterial;

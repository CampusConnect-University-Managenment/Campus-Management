import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaFileUpload, FaBookOpen } from "react-icons/fa";

const UploadStudyMaterial = () => {
const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subject: '',
    category: 'notes',
    date: '',
    description: '',
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
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Uploading Study Material...');
    console.log('Form Data:', formData);
    alert('Study Material upload simulated');

    setFormData({
      subject: '',
      category: 'notes',
      date: '',
      description: '',
      file: null,
    });

    document.getElementById('studyFileInput').value = '';
  };

  const handleReset = () => {
    setFormData({
      subject: '',
      category: 'notes',
      date: '',
      description: '',
      file: null,
    });
    document.getElementById('studyFileInput').value = '';
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
            ← Back to ExamInterFace
            </button><br/>
      <br/><div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex gap-2">
          <div><FaBookOpen className="text-blue-600 text-4xl ms-44" /></div>
          <div>
        <h2 className="text-3xl font-semibold text-[#2e3a59] text-center mb-8">
          Upload Study Material
        </h2></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Data Structures"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Material Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description about the material"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">File Upload</label>
            <input
              type="file"
              id="studyFileInput"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md"
              required
            />
            {formData.file && (
              <p className="text-sm mt-1 text-gray-600">
                Selected File: <span className="font-medium">{formData.file.name}</span>
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

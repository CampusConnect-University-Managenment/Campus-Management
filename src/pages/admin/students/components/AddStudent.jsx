import React, { useState, useEffect } from "react";

const AddStudent = ({ editingStudent, onAddStudent, onEditStudent, onClose }) => {
  // Initialize form state, prefilling if editingStudent exists
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    degree: "",
    year: "",
    semester: "",
    status: "Active",
    avatar: "", // for profile picture url or file
  });

  // Update formData whenever editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        department: editingStudent.department || "",
        degree: editingStudent.degree || "",
        year: editingStudent.year || "",
        semester: editingStudent.semester || "",
        status: editingStudent.status || "Active",
        avatar: editingStudent.avatar || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        degree: "",
        year: "",
        semester: "",
        status: "Active",
        avatar: "",
      });
    }
  }, [editingStudent]);

  // Handle input changes for controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onEditStudent({ ...editingStudent, ...formData });
    } else {
      onAddStudent(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
          required
        />
      </div>

      <div className="flex gap-4">
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          name="department"
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />
      </div>

      <div className="flex gap-4">
        <input
          name="degree"
          type="text"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          name="year"
          type="text"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />
      </div>

      <div className="flex gap-4">
        <input
          name="semester"
          type="text"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        >
          <option value="Active">Active</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>

      {/* Add your file upload logic here */}
      <div>
        <label className="font-semibold">Profile Picture</label>
        <input
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              // Convert to base64 or upload here, for demo just use URL.createObjectURL
              const url = URL.createObjectURL(file);
              setFormData((prev) => ({ ...prev, avatar: url }));
            }
          }}
          className="mt-1"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddStudent;

import React, { useState, useEffect } from "react";

const AddStudent = ({ editingStudent, onAddStudent, onEditStudent, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
    department: "",
    degree: "",
    year: "",
    status: "Active",
    cgpa: "",
    attendance: "",
    bio: "",
    placement: null,
  });

  const [markAsPlaced, setMarkAsPlaced] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
      setMarkAsPlaced(!!editingStudent.placement);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };

  const handlePlacementChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      placement: {
        ...(prev.placement || {}),
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      placement: markAsPlaced ? formData.placement : null,
    };

    if (editingStudent) {
      onEditStudent(dataToSubmit);
    } else {
      onAddStudent(dataToSubmit);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">{editingStudent ? "Edit Student" : "Add New Student"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" required />

        <div>
          <label className="block mb-1 font-medium">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="border p-2 rounded w-full"
          />
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>

        <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded" required />
        <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" className="border p-2 rounded" required />
        <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="border p-2 rounded" required />

        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
          <option value="Active">Active</option>
        </select>

        {/* Optional fields only shown in edit mode */}
        {editingStudent && (
          <>
            <input type="number" step="0.1" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" className="border p-2 rounded" />
            <input type="number" name="attendance" value={formData.attendance} onChange={handleChange} placeholder="Attendance %" className="border p-2 rounded" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="border p-2 rounded w-full md:col-span-2" rows={3}></textarea>
          </>
        )}
      </div>

      {/* Placement toggle only in edit mode */}
      {editingStudent && (
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={markAsPlaced}
              onChange={(e) => {
                setMarkAsPlaced(e.target.checked);
                if (!e.target.checked) {
                  setFormData((prev) => ({ ...prev, placement: null }));
                }
              }}
            />
            <span className="font-medium">Mark as Placed</span>
          </label>
        </div>
      )}

      {/* Placement Fields */}
      {markAsPlaced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
          <input type="text" name="company" value={formData.placement?.company || ""} onChange={handlePlacementChange} placeholder="Company Name" className="border p-2 rounded" required />
          <input type="text" name="location" value={formData.placement?.location || ""} onChange={handlePlacementChange} placeholder="Location" className="border p-2 rounded" required />
          <input type="text" name="position" value={formData.placement?.position || ""} onChange={handlePlacementChange} placeholder="Position" className="border p-2 rounded" required />
          <input type="number" step="0.1" name="package" value={formData.placement?.package || ""} onChange={handlePlacementChange} placeholder="Package (LPA)" className="border p-2 rounded" required />
          <input type="text" name="date" value={formData.placement?.date || ""} onChange={handlePlacementChange} placeholder="Placement Date" className="border p-2 rounded" required />
          <input type="url" name="proof" value={formData.placement?.proof || ""} onChange={handlePlacementChange} placeholder="Proof URL" className="border p-2 rounded" />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </form>
  );
};

export default AddStudent;

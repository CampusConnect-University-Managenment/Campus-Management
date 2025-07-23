import React, { useState, useEffect } from "react";

const AddStudent = ({ editingStudent, onAddStudent, onEditStudent, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    batch: "",
    section: "",
    dept: "",
    dob: "",
    contact: "",
    mail: "",
    address: "",
    adhar: "",
    tenthMark: "",
    twelfthMark: "",
    quota: "",
    gender: "",
    bloodGroup: "",
    photo: "",
    parentName: "",
    parentPhoneNo: "",
    sem: "",
    year: "",
    totalCredits: "",
    cgpa: "",
    attendance: "",
    bio: "",
    status: "Active",
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        photo: imageUrl,
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
      <h2 className="text-xl font-bold mb-4">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
        <input name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Reg. Number" className="border p-2 rounded" required />
        <input name="batch" value={formData.batch} onChange={handleChange} placeholder="Batch" className="border p-2 rounded" />
        <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="border p-2 rounded" />
        <input name="dept" value={formData.dept} onChange={handleChange} placeholder="Department" className="border p-2 rounded" />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" className="border p-2 rounded" />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Student Phone" className="border p-2 rounded" />
        <input name="mail" type="email" value={formData.mail} onChange={handleChange} placeholder="Student Email" className="border p-2 rounded" />
        <input name="adhar" value={formData.adhar} onChange={handleChange} placeholder="Aadhar Number" className="border p-2 rounded" />
        <input name="tenthMark" value={formData.tenthMark} onChange={handleChange} placeholder="10th Mark (%)" className="border p-2 rounded" />
        <input name="twelfthMark" value={formData.twelfthMark} onChange={handleChange} placeholder="12th Mark (%)" className="border p-2 rounded" />
        <input name="quota" value={formData.quota} onChange={handleChange} placeholder="Quota (GQ/MQ)" className="border p-2 rounded" />
        <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="border p-2 rounded" />
        <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" className="border p-2 rounded" />
        <input name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Parent Name" className="border p-2 rounded" />
        <input name="parentPhoneNo" value={formData.parentPhoneNo} onChange={handleChange} placeholder="Parent Phone No" className="border p-2 rounded" />
        <input name="sem" value={formData.sem} onChange={handleChange} placeholder="Semester" className="border p-2 rounded" />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="border p-2 rounded" />
        <input name="totalCredits" value={formData.totalCredits} onChange={handleChange} placeholder="Total Credits" className="border p-2 rounded" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />

        {/* Photo URL */}
        <input name="photo" value={formData.photo} onChange={handleChange} placeholder="Profile Photo URL" className="border p-2 rounded" />
        
        {/* OR Upload */}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="border p-2 rounded" />
        {formData.photo && (
          <img src={formData.photo} alt="Preview" className="w-20 h-20 object-cover rounded-full border" />
        )}

        {/* Optional fields only for edit */}
        {editingStudent && (
          <>
            <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" className="border p-2 rounded" />
            <input name="attendance" value={formData.attendance} onChange={handleChange} placeholder="Attendance %" className="border p-2 rounded" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="border p-2 rounded w-full md:col-span-2" rows={3}></textarea>
          </>
        )}
      </div>

      {/* Mark as Placed */}
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

      {markAsPlaced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
          <input name="company" value={formData.placement?.company || ""} onChange={handlePlacementChange} placeholder="Company Name" className="border p-2 rounded" />
          <input name="location" value={formData.placement?.location || ""} onChange={handlePlacementChange} placeholder="Location" className="border p-2 rounded" />
          <input name="position" value={formData.placement?.position || ""} onChange={handlePlacementChange} placeholder="Position" className="border p-2 rounded" />
          <input name="package" value={formData.placement?.package || ""} onChange={handlePlacementChange} placeholder="Package (LPA)" className="border p-2 rounded" />
          <input name="date" value={formData.placement?.date || ""} onChange={handlePlacementChange} placeholder="Placement Date" className="border p-2 rounded" />
          <input name="proof" value={formData.placement?.proof || ""} onChange={handlePlacementChange} placeholder="Proof URL" className="border p-2 rounded" />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </form>
  );
};

export default AddStudent;

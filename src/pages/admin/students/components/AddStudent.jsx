import React, { useState, useEffect } from "react";

const AddStudent = ({ editingStudent, onAddStudent, onEditStudent, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", regNo: "", batch: "", section: "", dept: "", dob: "",
    contact: "", email: "", address: "", adhar: "", tenthMark: "", twelfthMark: "",
    diplomaMark: "", qualification: "", quota: "", gender: "", bloodGroup: "",
    photo: "", parentRole: "", parentName: "", parentPhoneNo: "", tc: null,
    sem: "", year: "", totalCredits: "", cgpa: "", attendance: "", bio: "", password: ""
  });

  useEffect(() => {
    if (editingStudent) setFormData(editingStudent);
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photo: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onEditStudent(formData);
    } else {
      onAddStudent(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[90vh] p-4">
      <h2 className="text-xl font-bold mb-4">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />
        <input name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Register Number" className="border p-2 rounded" />
        <input name="batch" value={formData.batch} onChange={handleChange} placeholder="Batch" className="border p-2 rounded" />
        <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="border p-2 rounded" />
        <input name="dept" value={formData.dept} onChange={handleChange} placeholder="Department" className="border p-2 rounded" />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded" />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Student Phone" className="border p-2 rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Student Email" type="email" className="border p-2 rounded" />
        <input name="adhar" value={formData.adhar} onChange={handleChange} placeholder="Aadhar Number" className="border p-2 rounded" />
        <input name="tenthMark" value={formData.tenthMark} onChange={handleChange} placeholder="10th Mark (%)" className="border p-2 rounded" />

        {/* Qualification Selector */}
        <select name="qualification" value={formData.qualification} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Qualification After 10th</option>
          <option value="Diploma">Diploma</option>
          <option value="12th">12th</option>
        </select>

        {/* Conditional Mark Field */}
        {formData.qualification === "12th" && (
          <input name="twelfthMark" value={formData.twelfthMark} onChange={handleChange} placeholder="12th Mark (%)" className="border p-2 rounded" />
        )}
        {formData.qualification === "Diploma" && (
          <input name="diplomaMark" value={formData.diplomaMark} onChange={handleChange} placeholder="Diploma Mark (%)" className="border p-2 rounded" />
        )}

        {/* Quota Radio */}
        <div className="flex items-center gap-4">
          <label><input type="radio" name="quota" value="Counselling" checked={formData.quota === "Counselling"} onChange={handleChange} /> Counselling</label>
          <label><input type="radio" name="quota" value="Management" checked={formData.quota === "Management"} onChange={handleChange} /> Management</label>
        </div>

        {/* Gender Radio */}
        <div className="flex items-center gap-4">
          <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female</label>
          <label><input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} /> Other</label>
        </div>

        <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" className="border p-2 rounded" />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded col-span-2" rows={3} />

        {/* Parent Role */}
        <select name="parentRole" value={formData.parentRole} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Parent/Guardian Role</option>
          <option value="Parent">Parent</option>
          <option value="Guardian">Guardian</option>
        </select>
        <input name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Parent/Guardian Name" className="border p-2 rounded" />
        <input name="parentPhoneNo" value={formData.parentPhoneNo} onChange={handleChange} placeholder="Parent/Guardian Phone" className="border p-2 rounded" />

        {/* TC Upload */}
        <input type="file" name="tc" onChange={handleChange} className="border p-2 rounded" />

        {/* Student Account Creation */}
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Create Password" type="password" className="border p-2 rounded" />

        {/* Optional Fields */}
        <input name="sem" value={formData.sem} onChange={handleChange} placeholder="Semester" className="border p-2 rounded" />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="border p-2 rounded" />
        <input name="totalCredits" value={formData.totalCredits} onChange={handleChange} placeholder="Total Credits" className="border p-2 rounded" />
        <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" className="border p-2 rounded" />
        <input name="attendance" value={formData.attendance} onChange={handleChange} placeholder="Attendance (%)" className="border p-2 rounded" />

        {/* Photo Upload */}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="border p-2 rounded" />
        {formData.photo && <img src={formData.photo} alt="Preview" className="w-20 h-20 rounded-full border object-cover" />}

        {/* Bio */}
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" rows={3} className="border p-2 rounded md:col-span-2" />
      </div>

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

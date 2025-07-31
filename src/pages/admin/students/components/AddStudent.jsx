import React, { useState, useEffect } from "react";

const AddStudent = ({ editingStudent, onSave, onEditStudent, onClose ,setSelectedStudent}) => {
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  regNo: "",
  batch: "",
  section: "",
  department: "",
  dob: "",
  contact: "",
  email: "",
  address: "",
  adhar: "",
  tenthMark: "",
  twelfthMark: "",
  diplomaMark: "",
  qualification: "",
  quota: "",
  gender: "",
  bloodGroup: "",
  photo: "",
  sem: "", // keep only one
  parentRole: "",
  parentName: "",
  parentPhoneNo: "",
  tc: null,
  year: "",
  totalCredits: "",
  cgpa: "",
  attendance: "",
  bio: "",
  password: "",
});


useEffect(() => {
  if (editingStudent) {
    // Split full name into first and last for the form
    const [firstName = "", lastName = ""] = (editingStudent.name || "").split(" ");
    setFormData({
      ...editingStudent,
      firstName,
      lastName,
    });
  }
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
    const newStudent = {
      name: formData.firstName + " " + formData.lastName, // Combine first and last names into one field 'name'
      department: formData.department,  // Ensure it's consistent with AllStudents
      regNo: formData.regNo,
      batch: formData.batch,
      section: formData.section,
      dob: formData.dob,
      contact: formData.contact,
      email: formData.email,  // Include email
      address: formData.address,
      adhar: formData.adhar,
      tenthMark: formData.tenthMark,
      twelfthMark: formData.twelfthMark,
      diplomaMark: formData.diplomaMark,
      qualification: formData.qualification,
      quota: formData.quota,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      photo: formData.photo,
      parentRole: formData.parentRole,
      parentName: formData.parentName,
      parentPhoneNo: formData.parentPhoneNo,
      tc: formData.tc,
      sem: formData.sem,
      year: formData.year,  // Include year here
      totalCredits: formData.totalCredits,
      cgpa: formData.cgpa,
      attendance: formData.attendance,
      bio: formData.bio,
    };

    if (editingStudent) {
  onEditStudent(newStudent); // Update the student list
  if (setSelectedStudent) {
    setSelectedStudent(newStudent); // <-- Make sure StudentProfile updates
  }
} else {
  onSave(newStudent);
}
onClose(); // Close the modal after submit
  };

  // Year options for dropdown
  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <h2 className="text-xl font-bold mb-4">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded"
        />
        <input
          name="regNo"
          value={formData.regNo}
          onChange={handleChange}
          placeholder="Register Number"
          className="border p-2 rounded"
        />
        <input
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          placeholder="Batch"
          className="border p-2 rounded"
        />
        <input
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Section"
          className="border p-2 rounded"
        />
        <input
          name="department"
          value={formData.department} // Ensure this is 'department' instead of 'dept'
          onChange={handleChange}
          placeholder="Department"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Student Phone"
          className="border p-2 rounded"
        />
        <input
          name="email"
          value={formData.email}  // Ensure email is included
          onChange={handleChange}
          placeholder="Student Email"
          type="email"
          className="border p-2 rounded"
        />
        <input
          name="adhar"
          value={formData.adhar}
          onChange={handleChange}
          placeholder="Aadhar Number"
          className="border p-2 rounded"
        />
        <input
          name="tenthMark"
          value={formData.tenthMark}
          onChange={handleChange}
          placeholder="10th Mark (%)"
          className="border p-2 rounded"
        />

        {/* Qualification Selector */}
        <select
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Qualification After 10th</option>
          <option value="Diploma">Diploma</option>
          <option value="12th">12th</option>
        </select>

        {/* Conditional Mark Field */}
        {formData.qualification === "12th" && (
          <input
            name="twelfthMark"
            value={formData.twelfthMark}
            onChange={handleChange}
            placeholder="12th Mark (%)"
            className="border p-2 rounded"
          />
        )}
        {formData.qualification === "Diploma" && (
          <input
            name="diplomaMark"
            value={formData.diplomaMark}
            onChange={handleChange}
            placeholder="Diploma Mark (%)"
            className="border p-2 rounded"
          />
        )}

        {/* Year Field (dropdown) */}
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Year</option>
          {yearOptions.map((year, idx) => (
            <option key={idx} value={year}>{year}</option>
          ))}
        </select>
        {/* Semester Field (dropdown) */}
<select
  name="sem"
  value={formData.sem}
  onChange={handleChange}
  className="border p-2 rounded"
>
  <option value="">Select Semester</option>
  <option value="Semester 1">Semester 1</option>
  <option value="Semester 2">Semester 2</option>
  <option value="Semester 3">Semester 3</option>
  <option value="Semester 4">Semester 4</option>
  <option value="Semester 5">Semester 5</option>
  <option value="Semester 6">Semester 6</option>
  <option value="Semester 7">Semester 7</option>
  <option value="Semester 8">Semester 8</option>
</select>


        {/* Quota Radio */}
        <div className="flex items-center gap-4">
          <label>
            <input
              type="radio"
              name="quota"
              value="Counselling"
              checked={formData.quota === "Counselling"}
              onChange={handleChange}
            />
            Counselling
          </label>
          <label>
            <input
              type="radio"
              name="quota"
              value="Management"
              checked={formData.quota === "Management"}
              onChange={handleChange}
            />
            Management
          </label>
        </div>

        {/* Gender Radio */}
        <div className="flex items-center gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <input
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
          className="border p-2 rounded"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 rounded col-span-2"
          rows={3}
        />

        {/* Parent Role */}
        <select
          name="parentRole"
          value={formData.parentRole}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Parent/Guardian Role</option>
          <option value="Parent">Parent</option>
          <option value="Guardian">Guardian</option>
        </select>
        <input
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          placeholder="Parent/Guardian Name"
          className="border p-2 rounded"
        />
        <input
          name="parentPhoneNo"
          value={formData.parentPhoneNo}
          onChange={handleChange}
          placeholder="Parent/Guardian Phone"
          className="border p-2 rounded"
        />

        {/* Photo Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border p-2 rounded"
        />
        {formData.photo && (
          <img
            src={formData.photo}
            alt="Preview"
            className="w-20 h-20 rounded-full border object-cover"
          />
        )}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
        </div>
  
    </form>
          </div>
      </div>
  );
};

export default AddStudent;

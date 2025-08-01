import React, { useState, useEffect } from "react";

const AddStudent = ({
  editingStudent,
  onSave,
  onEditStudent,
  onClose,
  setSelectedStudent,
}) => {
  // Initialize form state with frontend keys
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
    photo: null,
    photoPreviewUrl: "",
    sem: "",
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
      const [firstName = "", lastName = ""] = (editingStudent.name || "").split(" ");
      setFormData({
        ...editingStudent,
        firstName,
        lastName,
        photoPreviewUrl: editingStudent.photo || "",
        photo: null,
      });
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, photo: file, photoPreviewUrl: imageUrl }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClearPhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null, photoPreviewUrl: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      ...formData,
      name: formData.firstName + " " + formData.lastName,
      photo: formData.photoPreviewUrl,
    };

    // Remove UI-only fields before sending via callback
    delete newStudent.firstName;
    delete newStudent.lastName;
    delete newStudent.photoPreviewUrl;

    if (editingStudent) {
      onEditStudent(newStudent);
      if (setSelectedStudent) {
        setSelectedStudent(newStudent);
      }
    } else {
      onSave(newStudent);
    }
    onClose();
  };

  const resetForm = () => {
    setFormData({
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
      photo: null,
      photoPreviewUrl: "",
      sem: "",
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
  };

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semOptions = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">
            {editingStudent ? "Edit Student" : "Add New Student"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First and Last Name */}
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded"
              required
            />
            {/* Other inputs... */}
            <input
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              placeholder="Registration Number"
              className="border p-2 rounded"
              required
            />
            {/* Add all other inputs similarly as in your previous code */}
            {/* Department */}
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              className="border p-2 rounded"
            />
            {/* Year Dropdown */}
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
            {/* Semester Dropdown */}
            <select
              name="sem"
              value={formData.sem}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Semester</option>
              {semOptions.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>

            {/* Add other input fields, checkboxes, radios as defined earlier */}

            {/* Photo Upload */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Photo Upload</label>
              <input
                type="file"
                accept="image/*"
                name="photo"
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {formData.photoPreviewUrl && (
                <div className="mt-2 relative w-20 h-20">
                  <img
                    src={formData.photoPreviewUrl}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={handleClearPhoto}
                    className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded px-1"
                    title="Remove photo"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="col-span-2 flex gap-3 mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editingStudent ? "Update Student" : "Add Student"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

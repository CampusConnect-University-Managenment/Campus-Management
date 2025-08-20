import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ only toast, no Toaster here

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const PARENT_ROLE_OPTIONS = ["Parent", "Guardian"];
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    email: "",
    mobile: "",
    year: "",
    parentName: "",
    parentRole: "",
    parentMobile: "",
    parentEmail: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/student/add", formData);
      toast.success("Student added successfully!");
      setShowModal(false);
      setFormData({
        studentName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        email: "",
        mobile: "",
        year: "",
        parentName: "",
        parentRole: "",
        parentMobile: "",
        parentEmail: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        onClick={() => setShowModal(true)}
      >
        Add Student
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Add Student</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-medium">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select</option>
                  {GENDER_OPTIONS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select</option>
                  {YEAR_OPTIONS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-sm font-medium">Parent Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Parent Role */}
              <div>
                <label className="block text-sm font-medium">Parent Role</label>
                <select
                  name="parentRole"
                  value={formData.parentRole}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select</option>
                  {PARENT_ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parent Mobile */}
              <div>
                <label className="block text-sm font-medium">Parent Mobile</label>
                <input
                  type="text"
                  name="parentMobile"
                  value={formData.parentMobile}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Parent Email */}
              <div>
                <label className="block text-sm font-medium">Parent Email</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;

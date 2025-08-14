import React, { useState, useEffect } from "react";
import axios from "axios";

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const PARENT_ROLE_OPTIONS = ["Parent", "Guardian"];
const YEAR_OPTIONS = ["1", "2", "3", "4"];
const SEM_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const DEPT_OPTIONS = ["IT", "CSE", "ECE", "EEE", "AIDS"];

const AddStudent = ({ editingStudent, onClose }) => {
  const [formData, setFormData] = useState({
    studentFirstname: "",
    studentLastname: "",
    studentRollNo: "",
    studentDepartment: "",
    studentDob: "",
    studentPhoneNo: "",
    studentEmail: "",
    studentAadharno: "",
    studentTenthmark: "",
    studentDiplomamark: "",
    studentTwelthmark: "",  // Changed here
    studentYear: "",
    studentSem: "",
    studentModeofjoing: "",
    studentGender: "",
    studentBloodgroup: "",
    studentAddress: "",
    studentParentorguardian: "",
    studentParentorguardianname: "",
    studentParentorguardianphone: "",
    studentSection: "",
    studentCredits: "",
    studentAttendance: "",
    studentCgpa: "",
    studentProfilepic: "",
  });

  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setFormData({ ...editingStudent });
      setPhotoPreviewUrl(editingStudent.studentProfilepic || "");
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            studentProfilepic: reader.result,
          }));
          setPhotoPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClearPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      studentProfilepic: "",
    }));
    setPhotoPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const backendStudent = {
      ...formData,
      studentTenthmark: parseFloat(formData.studentTenthmark) || 0,
      studentDiplomamark: parseFloat(formData.studentDiplomamark) || 0,
      studentTwelthmark: parseFloat(formData.studentTwelthmark) || 0, // Changed here
      studentCredits: parseInt(formData.studentCredits) || 0,
      studentAttendance: parseFloat(formData.studentAttendance) || 0,
      studentCgpa: parseFloat(formData.studentCgpa) || 0,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/admin/students/add", backendStudent);
      alert("Student added successfully!");
      console.log(response.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please check backend logs.");
    }
  };

  const resetForm = () => {
    setFormData({
      studentFirstname: "",
      studentLastname: "",
      studentRollNo: "",
      studentDepartment: "",
      studentDob: "",
      studentPhoneNo: "",
      studentEmail: "",
      studentAadharno: "",
      studentTenthmark: "",
      studentDiplomamark: "",
      studentTwelthmark: "",  // Changed here
      studentYear: "",
      studentSem: "",
      studentModeofjoing: "",
      studentGender: "",
      studentBloodgroup: "",
      studentAddress: "",
      studentParentorguardian: "",
      studentParentorguardianname: "",
      studentParentorguardianphone: "",
      studentSection: "",
      studentCredits: "",
      studentAttendance: "",
      studentCgpa: "",
      studentProfilepic: "",
    });
    setPhotoPreviewUrl("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">
            {editingStudent ? "Edit Student" : "Add New Student"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="studentFirstname" value={formData.studentFirstname} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" required />
            <input name="studentLastname" value={formData.studentLastname} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" required />
            <input name="studentRollNo" value={formData.studentRollNo} onChange={handleChange} placeholder="Register Number" className="border p-2 rounded" required />
            <input name="studentSection" value={formData.studentSection} onChange={handleChange} placeholder="Section" className="border p-2 rounded" />

            <select name="studentDepartment" value={formData.studentDepartment} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Department</option>
              {DEPT_OPTIONS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
            </select>

            <select name="studentYear" value={formData.studentYear} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Year</option>
              {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <select name="studentSem" value={formData.studentSem} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Semester</option>
              {SEM_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <input type="date" name="studentDob" value={formData.studentDob} onChange={handleChange} className="border p-2 rounded" />
            <input name="studentPhoneNo" value={formData.studentPhoneNo} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded" />
            <input name="studentEmail" value={formData.studentEmail} onChange={handleChange} placeholder="Email" className="border p-2 rounded" type="email" />
            <input name="studentAadharno" value={formData.studentAadharno} onChange={handleChange} placeholder="Aadhar Number" className="border p-2 rounded" />
            <input name="studentTenthmark" value={formData.studentTenthmark} onChange={handleChange} placeholder="10th Mark (%)" className="border p-2 rounded" type="number" />
            <input name="studentTwelthmark" value={formData.studentTwelthmark} onChange={handleChange} placeholder="12th Mark (%)" className="border p-2 rounded" type="number" />
            <input name="studentDiplomamark" value={formData.studentDiplomamark} onChange={handleChange} placeholder="Diploma Mark (%)" className="border p-2 rounded" type="number" />

            <select name="studentModeofjoing" value={formData.studentModeofjoing} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Mode of Joining / Quota</option>
              <option value="Counselling">Counselling</option>
              <option value="Management">Management</option>
            </select>

            <div className="flex gap-3 items-center">
              Gender:
              {GENDER_OPTIONS.map((g) => (
                <label key={g} className="ml-2">
                  <input type="radio" name="studentGender" value={g} checked={formData.studentGender === g} onChange={handleChange} /> {g}
                </label>
              ))}
            </div>

            <select name="studentBloodgroup" value={formData.studentBloodgroup} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Blood Group</option>
              {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <textarea name="studentAddress" value={formData.studentAddress} onChange={handleChange} placeholder="Address" className="border p-2 rounded col-span-2" rows={2} />

            <select name="studentParentorguardian" value={formData.studentParentorguardian} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Parent/Guardian Role</option>
              {PARENT_ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <input name="studentParentorguardianname" value={formData.studentParentorguardianname} onChange={handleChange} placeholder="Parent/Guardian Name" className="border p-2 rounded" />
            <input name="studentParentorguardianphone" value={formData.studentParentorguardianphone} onChange={handleChange} placeholder="Parent/Guardian Phone" className="border p-2 rounded" />
            <input name="studentCredits" value={formData.studentCredits} onChange={handleChange} placeholder="Total Credits" className="border p-2 rounded" type="number" />
            <input name="studentAttendance" value={formData.studentAttendance} onChange={handleChange} placeholder="Attendance (%)" className="border p-2 rounded" type="number" />
            <input name="studentCgpa" value={formData.studentCgpa} onChange={handleChange} placeholder="CGPA" className="border p-2 rounded" type="number" />

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Profile Pic</label>
              <input type="file" accept="image/*" name="studentProfilepic" onChange={handleChange} className="border p-2 rounded" />
              {photoPreviewUrl && (
                <div className="mt-2 relative w-20 h-20">
                  <img src={photoPreviewUrl} alt="Preview" className="w-20 h-20 rounded-full object-cover border" />
                  <button type="button" onClick={handleClearPhoto} className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded px-1">X</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

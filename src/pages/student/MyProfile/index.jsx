
import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [studentData, setStudentData] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Fetch student details (including image) from backend
  useEffect(() => {
    const storedRollNo = localStorage.getItem("studentRollNo");
    if (!storedRollNo) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/admin/students/rollno/${storedRollNo}`
        );
        if (!res.ok) throw new Error("Student not found");
        const json = await res.json();

        if (!json.data) throw new Error("No data found");

        setStudentData(json.data);

        // ✅ Always fetch profile image from backend
        if (json.data.studentProfilepic) {
          setProfileImage(json.data.studentProfilepic);
        } else {
          setProfileImage(defaultProfile);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setProfileImage(defaultProfile);
      }
    };

    fetchStudent();
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!newPassword.trim()) {
      validationErrors.newPassword = "Please enter a new password.";
    }
    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Please confirm your password.";
    }
    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);
    }
  };

  if (!studentData) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen px-6 py-[7.5rem] text-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#0F1B4C]">
        My Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-[#0F1B4C] shadow-md object-cover"
        />
      </div>

      {/* Details */}
      <div className="mt-10 mx-auto max-w-xl bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="font-medium">Name:</div>
          <div>{studentData.studentFirstname} {studentData.studentLastname}</div>

          <div className="font-medium">Register Number:</div>
          <div>{studentData.studentRollNo}</div>

          <div className="font-medium">Department:</div>
          <div>{studentData.studentDepartment}</div>

          <div className="font-medium">Batch:</div>
          <div>
            {studentData.studentBatch ||
              (studentData.studentYear
                ? `${new Date().getFullYear() - parseInt(studentData.studentYear) + 1}`
                : "N/A")}
          </div>

          <div className="font-medium">Section:</div>
          <div>{studentData.studentSection}</div>

          <div className="font-medium">Year:</div>
          <div>{studentData.studentYear}</div>

          <div className="font-medium">Semester:</div>
          <div>{studentData.studentSem}</div>

          <div className="font-medium">Father's Name:</div>
          <div>{studentData.studentParentorguardianname}</div>

          <div className="font-medium">Contact:</div>
          <div>{studentData.studentPhoneNo}</div>

          <div className="font-medium">Email:</div>
          <div>{studentData.studentEmail}</div>

          <div className="font-medium">Aadhar:</div>
          <div>{studentData.studentAadharno}</div>
        </div>

        {/* Password Reset */}
        <div className="mt-8">
          {showPasswordFields ? (
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label className="block font-medium">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:ring-[#0F1B4C]`}
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:ring-[#0F1B4C]`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#0F1B4C] text-white py-2 rounded-md hover:bg-[#0d1940] transition"
              >
                Save Password
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowPasswordFields(true)}
              className="w-full bg-[#0F1B4C] text-white py-2 rounded-md hover:bg-[#0d1940] transition"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

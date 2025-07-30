
import React, { useState } from "react";

const MyProfile = () => {
  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const [profileImage] = useState(defaultProfile);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  return (
    <div className="bg-white min-h-screen px-6 py-[7.5rem] text-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#0F1B4C]">
        My Profile
      </h2>

      <div className="flex flex-col items-center space-y-2">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-[#0F1B4C] shadow-md object-cover"
        />
        {/* Change and Delete buttons are removed */}
      </div>

      <div className="mt-10 mx-auto max-w-xl bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="font-medium">Name:</div>
          <div>Riya Sharma</div>
          <div className="font-medium">Register Number:</div>
          <div>21CSE019</div>
          <div className="font-medium">Department:</div>
          <div>Computer Science and Engineering</div>
          <div className="font-medium">Batch:</div>
          <div>2021</div>
          <div className="font-medium">Section:</div>
          <div>C</div>
          <div className="font-medium">Year:</div>
          <div>3rd year</div>
          <div className="font-medium">Semester:</div>
          <div>6</div>
          <div className="font-medium">Father's Name:</div>
          <div>Robert Sharma</div>
          <div className="font-medium">Contact:</div>
          <div>+91 9876543210</div>
          <div className="font-medium">Email:</div>
          <div>riya.sharma@kce.ac.in</div>
          <div className="font-medium">Aadhar:</div>
          <div>1234 5678 9012</div>
        </div>

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
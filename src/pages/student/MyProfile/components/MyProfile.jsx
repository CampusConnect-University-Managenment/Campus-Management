import React, { useState } from "react";

const MyProfile = () => {
  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      // Perform API call to update password here
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

      <div className="flex flex-col items-center space-y-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-[#0F1B4C] shadow-md object-cover"
        />
        <label className="text-[#0F1B4C] hover:underline text-sm font-medium cursor-pointer">
          Change Profile Picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="mt-10 mx-auto max-w-xl bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="space-y-4">
          <div>
            <p className="font-medium">Name</p>
            <p>John Doe</p>
          </div>
          <div>
            <p className="font-medium">Roll Number</p>
            <p>2023CS001</p>
          </div>
          <div>
            <p className="font-medium">Department</p>
            <p>Computer Science and Engineering</p>
          </div>
          <div>
            <p className="font-medium">Year</p>
            <p>3rd Year</p>
          </div>
          <div>
            <p className="font-medium">Graduating Year</p>
            <p>2026</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p>john.doe@kce.ac.in</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>+91 9876543210</p>
          </div>
        </div>

        {/* Update Password Section */}
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
              Update Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

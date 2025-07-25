import React, { useState } from "react";

// Helper function to format date for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Reusable input field component
// Note: isEditing prop is removed as fields are always read-only in this version,
// except for password fields which are managed separately.
const ProfileInputField = ({
  label,
  value,
  name,
  type = "text",
  onChange,
  placeholder = "",
  readOnly = true,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly} // Fields are read-only by default
      className={`mt-1 block w-full px-3 py-2 border ${
        readOnly ? "bg-gray-100" : "bg-white"
      } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
    />
  </div>
);

// Component for a single row in the Basic Info section (label in one column, value in another)
// Note: isEditing prop is removed as fields are always read-only in this version.
const BasicInfoRow = ({ label, value, name, type = "text", onChange }) => {
  const displayValue =
    label === "Birthday" && value && value !== "Your birthday"
      ? formatDate(value)
      : value || "N/A";

  return (
    <div className="flex flex-col sm:flex-row py-3 border-b border-gray-200 last:border-b-0">
      <div className="w-full sm:w-1/3 text-gray-600 font-medium mb-1 sm:mb-0">
        {label}
      </div>
      <div className="w-full sm:w-2/3 text-gray-800">
        <span>{displayValue}</span> {/* Always display as text */}
      </div>
    </div>
  );
};

/**
 * FacultyProfile Component
 *
 * This component displays a structured profile for a faculty member.
 * It focuses on displaying personal and ID info, and provides a dedicated
 * "Change Password" functionality. All profile details (except password fields)
 * are read-only.
 * It is designed to be fully responsive using Tailwind CSS.
 */
const FacultyProfile = () => {
  const initialProfile = {
    first_name: "Ichshanackiyan",
    middle_name: "",
    last_name: "Doe",
    gender: "Male",
    address:
      "123, Tech Street, Knowledge City, Chennai, Tamil Nadu, India - 600001",
    dateOfBirth: "1995-07-22",
    bloodGroup: "A+",

    email: "ichshanackiyan.faculty@university.edu",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    profilePicture: "https://placehold.co/150x150/4CAF50/FFFFFF?text=I",

    department_id: "CSE001",
    faculty_id: "FCLT007",
  };

  const [profile, setProfile] = useState(initialProfile);
  // isEditing now only controls the visibility of the password change form
  const [isEditing, setIsEditing] = useState(false);

  // Password change specific states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");

  const handleTogglePasswordEdit = () => {
    setIsEditing((prev) => !prev);
    // Reset password form fields and messages when toggling
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordChangeError("");
    setPasswordChangeSuccess("");
  };

  const handleSubmitPasswordChange = () => {
    setPasswordChangeError("");
    setPasswordChangeSuccess("");

    if (newPassword.length < 6) {
      setPasswordChangeError(
        "New password must be at least 6 characters long."
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New password and confirmation do not match.");
      return;
    }
    // In a real app, you'd send currentPassword, newPassword to your backend
    // and validate currentPassword on the server side.
    console.log("Attempting to change password:", {
      currentPassword,
      newPassword,
    });

    // Simulate API call success/failure
    setTimeout(() => {
      if (currentPassword === "correctPassword123") {
        // Mock validation
        setPasswordChangeSuccess("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsEditing(false); // Close the form on success
      } else {
        setPasswordChangeError("Incorrect current password.");
      }
    }, 1000);
  };

  const fullName = `${profile.first_name} ${
    profile.middle_name ? profile.middle_name + " " : ""
  }${profile.last_name}`.trim();

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-inter flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto my-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 pb-6 border-b border-gray-200 mb-8">
          <div className="flex-shrink-0 relative">
            <img
              src={profile.profilePicture}
              alt={`${fullName}'s profile`}
              className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-blue-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/cccccc/000000?text=No+Image";
              }}
            />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {fullName}
            </h1>
            <p className="text-xl text-blue-600 font-semibold mb-1">
              {profile.designation}
            </p>
            <p className="text-lg text-gray-700">{profile.department}</p>
          </div>
        </div>

        {/* Main Content Grid - Single column for all sizes */}
        <div className="grid grid-cols-1 gap-8">
          {/* Personal Details Card - Always read-only */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              Personal_details
            </h2>
            <BasicInfoRow label="First Name" value={profile.first_name} />
            <BasicInfoRow label="Middle Name" value={profile.middle_name} />
            <BasicInfoRow label="Last Name" value={profile.last_name} />
            <BasicInfoRow label="Faculty ID" value={profile.faculty_id} />
            <BasicInfoRow label="Department ID" value={profile.department_id} />
            <BasicInfoRow label="Gender" value={profile.gender} />
            <BasicInfoRow label="Address" value={profile.address} />
            <BasicInfoRow
              label="Birthday"
              value={profile.dateOfBirth}
              type="date"
            />
            <BasicInfoRow label="Blood Group" value={profile.bloodGroup} />
            <BasicInfoRow label="Email" value={profile.email} type="email" />
            <BasicInfoRow label="Phone" value={profile.phone} type="tel" />
          </div>

          {/* Password Change Section - Controlled by isEditing */}
          {isEditing && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                Change Password
              </h2>
              <div className="space-y-4">
                <ProfileInputField
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  readOnly={false} // This field IS editable
                />
                <ProfileInputField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  readOnly={false} // This field IS editable
                />
                <ProfileInputField
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  readOnly={false} // This field IS editable
                />
                {passwordChangeError && (
                  <p className="text-red-500 text-sm">{passwordChangeError}</p>
                )}
                {passwordChangeSuccess && (
                  <p className="text-green-600 text-sm">
                    {passwordChangeSuccess}
                  </p>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={handleSubmitPasswordChange}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg shadow-md transition-colors duration-200"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleTogglePasswordEdit} // Use the toggle handler to cancel
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-lg shadow-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Profile Button (toggles password change form) */}
        <div className="mt-8 flex justify-center">
          {!isEditing && (
            <button
              onClick={handleTogglePasswordEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;

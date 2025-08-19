import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProfileInputField = ({
  label,
  value,
  name,
  type = "text",
  onChange,
  placeholder = "",
  readOnly = true,
  showToggle = false,
  isVisible = false,
  onToggleVisibility,
}) => (
  <div className="mb-4 relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={isVisible ? "text" : type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`mt-1 block w-full px-3 py-2 border ${
        readOnly ? "bg-gray-100" : "bg-white"
      } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
    />
    {showToggle && (
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    )}
  </div>
);

const BasicInfoRow = ({ label, value, type = "text" }) => {
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
        <span>{displayValue}</span>
      </div>
    </div>
  );
};

const FacultyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Fetch faculty profile (only once)
  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const facultyCode = localStorage.getItem("facultyCode");
        if (!facultyCode) {
          console.error("No faculty code found in localStorage");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/api/admin/faculty/${facultyCode}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching faculty profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFacultyProfile();
  }, []);

  const handleTogglePasswordEdit = () => {
    setIsEditing((prev) => !prev);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      toast.error("Please enter a new password.");
      return;
    }
    if (!confirmNewPassword.trim()) {
      toast.error("Please confirm your password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const facultyCode = localStorage.getItem("facultyCode");
      if (!facultyCode) {
        toast.error("Faculty code not found.");
        return;
      }

      const res = await fetch(
        `http://localhost:8088/api/auth/update-password/${facultyCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to update password");
      }

      toast.success("Password reset successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsEditing(false);
    } catch (err) {
      console.error("Password update error:", err);
      toast.error(err.message || "Error updating password");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No profile found.
      </div>
    );
  }

  const fullName = `${profile.firstName || ""} ${
    profile.middleName ? profile.middleName + " " : ""
  }${profile.lastName || ""}`.trim();

  // ✅ handle profile image (from backend or fallback)
const profileImage =
  profile.photoUrl ||   // add this ✅
  profile.profilePicture ||
  profile.imageUrl ||
  profile.photo ||
  "https://placehold.co/150x150/cccccc/000000?text=No+Image";



  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-inter flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto my-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 pb-6 border-b border-gray-200 mb-8">
          <div className="flex-shrink-0 relative">
            <img
              src={profileImage}
              alt={`${fullName}'s profile`}
              className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-blue-500"
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

        {/* Personal Details */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Personal Details
            </h2>
            <BasicInfoRow label="First Name" value={profile.firstName} />
            <BasicInfoRow label="Last Name" value={profile.lastName} />
            <BasicInfoRow label="Faculty Code" value={profile.facultyCode} />
            <BasicInfoRow label="Department ID" value={profile.departmentId} />
            <BasicInfoRow label="Birthday" value={profile.dob} type="date" />
            <BasicInfoRow label="Phone" value={profile.contact} />
          </div>

          {/* Change Password */}
          {isEditing && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Change Password
              </h2>
              <ProfileInputField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                readOnly={false}
                showToggle
                isVisible={showCurrent}
                onToggleVisibility={() => setShowCurrent((prev) => !prev)}
              />
              <ProfileInputField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                readOnly={false}
                showToggle
                isVisible={showNew}
                onToggleVisibility={() => setShowNew((prev) => !prev)}
              />
              <ProfileInputField
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                readOnly={false}
                showToggle
                isVisible={showConfirm}
                onToggleVisibility={() => setShowConfirm((prev) => !prev)}
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSubmitPasswordChange}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg shadow-md"
                >
                  Submit
                </button>
                <button
                  onClick={handleTogglePasswordEdit}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-lg shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        {!isEditing && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleTogglePasswordEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FacultyProfile;

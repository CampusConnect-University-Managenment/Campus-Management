import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function AdminInfo() {
  const [adminData, setAdminData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedAdminCode = localStorage.getItem("adminCode");
    if (!storedAdminCode) return;

    const fetchAdminData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/admin/${storedAdminCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch admin data");

        const json = await res.json();
        setAdminData(json);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        toast.error("Failed to load admin data");
      }
    };

    fetchAdminData();
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPass.trim()) {
      setError("Please enter a new password.");
      return;
    }
    if (!confirmPass.trim()) {
      setError("Please confirm your password.");
      return;
    }
    if (newPass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const storedAdminCode = localStorage.getItem("adminCode");
      if (!storedAdminCode) return;

      const res = await fetch(
        `http://localhost:8088/api/auth/update-password/${storedAdminCode}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to update password");
      }

      toast.success("Password successfully changed");

      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      setShowModal(false);
    } catch (err) {
      console.error("Password update error:", err);
      toast.error(err.message || "Error updating password");
    }
  };

  if (!adminData) {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <p className="text-center mt-24 text-gray-500">
          Loading admin data...
        </p>
      </>
    );
  }

  return (
    <>
      {/* ✅ Keep toaster always mounted */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full mx-auto mt-24">
        <div className="flex items-center space-x-8 mb-8">
          <img
            src={
              adminData.photoUrl ||
              "https://via.placeholder.com/150?text=No+Image"
            }
            alt="Profile"
            className="rounded-full border-4 border-blue-500 w-32 h-32 object-cover"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {adminData.firstName} {adminData.lastName}
            </h1>
            <p className="text-blue-600 font-semibold text-lg mt-1">Admin</p>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4 border-b pb-2">
            Personal Details
          </h2>
          <table className="w-full text-left text-gray-700">
            <tbody>
              <tr>
                <td className="py-2 font-semibold w-1/3">First Name</td>
                <td>{adminData.firstName}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Middle Name</td>
                <td>{adminData.middleName || "N/A"}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Last Name</td>
                <td>{adminData.lastName}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Admin ID</td>
                <td>{adminData.adminCode}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Gender</td>
                <td>{adminData.gender}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Address</td>
                <td>{adminData.address}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Email</td>
                <td>{adminData.email}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Phone</td>
                <td>{adminData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          Change Password
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

            <label className="block mb-2 font-semibold">
              Old Password
              <div className="relative mt-1">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 pr-10"
                  autoFocus
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>

            <label className="block mb-2 font-semibold">
              New Password
              <div className="relative mt-1">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 pr-10"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>

            <label className="block mb-4 font-semibold">
              Confirm Password
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 pr-10"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

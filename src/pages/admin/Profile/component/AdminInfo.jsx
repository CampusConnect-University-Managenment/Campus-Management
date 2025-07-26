import React, { useState } from 'react';

export default function AdminInfo({ admin }) {
  const [showModal, setShowModal] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    if (!oldPass || !newPass || !confirmPass) {
      setError('Please fill all fields');
      return;
    }
    if (newPass !== confirmPass) {
      setError("New password and confirm password don't match");
      return;
    }
    setError('');
    // TODO: Add password update logic here (API call etc)
    alert('Password changed successfully!');
    setShowModal(false);
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <>
     <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full mx-auto mt-24">

        <div className="flex items-center space-x-8 mb-8">
          {/* Profile Picture */}
        <img
  src={admin.profileUrl || 'fallback-image-url'}
  
  className="rounded-full border-4 border-blue-500 w-32 h-32 object-cover"
/>

          {/* Name and Role */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {admin.firstName} {admin.lastName}
            </h1>
            <p className="text-blue-600 font-semibold text-lg mt-1">Admin</p>
          </div>
        </div>

        {/* Personal Details */}
        <div>
          <h2 className="font-bold text-lg mb-4 border-b pb-2">Personal_details</h2>
          <table className="w-full text-left text-gray-700">
            <tbody>
              <tr>
                <td className="py-2 font-semibold w-1/3">First Name</td>
                <td>{admin.firstName}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Middle Name</td>
                <td>{admin.middleName || 'N/A'}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Last Name</td>
                <td>{admin.lastName}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">ADMIN ID</td>
                <td>{admin.AdminId}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Gender</td>
                <td>{admin.gender}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Address</td>
                <td>{admin.address}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Email</td>
                <td>{admin.email}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Phone</td>
                <td>{admin.phone}</td>
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

      {/* Modal for Changing Password */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

            <label className="block mb-2 font-semibold">
              Old Password
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                autoFocus
              />
            </label>

            <label className="block mb-2 font-semibold">
              New Password
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-4 font-semibold">
              Confirm Password
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
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
                onClick={handleChangePassword}
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

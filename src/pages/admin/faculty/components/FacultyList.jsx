import React, { useState } from 'react';

const FacultyList = ({
  data,
  onEdit,
  onDelete,
  onMarkAttendance,
  currentPage,
  totalPages,
  onPageChange,
  attendanceData,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

  const [sortDepartment, setSortDepartment] = useState('');
  const [sortRole, setSortRole] = useState('');

  const handleRowClick = (fac) => {
    setSelectedFaculty(fac);
    setAttendanceStatus('Present');
    setAttendanceDate(new Date().toISOString().split('T')[0]);
  };

  const calculateAttendancePercentage = (facultyId) => {
    const records = attendanceData[facultyId];
    if (!records) return 0;
    const totalDays = Object.keys(records).length || 1;
    const presentDays = Object.values(records).filter(
      (status) => status.toLowerCase() === 'present'
    ).length;
    return ((presentDays / totalDays) * 100).toFixed(0);
  };

  const handleMarkAttendance = () => {
    onMarkAttendance(selectedFaculty.id, attendanceStatus, attendanceDate);
    setSelectedFaculty(null);
  };

  let filteredData = data.filter((fac) =>
    `${fac.firstName} ${fac.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortDepartment) {
    filteredData = filteredData.filter((fac) => fac.department === sortDepartment);
  }

  if (sortRole) {
    filteredData = filteredData.filter((fac) => fac.role === sortRole);
  }

  return (
    <div className="overflow-x-auto mt-6 max-w-5xl mx-auto">
      {/* Search and Sort Controls */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search faculty..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full max-w-xs shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="flex gap-2">
          <select
            value={sortDepartment}
            onChange={(e) => setSortDepartment(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Departments</option>
            {[...new Set(data.map((fac) => fac.department))].sort().map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={sortRole}
            onChange={(e) => setSortRole(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Roles</option>
            {[...new Set(data.map((fac) => fac.role))].sort().map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-50 text-blue-900 text-sm font-semibold">
          <tr>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">First Name</th>
            <th className="p-3 text-left">Last Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          {filteredData.map((fac) => (
            <tr key={fac.id} className="hover:bg-blue-50 transition">
              <td className="p-3">
                <img
                  src={fac.photo}
                  alt={`${fac.firstName} ${fac.lastName}`}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              </td>
              <td className="p-3">{fac.firstName}</td>
              <td className="p-3">{fac.lastName}</td>
              <td className="p-3">{fac.email}</td>
              <td className="p-3">{fac.department}</td>
              <td className="p-3">{fac.role}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleRowClick(fac)}
                  className="px-3 py-1 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedFaculty.photo}
                alt={`${selectedFaculty.firstName} ${selectedFaculty.lastName}`}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-xl font-semibold">{selectedFaculty.firstName} {selectedFaculty.lastName}</h2>
                <p className="text-gray-600">{selectedFaculty.email}</p>
                <p className="text-gray-600">{selectedFaculty.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><strong>Department:</strong> {selectedFaculty.department}</div>
              <div><strong>Role:</strong> {selectedFaculty.role}</div>
              <div><strong>Degree:</strong> {selectedFaculty.degree}</div>
              <div><strong>Experience:</strong> {selectedFaculty.experience}</div>
              <div><strong>Age:</strong> {selectedFaculty.age}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedFaculty.address}</div>
            </div>

            <div className="mt-4">
              <p className="font-medium">Attendance:</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${calculateAttendancePercentage(selectedFaculty.id)}%` }}
                ></div>
              </div>
              <p className="text-right text-sm mt-1">{calculateAttendancePercentage(selectedFaculty.id)}%</p>
            </div>

            {/* Edit/Delete */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => { onEdit(selectedFaculty.id); setSelectedFaculty(null); }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => { onDelete(selectedFaculty.id); setSelectedFaculty(null); }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyList;

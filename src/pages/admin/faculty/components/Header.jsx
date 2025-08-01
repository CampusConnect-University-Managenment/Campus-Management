import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

import FacultyCards from './FacultyCards';
import FacultyForm from './FacultyForm';
import FacultyList from './FacultyList';

const FacultyAdminPage = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFacultyUploadModal, setShowFacultyUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState([]); // Now array of {label,value}
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const facultyExcelInputRef = useRef(null);

  const [formState, setFormState] = useState({
    id: null,
    facultyCode: '',
    photo: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    phone: '',
    address: '',
    department: '',       // Will hold department "value" (id)
    departmentId: '',     // You can keep this if needed; otherwise remove if redundant
    role: '',
    degree: '',
    qualification: '',
    bloodGroup: '',
    gender: '',
    experience: ''
  });

  const fetchFaculty = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/faculty');
      setFacultyData(response.data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/departments");

      // Assuming res.data is array of department objects like { id: string, name: string }
      const mappedDepartments = res.data.map(dept => ({
        label: dept.name,  // or 'departmentName' depending on your API
        value: dept.id
      }));

      setDepartments(mappedDepartments);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/roles');
      setRoles(res.data); // Expecting array of strings, e.g., ['Principal', 'Professor']
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  }, []);

  useEffect(() => {
    fetchFaculty();
    fetchDepartments();
    fetchRoles();
  }, [fetchFaculty, fetchDepartments, fetchRoles]);

  const handleFormChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const faculty = { ...formState };

    try {
      if (faculty.facultyCode) {
        await axios.put(`http://localhost:8080/api/admin/faculty/${faculty.facultyCode}`, faculty);
      } else {
        await axios.post('http://localhost:8080/api/admin/faculty', faculty);
      }
      await fetchFaculty();  // Refresh list after ADD/UPDATE
      resetForm();
    } catch (error) {
      console.error('Error saving faculty:', error);
    }
  };

  const handleEdit = (facultyCode) => {
    const toEdit = facultyData.find(f => f.facultyCode === facultyCode);
    if (toEdit) {
      setFormState({ ...toEdit });
      setShowForm(true);
    }
  };

  const handleDelete = async (facultyCode) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/faculty/${facultyCode}`);
      fetchFaculty();
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  const resetForm = () => {
    setFormState({
      id: null,
      facultyCode: '',
      photo: '',
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      phone: '',
      address: '',
      department: '',   // Clear selected department value
      departmentId: '',
      role: '',
      degree: '',
      qualification: '',
      bloodGroup: '',
      gender: '',
      experience: ''
    });
    setShowForm(false);
  };

  const handleFacultyExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
for (const key in formState) {
  formData.append(key, formState[key]);
}


await axios.post("http://localhost:8080/api/admin/faculty/upload-excel", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
};

  const totalPages = Math.ceil(facultyData.length / itemsPerPage);
  const paginatedData = facultyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Faculty Dashboard</h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              + Add Faculty
            </button>
            <button
              onClick={() => setShowFacultyUploadModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Upload Excel
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={facultyExcelInputRef}
              onChange={(e) => {
                handleFacultyExcelUpload(e);
                setShowFacultyUploadModal(false);
              }}
              className="hidden"
            />
          </div>
        </div>

        <FacultyCards data={facultyData} />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl relative">
            <button
              onClick={resetForm}
              className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            {/* now array of {label,value} */}
<FacultyForm
  formData={formState}
  onChange={handleFormChange}
  onSubmit={handleAddOrUpdate}
  onCancel={resetForm}
  departmentOptions={departments}
  roleOptions={roles}
/>
          </div>
        </div>
      )}

      {showFacultyUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl relative">
            <button
              onClick={() => setShowFacultyUploadModal(false)}
              className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">📤 Upload Faculty Excel Sheet</h3>
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={facultyExcelInputRef}
              onChange={(e) => {
                handleFacultyExcelUpload(e);
                setShowFacultyUploadModal(false);
              }}
              className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">
              Please upload an Excel file with these columns:<br />
              <code className="block bg-gray-100 p-2 rounded text-xs mt-2">
                firstName, lastName, email, phone, dob, age, gender,<br />
                bloodGroup, address, department, departmentId,<br />
                facultyCode, role, degree, qualification, experience
              </code>
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowFacultyUploadModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => facultyExcelInputRef.current.click()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Upload Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      <FacultyList
        data={paginatedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FacultyAdminPage;

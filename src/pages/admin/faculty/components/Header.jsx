import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import FacultyCards from './FacultyCards';
import FacultyForm from './FacultyForm';
import FacultyList from './FacultyList';

const initialFaculty = [
  {
    id: 1,
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
    firstName: 'Arun',
    lastName: 'Kumar',
    email: 'arun.kumar@college.edu',
    phone: '9876543210',
    dob: '12-02-1985',
    age: '40',
    gender: 'Male',
    bloodGroup: 'B+',
    address: 'Chennai, India',
    department: 'CSE',
    departmentId: 'CSE-101',
    facultyId: 'FAC-001',
    role: 'Professor',
    degree: 'Ph.D.',
    experience: '15 '
  },
  {
    id: 2,
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@college.edu',
    phone: '9123456789',
    dob: '05-07-1988',
    age: '37',
    gender: 'Female',
    bloodGroup: 'O+',
    address: 'Mumbai, India',
    department: 'ECE',
    departmentId: 'ECE-102',
    facultyId: 'FAC-002',
    role: 'Associate Professor',
    degree: 'M.Tech',
    experience: '12 '
  },
  {
    id: 3,
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    firstName: 'Ravi',
    lastName: 'Mehta',
    email: 'ravi.mehta@college.edu',
    phone: '9812345678',
    dob: '23-04-1979',
    age: '46',
    gender: 'Male',
    bloodGroup: 'A+',
    address: 'Delhi, India',
    department: 'MECH',
    departmentId: 'MECH-103',
    facultyId: 'FAC-003',
    role: 'Professor',
    degree: 'Ph.D.',
    experience: '20 '
  },
  {
    id: 4,
    photo: 'https://randomuser.me/api/portraits/women/21.jpg',
    firstName: 'Sneha',
    lastName: 'Nair',
    email: 'sneha.nair@college.edu',
    phone: '9870011223',
    dob: '14-11-1990',
    age: '34',
    gender: 'Female',
    bloodGroup: 'AB+',
    address: 'Bangalore, India',
    department: 'CIVIL',
    departmentId: 'CIV-104',
    facultyId: 'FAC-004',
    role: 'Assistant Professor',
    degree: 'M.E.',
    experience: '8 '
  },
  {
    id: 5,
    photo: 'https://randomuser.me/api/portraits/men/51.jpg',
    firstName: 'Karan',
    lastName: 'Verma',
    email: 'karan.verma@college.edu',
    phone: '9845123456',
    dob: '03-01-1982',
    age: '43',
    gender: 'Male',
    bloodGroup: 'B-',
    address: 'Hyderabad, India',
    department: 'EEE',
    departmentId: 'EEE-105',
    facultyId: 'FAC-005',
    role: 'Professor',
    degree: 'Ph.D.',
    experience: '18 '
  },
  {
    id: 6,
    photo: 'https://randomuser.me/api/portraits/women/52.jpg',
    firstName: 'Neha',
    lastName: 'Rao',
    email: 'neha.rao@college.edu',
    phone: '9798989898',
    dob: '30-06-1992',
    age: '33',
    gender: 'Female',
    bloodGroup: 'O-',
    address: 'Pune, India',
    department: 'IT',
    departmentId: 'IT-106',
    facultyId: 'FAC-006',
    role: 'Assistant Professor',
    degree: 'M.Tech',
    experience: '7'
  },
  {
    id: 7,
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    firstName: 'Amit',
    lastName: 'Desai',
    email: 'amit.desai@college.edu',
    phone: '9988776655',
    dob: '11-08-1986',
    age: '39',
    gender: 'Male',
    bloodGroup: 'A-',
    address: 'Ahmedabad, India',
    department: 'CSE',
    departmentId: 'CSE-107',
    facultyId: 'FAC-007',
    role: 'Lecturer',
    degree: 'MCA',
    experience: '10'
  },
  {
    id: 8,
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
    firstName: 'Divya',
    lastName: 'Reddy',
    email: 'divya.reddy@college.edu',
    phone: '9001122334',
    dob: '21-03-1991',
    age: '34',
    gender: 'Female',
    bloodGroup: 'B+',
    address: 'Coimbatore, India',
    department: 'ECE',
    departmentId: 'ECE-108',
    facultyId: 'FAC-008',
    role: 'Assistant Professor',
    degree: 'M.S.',
    experience: '9'
  },
  {
    id: 9,
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    firstName: 'Manish',
    lastName: 'Goyal',
    email: 'manish.goyal@college.edu',
    phone: '9765432198',
    dob: '02-12-1984',
    age: '41',
    gender: 'Male',
    bloodGroup: 'O+',
    address: 'Jaipur, India',
    department: 'MECH',
    departmentId: 'MECH-109',
    facultyId: 'FAC-009',
    role: 'Associate Professor',
    degree: 'Ph.D.',
    experience: '14'
  },
  {
    id: 10,
    photo: 'https://randomuser.me/api/portraits/women/27.jpg',
    firstName: 'Lakshmi',
    lastName: 'Sundar',
    email: 'lakshmi.sundar@college.edu',
    phone: '9898989898',
    dob: '10-10-1980',
    age: '45',
    gender: 'Female',
    bloodGroup: 'AB-',
    address: 'Trivandrum, India',
    department: 'CIVIL',
    departmentId: 'CIV-110',
    facultyId: 'FAC-010',
    role: 'Professor',
    degree: 'Ph.D.',
    experience: '19'
  }

];


const FacultyAdminPage = () => {
  const [facultyData, setFacultyData] = useState(initialFaculty);
  const [showForm, setShowForm] = useState(false);
  const [showFacultyUploadModal, setShowFacultyUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const facultyExcelInputRef = useRef(null);

  const [formState, setFormState] = useState({
    id: null,
    photo: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    phone: '',
    address: '',
    department: '',
    role: '',
    degree: '',
    experience: ''
  });

  useEffect(() => {
    document.body.style.overflow = showForm || showFacultyUploadModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showForm, showFacultyUploadModal]);

  const handleFormChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const newFaculty = { ...formState, id: formState.id ?? Date.now() };
    if (formState.id !== null) {
      setFacultyData(prev => prev.map(f => f.id === formState.id ? newFaculty : f));
    } else {
      setFacultyData(prev => [...prev, newFaculty]);
    }
    resetForm();
  };

  const handleEdit = (id) => {
    const toEdit = facultyData.find(f => f.id === id);
    if (toEdit) {
      setFormState({ ...toEdit });
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    setFacultyData(prev => prev.filter(f => f.id !== id));
  };

  const resetForm = () => {
    setFormState({
      id: null,
      photo: '',
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      phone: '',
      address: '',
      department: '',
      role: '',
      degree: '',
      experience: ''
    });
    setShowForm(false);
  };

  const handleFacultyExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      const newFacultyList = jsonData.map((row, index) => ({
        id: Date.now() + index,
        firstName: row['First Name'] || '',
        lastName: row['Last Name'] || '',
        email: row['Email'] || '',
        department: row['Department'] || '',
        phone: row['Phone'] || '',
        photo: 'https://randomuser.me/api/portraits/lego/1.jpg'
      }));

      const filteredList = newFacultyList.filter(newFac =>
        !facultyData.some(existing => existing.email.toLowerCase() === newFac.email.toLowerCase())
      );

      setFacultyData(prev => [...prev, ...filteredList]);
      alert('Faculty list uploaded successfully!');
    };
    reader.readAsBinaryString(file);
  };

  const totalPages = Math.ceil(facultyData.length / itemsPerPage);
  const paginatedData = facultyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
<h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
  Faculty Dashboard
</h1>




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

        {/* ✅ Faculty Cards */}
        <FacultyCards data={facultyData} />
      </div>

      {/* ✅ Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl relative">
            <button
              onClick={resetForm}
              className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <FacultyForm
              formData={formState}
              onChange={handleFormChange}
              onSubmit={handleAddOrUpdate}
              onCancel={resetForm}
            />
          </div>
        </div>
      )}

      {/* ✅ Excel Upload Modal */}
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
          facultyId, role, degree, experience
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


      {/* ✅ Faculty List with Pagination */}
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

import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import FacultyCards from './FacultyCards';
import FacultyForm from './FacultyForm';
import FacultyList from './FacultyList';

// Default Faculty Data
const initialFaculty = [
 {
    id: 1,
    photo: 'https://ui-avatars.com/api/?name=Anjali+Sharma&background=random',
    firstName: 'Anjali',
    lastName: 'Sharma',
    email: 'anjali.sharma@college.edu',
    age: 34,
    phone: '9876543210',
    address: 'Pune, Maharashtra',
    department: 'CSE',
    role: 'Assistant Professor',
    degree: 'M.Tech',
    experience: '8 years'
  },
  {
    id: 2,
    photo: 'https://ui-avatars.com/api/?name=Rahul+Patil&background=random',
    firstName: 'Rahul',
    lastName: 'Patil',
    email: 'rahul.patil@college.edu',
    age: 40,
    phone: '9765432109',
    address: 'Mumbai, Maharashtra',
    department: 'IT',
    role: 'Associate Professor',
    degree: 'PhD',
    experience: '12 years'
  },
  {
    id: 3,
    photo: 'https://ui-avatars.com/api/?name=Meera+Kumar&background=random',
    firstName: 'Meera',
    lastName: 'Kumar',
    email: 'meera.kumar@college.edu',
    age: 29,
    phone: '9090909090',
    address: 'Chennai, Tamil Nadu',
    department: 'ECE',
    role: 'Lecturer',
    degree: 'M.E.',
    experience: '4 years'
  },
  {
    id: 4,
    photo: 'https://ui-avatars.com/api/?name=Arjun+Singh&background=random',
    firstName: 'Arjun',
    lastName: 'Singh',
    email: 'arjun.singh@college.edu',
    age: 45,
    phone: '9123456780',
    address: 'Delhi',
    department: 'EEE',
    role: 'Professor',
    degree: 'PhD',
    experience: '18 years'
  },
  {
    id: 5,
    photo: 'https://ui-avatars.com/api/?name=Divya+Nair&background=random',
    firstName: 'Divya',
    lastName: 'Nair',
    email: 'divya.nair@college.edu',
    age: 31,
    phone: '9988776655',
    address: 'Kochi, Kerala',
    department: 'CIVIL',
    role: 'Assistant Professor',
    degree: 'M.Tech',
    experience: '7 years'
  },
  {
    id: 6,
    photo: 'https://ui-avatars.com/api/?name=Ramesh+Iyer&background=random',
    firstName: 'Ramesh',
    lastName: 'Iyer',
    email: 'ramesh.iyer@college.edu',
    age: 39,
    phone: '9876123456',
    address: 'Hyderabad, Telangana',
    department: 'MECH',
    role: 'Associate Professor',
    degree: 'PhD',
    experience: '11 years'
  },
  {
    id: 7,
    photo: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=random',
    firstName: 'Sneha',
    lastName: 'Reddy',
    email: 'sneha.reddy@college.edu',
    age: 28,
    phone: '9001122334',
    address: 'Bangalore, Karnataka',
    department: 'CSE',
    role: 'Lecturer',
    degree: 'M.Tech',
    experience: '3 years'
  },
  {
    id: 8,
    photo: 'https://ui-avatars.com/api/?name=Karan+Deshmukh&background=random',
    firstName: 'Karan',
    lastName: 'Deshmukh',
    email: 'karan.deshmukh@college.edu',
    age: 36,
    phone: '9812345678',
    address: 'Nagpur, Maharashtra',
    department: 'IT',
    role: 'Assistant Professor',
    degree: 'M.Sc',
    experience: '9 years'
  },
  {
    id: 9,
    photo: 'https://ui-avatars.com/api/?name=Latha+Menon&background=random',
    firstName: 'Latha',
    lastName: 'Menon',
    email: 'latha.menon@college.edu',
    age: 42,
    phone: '9445566778',
    address: 'Trivandrum, Kerala',
    department: 'ECE',
    role: 'Professor',
    degree: 'PhD',
    experience: '16 years'
  },
  {
    id: 10,
    photo: 'https://ui-avatars.com/api/?name=Vikram+Rao&background=random',
    firstName: 'Vikram',
    lastName: 'Rao',
    email: 'vikram.rao@college.edu',
    age: 38,
    phone: '9677889900',
    address: 'Ahmedabad, Gujarat',
    department: 'MECH',
    role: 'Associate Professor',
    degree: 'M.E.',
    experience: '10 years'
  }
  // ... add remaining faculty objects here
];

const FacultyAdminPage = () => {
  const [facultyData, setFacultyData] = useState(initialFaculty);
  const [attendanceData, setAttendanceData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const attendanceFileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    id: null, photo: '', firstName: '', lastName: '', email: '', age: '', phone: '', address: '', department: '', role: '', degree: '', experience: ''
  });

  useEffect(() => {
    document.body.style.overflow = showForm || showAttendanceModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showForm, showAttendanceModal]);

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
      id: null, photo: '', firstName: '', lastName: '', email: '', age: '', phone: '', address: '', department: '', role: '', degree: '', experience: ''
    });
    setShowForm(false);
  };

  const handleAttendanceUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      const newAttendance = {};
      jsonData.forEach(row => {
        const faculty = facultyData.find(f => f.email.trim().toLowerCase() === String(row.Email).trim().toLowerCase());
        if (faculty) {
          if (!newAttendance[faculty.id]) newAttendance[faculty.id] = {};
          newAttendance[faculty.id][row.Date] = row.Status;
        }
      });
      setAttendanceData(prev => ({ ...prev, ...newAttendance }));
      alert('Attendance uploaded successfully!');
    };
    reader.readAsBinaryString(file);
  };

 

  const calculateAttendancePercentage = () => {
    const totalDays = new Set();
    Object.values(attendanceData).forEach(records => {
      Object.keys(records).forEach(date => totalDays.add(date));
    });
    const totalDaysCount = totalDays.size || 1;
    const presentDays = Object.values(attendanceData).reduce((sum, records) => (
      sum + Object.values(records).filter(status => status.toLowerCase() === 'present').length
    ), 0);
    return ((presentDays / (totalDaysCount * facultyData.length)) * 100).toFixed(1);
  };

  const totalPages = Math.ceil(facultyData.length / itemsPerPage);
  const paginatedData = facultyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
 <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="p-6 space-y-6">
        <FacultyCards data={facultyData} attendancePercentage={calculateAttendancePercentage()} />
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Faculty Records</h2>
          <div className="space-x-2">
            <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200">+ Add Faculty</button>
            <button onClick={() => setShowAttendanceModal(true)} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors duration-200">Bulk Upload</button>
            <input type="file" accept=".xlsx,.xls" ref={attendanceFileInputRef} onChange={(e) => { handleAttendanceUpload(e); setShowAttendanceModal(false); }} className="hidden" />
          </div>
        </div>
      

      {/* Modals and FacultyList remain unchanged */}
    </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl relative">
            <button onClick={resetForm} className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600">&times;</button>
            <FacultyForm
              formData={formState}
              onChange={handleFormChange}
              onSubmit={handleAddOrUpdate}
              onCancel={resetForm}
            />
          </div>
        </div>
      )}

      {/* Excel Upload Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl relative">
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Upload Excel Sheet</h3>
            <button
              onClick={() => attendanceFileInputRef.current.click()}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
              Choose Excel Sheet
            </button>
          </div>
        </div>
      )}

      <FacultyList
        data={paginatedData}
        attendanceData={attendanceData}
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

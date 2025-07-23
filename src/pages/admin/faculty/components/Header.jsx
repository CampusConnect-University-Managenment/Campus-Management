// Enhanced FacultyAdminPage with:
// ✅ Dynamic Attendance % in FacultyCards
// ✅ Attendance per faculty in FacultyList
// ✅ Excel upload to add new faculty in bulk

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import FacultyCards from './FacultyCards';
import FacultyForm from './FacultyForm';
import FacultyList from './FacultyList';

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
    photo: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=random',
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
     photo: 'https://ui-avatars.com/api/?name=Meena+Sharma&background=random',
    firstName: 'Meena',
    lastName: 'Kumar',
    email: 'meena.kumar@college.edu',
    age: 29,
    phone: '9654321098',
    address: 'Bangalore, Karnataka',
    department: 'ECE',
    role: 'Lecturer',
    degree: 'M.Tech',
    experience: '4 years'
  },
  {
    id: 4,
     photo: 'https://ui-avatars.com/api/?name=Vikram+Sharma&background=random',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@college.edu',
    age: 45,
    phone: '9543210987',
    address: 'Delhi',
    department: 'EEE',
    role: 'Professor',
    degree: 'PhD',
    experience: '20 years'
  },
  {
    id: 5,
 photo: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random',
    firstName: 'Priya',
    lastName: 'Nair',
    email: 'priya.nair@college.edu',
    age: 32,
    phone: '9432109876',
    address: 'Kochi, Kerala',
    department: 'MECH',
    role: 'Assistant Professor',
    degree: 'M.Tech',
    experience: '6 years'
  },
  {
    id: 6,
 photo: 'https://ui-avatars.com/api/?name=Arun+Sharma&background=random',
    firstName: 'Arun',
    lastName: 'Reddy',
    email: 'arun.reddy@college.edu',
    age: 38,
    phone: '9321098765',
    address: 'Hyderabad, Telangana',
    department: 'CIVIL',
    role: 'Associate Professor',
    degree: 'PhD',
    experience: '10 years'
  },
  {
    id: 7,
 photo: 'https://ui-avatars.com/api/?name=Sneha+Sharma&background=random',
    firstName: 'Sneha',
    lastName: 'Joshi',
    email: 'sneha.joshi@college.edu',
    age: 30,
    phone: '9210987654',
    address: 'Nagpur, Maharashtra',
    department: 'CSE',
    role: 'Lecturer',
    degree: 'MCA',
    experience: '5 years'
  },
  {
    id: 8,
 photo: 'https://ui-avatars.com/api/?name=Deepak+Sharma&background=random',
    firstName: 'Deepak',
    lastName: 'Gupta',
    email: 'deepak.gupta@college.edu',
    age: 36,
    phone: '9109876543',
    address: 'Lucknow, UP',
    department: 'IT',
    role: 'Assistant Professor',
    degree: 'M.Tech',
    experience: '7 years'
  },
  {
    id: 9,
    photo: 'https://ui-avatars.com/api/?name=Lakshmi+Sharma&background=random',
    firstName: 'Lakshmi',
    lastName: 'Menon',
    email: 'lakshmi.menon@college.edu',
    age: 42,
    phone: '9098765432',
    address: 'Chennai, Tamil Nadu',
    department: 'ECE',
    role: 'Professor',
    degree: 'PhD',
    experience: '18 years'
  },
  {
    id: 10,
 photo: 'https://ui-avatars.com/api/?name=Suresh+Sharma&background=random',
    firstName: 'Suresh',
    lastName: 'Verma',
    email: 'suresh.verma@college.edu',
    age: 39,
    phone: '8987654321',
    address: 'Jaipur, Rajasthan',
    department: 'MECH',
    role: 'Associate Professor',
    degree: 'PhD',
    experience: '11 years'
  }
];

const FacultyAdminPage = () => {
  const [facultyData, setFacultyData] = useState(initialFaculty);
  const [attendanceData, setAttendanceData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const attendanceFileInputRef = useRef(null);
  const facultyFileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    id: null, photo: '', firstName: '', lastName: '', email: '', age: '', phone: '', address: '', department: '', role: '', degree: '', experience: ''
  });

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
    setFormState({ id: null, photo: '', firstName: '', lastName: '', email: '', age: '', phone: '', address: '', department: '', role: '', degree: '', experience: '' });
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
  const handleMarkAttendance = (facultyId, status, date) => {
  setAttendanceData(prev => {
    const updated = { ...prev };
    if (!updated[facultyId]) updated[facultyId] = {};
    updated[facultyId][date] = status;
    return updated;
  });
  alert(`Attendance marked as ${status} on ${date}`);
};


  const handleFacultyUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      const newFacultyData = jsonData.map(row => ({
        id: Date.now() + Math.random(),
        photo: row.Photo || 'https://via.placeholder.com/50',
        firstName: row.FirstName || '',
        lastName: row.LastName || '',
        email: row.Email || '',
        age: row.Age || '',
        phone: row.Phone || '',
        address: row.Address || '',
        department: row.Department || '',
        role: row.Role || '',
        degree: row.Degree || '',
        experience: row.Experience || ''
      }));
      setFacultyData(prev => [...prev, ...newFacultyData]);
      alert('Faculty data uploaded successfully!');
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
            <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
              + Add Faculty
            </button>
            {/* <button onClick={() => facultyFileInputRef.current.click()} className="bg-green-600 text-white px-4 py-2 rounded">
              Upload Faculty Excel
            </button>
            <input type="file" accept=".xlsx,.xls" ref={facultyFileInputRef} onChange={handleFacultyUpload} className="hidden" /> */}
            <button onClick={() => attendanceFileInputRef.current.click()} className="bg-purple-500 text-white px-4 py-2 rounded">
              Upload Attendance
            </button>
            <input type="file" accept=".xlsx,.xls" ref={attendanceFileInputRef} onChange={handleAttendanceUpload} className="hidden" />
          </div>
        </div>
      </div>

      {showForm && (
        <FacultyForm
          formData={formState}
          onChange={handleFormChange}
          onSubmit={handleAddOrUpdate}
          onCancel={resetForm}
        />
      )}

  <FacultyList
  data={paginatedData}
  attendanceData={attendanceData}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onMarkAttendance={handleMarkAttendance}   // ✅ ADD THIS LINE
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

    </div>
  );
};

export default FacultyAdminPage;
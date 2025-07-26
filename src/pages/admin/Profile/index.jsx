import React, { useState, useEffect } from 'react';
import AdminInfo from './component/AdminInfo';

export default function AdminProfile() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const data = {
        firstName: 'Ichshanackiyan',
        middleName: 'N/A',
        lastName: 'Doe',
        AdminId: 'ADT007',
        gender: 'Male',
        address: '123 Tech Street, Knowledge City, Chennai, Tamil Nadu',
        email: 'ichshanackiyan.faculty@university.edu',
        phone: '+91 98765 43210',
        profileUrl: 'https://source.unsplash.com/150x150/?face,person', // Add your actual profile URL here
      };
      setAdminData(data);
    };
    fetchAdmin();
  }, []);

  return (<div className="min-h-screen bg-white flex justify-center items-center p-6">
      {adminData ? (
        <AdminInfo admin={adminData} />
      ) : (
        <p className="text-white text-lg">Loading...</p>
      )}
    </div>
  );
}

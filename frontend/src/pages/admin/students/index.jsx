import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllStudents from './components/AllStudents';
import AddStudent from './components/AddStudent'; // ✅ import added

const StudentRoutes = () => {
  return (
    <Routes>
      {/* Main list page */}
      <Route index element={<AllStudents />} />
      <Route path="all" element={<AllStudents />} />

      {/* Optional route-based modal display */}
      <Route path="add" element={<AddStudent />} /> {/* ✅ Add route */}
    </Routes>
  );
};

export default StudentRoutes;

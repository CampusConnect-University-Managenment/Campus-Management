import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AllStudents = () => {
  return <div>Hello from All Students</div>;
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route index element={<AllStudents />} />
      <Route path="all" element={<AllStudents />} />
    </Routes>
  );
};

export default StudentRoutes;

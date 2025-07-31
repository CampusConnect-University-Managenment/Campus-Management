// NotificationRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Notification from './components/notification'; // adjust the path if needed

const NotificationRoutes = () => {
  return (
    <Routes>
      <Route index element={<Notification isAdminView={true} />} />
      <Route path="admin" element={<Notification isAdminView={true} />} />
      <Route path="student" element={<Notification isAdminView={false} />} />
    </Routes>
  );
};

export default NotificationRoutes;

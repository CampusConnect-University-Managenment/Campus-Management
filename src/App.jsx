import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminRoute from "./components/layout/AdminRoute";
import StudentRoute from "./components/layout/StudentRoute";
import FacultyRoute from './components/layout/FacultyRoute';
import NotificationMessage from './pages/admin/Notification_Message/index.jsx'; // changed import name

const App = () => {
  return (
    <Routes>
      <Route path="admin/*" element={<AdminRoute />} />
      <Route path="student/*" element={<StudentRoute/>} />
      <Route path="faculty/*" element={<FacultyRoute/>}/>
      <Route path="/*" element={<AdminRoute />} />
      <Route path="admin/Notification_Message" element={<NotificationMessage />} /> {/* changed route path */}
    </Routes>
  );
};

export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminRoute from "./components/layout/AdminRoute";
import StudentRoute from "./components/layout/StudentRoute";
import FacultyRoute from './components/layout/FacultyRoute';
import NotificationMessage from './pages/admin/Notification_Message/index.jsx'; // changed import name
import Home from "./pages/Auth/index.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="admin/*" element={<AdminRoute />}>
      <Route path="notification-message" element={<NotificationMessage />} />
     </Route>
      <Route path="student/*" element={<StudentRoute/>} />
      <Route path="faculty/*" element={<FacultyRoute/>}/>
      <Route path="/*" element={<AdminRoute />} />
      <Route path="/auth/login" element={<Home/>}></Route>
     
    </Routes>
  );
};

export default App;
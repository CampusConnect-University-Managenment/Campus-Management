import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminRoute from "./components/layout/AdminRoute";
import StudentRoute from "./components/layout/StudentRoute";
import FacultyRoute from './components/layout/FacultyRoute';
const App = () => {
  
  return (
    <Routes>
      <Route path="admin/*" element={<AdminRoute />} />
      <Route path="student/*" element={<StudentRoute/>} />
      <Route path="faculty/*" element={<FacultyRoute/>}/>
      <Route path="/*" element={<AdminRoute />} />
     
    </Routes>
  );
};

export default App;
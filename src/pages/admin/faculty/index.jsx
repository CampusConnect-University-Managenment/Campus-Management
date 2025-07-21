// /faculty/index.jsx
import React, { useState } from 'react';
import FacultyCards from './components/FacultyCards';

import FacultyList from './components/FacultyList';
import AttendanceCalendar from './components/AttendanceCalendar';
import Notifications from './components/Notifications';

const FacultyDashboard = () => {
  return (
      <div className="p-6 space-y-6">
        <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
        {/* <Notifications /> */}
        {/* <FacultyCards /> */}
        <FacultyList />
        <AttendanceCalendar />
      </div>
    </div>
  );
};

export default FacultyDashboard;

// /faculty/index.jsx
import React, { useState } from 'react';
import FacultyCards from './components/FacultyCards';

import FacultyList from './components/FacultyList';
import AttendanceCalendar from './components/AttendanceCalendar';
import Notifications from './components/Notifications';

const FacultyDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <Notifications />
      {/* <FacultyCards /> */}
      <FacultyList />
      <AttendanceCalendar />
    </div>
  );
};

export default FacultyDashboard;

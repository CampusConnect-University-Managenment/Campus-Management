import React from 'react';

import Notification from './notification.jsx';
import NoticeBoard from './noticeboard.jsx';
import DepartmentOverview from './departmentoverview.jsx';
import FacultyOnLeave from './facultyOnLeave.jsx';
import TotalOverview from './totaloverview.jsx';
import Attendance from './attendance.jsx';

const Header = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Hello, Dr. Sarah Johnson
        </h1>
        <p className="text-gray-600 text-lg mt-1 font-medium">
          Welcome back to your campus dashboard. Here's what's happening today.
        </p>
      </div>

      {/* People Overview */}
      <TotalOverview />

      {/* Attendance Chart */}
      <Attendance />

      {/* Department-wise Overview */}
      <DepartmentOverview />

      {/* Faculty on Leave and Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <FacultyOnLeave />
        <NoticeBoard />
      </div>

      {/* Notifications */}
      <Notification />
    </div>
  );
};

export default Header;

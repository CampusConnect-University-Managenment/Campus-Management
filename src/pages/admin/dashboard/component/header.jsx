// Header.jsx

import React, { useState } from 'react';
import {
  GraduationCap,
  Users2,
  ShieldCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Notification from './notification.jsx';
import NoticeBoard from './noticeboard.jsx';
import DepartmentOverview from './departmentoverview.jsx';
import FacultyOnLeave from './facultyOnLeave.jsx';

const attendanceData = [
  { day: 'Mon', CS: 95, IT: 90, ECE: 85, EEE: 92 },
  { day: 'Tue', CS: 91, IT: 92, ECE: 90, EEE: 90 },
  { day: 'Wed', CS: 96, IT: 85, ECE: 91, EEE: 93 },
  { day: 'Thu', CS: 89, IT: 90, ECE: 93, EEE: 87 },
  { day: 'Fri', CS: 91, IT: 94, ECE: 90, EEE: 90 },
  { day: 'Sat', CS: 86, IT: 88, ECE: 85, EEE: 86 },
];

const Header = () => {
  const [hovering, setHovering] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-24">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hello, Dr. Sarah Johnson</h1>
        <p className="text-gray-600 text-lg mt-1 font-medium">
          Welcome back to your campus dashboard. Here's what's happening today.
        </p>
      </div>

      {/* People Overview */}
      <div>
        <h2 className={`text-xl mb-4 transition-all duration-200 font-bold tracking-wide ${hovering ? 'text-gray-900' : 'text-gray-800'}`}>
          People Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Students */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 font-semibold">Total Students</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">2,847</h3>
                <p className="text-green-600 mt-1 font-medium">+12% from last Year</p>
              </div>
              <GraduationCap className="w-10 h-10 text-gray-700" />
            </div>
          </div>

          {/* Faculty */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 font-semibold">Faculty Members</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">186</h3>
                <p className="text-green-600 mt-1 font-medium">+3% from last Year</p>
              </div>
              <div className="bg-green-100 p-2 rounded-xl">
                <Users2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Admin */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 font-semibold">Admin Staff</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">4</h3>
                <p className="text-orange-600 mt-1 font-medium">+1% from last Year</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Chart */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-sm border mb-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">
          Attendance by Department (Day by Day)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="CS" fill="#3b82f6" barSize={20} isAnimationActive={inView} animationDuration={1500} />
            <Bar dataKey="IT" fill="#22c55e" barSize={20} isAnimationActive={inView} animationDuration={1500} />
            <Bar dataKey="ECE" fill="#f97316" barSize={20} isAnimationActive={inView} animationDuration={1500} />
            <Bar dataKey="EEE" fill="#06b6d4" barSize={20} isAnimationActive={inView} animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Department-wise Overview */}
      <DepartmentOverview />

      {/* Faculty on Leave and Notice Board Side by Side */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="w-full">
        <FacultyOnLeave />
        </div>
        <div className="w-full">
          <NoticeBoard />
        </div>
      </div>

      {/* Help Desk / Notification */}
      <Notification />
    </div>
  );
};

export default Header;

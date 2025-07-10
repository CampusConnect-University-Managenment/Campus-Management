import React, { useState } from 'react';
import { GraduationCap, Users2, ShieldCheck, BookOpen, School, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const attendanceData = [
  { day: 'Mon', CS: 95, IT: 90, ECE: 85, EEE: 92 },
  { day: 'Tue', CS: 91, IT: 92, ECE: 90, EEE: 90 },
  { day: 'Wed', CS: 96, IT: 85, ECE: 91, EEE: 93 },
  { day: 'Thu', CS: 89, IT: 90, ECE: 93, EEE: 87 },
  { day: 'Fri', CS: 91, IT: 94, ECE: 90, EEE: 90 },
  { day: 'Sat', CS: 86, IT: 88, ECE: 85, EEE: 86 },
];

const departments = [
  {
    name: 'CS',
    total: 130,
    enrolled: 120,
    placed: 40,
    rate: '92%',
    color: 'gray',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: 'IT',
    total: 654,
    enrolled: 621,
    placed: 33,
    rate: '95%',
    color: 'green',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: 'ECE',
    total: 478,
    enrolled: 456,
    placed: 22,
    rate: '95%',
    color: 'orange',
    icon: <School className="w-5 h-5" />,
  },
  {
    name: 'EEE',
    total: 510,
    enrolled: 495,
    placed: 18,
    rate: '94%',
    color: 'sky',
    icon: <Briefcase className="w-5 h-5" />,
  },
];

const Header = () => {
  const [hovering, setHovering] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hello, Dr. Sarah Johnson</h1>
        <p className="text-gray-600 text-lg mt-1 font-medium">
          Welcome back to your campus dashboard. Here's what's happening today.
        </p>
      </div>








      {/* People Overview */}
      <div>
        <h2 className={`text-xl mb-4 transition-all duration-200 font-bold tracking-wide ${hovering ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
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
        <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">Attendance by Department (Day by Day)</h3>
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
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-wide">Department-wise Student Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className={`text-${dept.color}-600`}>{dept.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{dept.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">Department</p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{dept.total}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium">Currently Enrolled</p>
                  <p className="text-lg font-bold text-green-600">{dept.enrolled}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium">Students Placed</p>
                  <p className="text-lg font-bold text-gray-700">{dept.placed}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1 font-medium">Enrollment Rate</p>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full bg-${dept.color}-500`}
                    style={{ width: dept.rate }}
                  />
                </div>
                <p className="text-xs text-right text-gray-600 mt-1 font-medium">{dept.rate}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Faculty on Leave and Notice Board Side by Side */}
      <div className="flex gap-6 mb-10">
        {/* Faculty on Leave */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-wide">📅 Faculty on Leave</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Dr. Michael Chen</p>
              <p className="font-semibold text-blue-600 hover:text-blue-200">Computer Science</p>
              <p className="font-medium"><span className="font-bold">Duration:</span> 8/1/2025 - 15/1/2025</p>
              <p className="font-medium"><span className="font-bold">Reason:</span> Medical Leave</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Prof. Emily Rodriguez</p>
              <p className="font-semibold text-blue-600 hover:text-blue-200">IT</p>
              <p className="font-medium"><span className="font-bold">Duration:</span> 10/1/2025 - 12/1/2025</p>
              <p className="font-medium"><span className="font-bold">Reason:</span> Conference</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Dr. James Wilson</p>
              <p className="font-semibold text-blue-600 hover:text-blue-200">EEE</p>
              <p className="font-medium"><span className="font-bold">Duration:</span> 9/1/2025 - 16/1/2025</p>
              <p className="font-medium"><span className="font-bold">Reason:</span> Annual Leave</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Dr. Lisa Thompson</p>
              <p className="font-semibold text-blue-600 hover:text-blue-200">ECE</p>
              <p className="font-medium"><span className="font-bold">Duration:</span> 11/1/2025 - 13/1/2025</p>
              <p className="font-medium"><span className="font-bold">Reason:</span> Personal</p>
            </div>
          </div>
        </div>



        {/* Notice Board */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-wide">📢 Notice Board - Today's Events</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Faculty Meeting</p>
              <p className="font-semibold">🕒 10:00 AM</p>
              <p className="font-medium">📍 Conference Room A</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Student Orientation</p>
              <p className="font-semibold">🕒 2:00 PM</p>
              <p className="font-medium">📍 Main Auditorium</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Library Workshop</p>
              <p className="font-semibold">🕒 3:30 PM</p>
              <p className="font-medium">📍 Library Hall</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <p className="font-bold text-lg">Emergency Drill</p>
              <p className="font-semibold">🕒 4:00 PM</p>
              <p className="font-medium">📍 Campus Wide</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
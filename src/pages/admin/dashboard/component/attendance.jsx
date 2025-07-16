import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
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

const attendanceData = [
  { day: 'Mon', CS: 95, IT: 90, ECE: 85, EEE: 92 },
  { day: 'Tue', CS: 91, IT: 92, ECE: 90, EEE: 90 },
  { day: 'Wed', CS: 96, IT: 85, ECE: 91, EEE: 93 },
  { day: 'Thu', CS: 89, IT: 90, ECE: 93, EEE: 87 },
  { day: 'Fri', CS: 91, IT: 94, ECE: 90, EEE: 90 },
  { day: 'Sat', CS: 86, IT: 88, ECE: 85, EEE: 86 },
];

const Attendance = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
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
  );
};

export default Attendance;

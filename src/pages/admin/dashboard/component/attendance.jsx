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
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; // single arrow icon

const attendanceDataPrimary = [
  { day: 'Mon', CS: 95, IT: 90, ECE: 85, EEE: 92 },
  { day: 'Tue', CS: 91, IT: 92, ECE: 90, EEE: 90 },
  { day: 'Wed', CS: 96, IT: 85, ECE: 91, EEE: 93 },
  { day: 'Thu', CS: 89, IT: 90, ECE: 93, EEE: 87 },
  { day: 'Fri', CS: 91, IT: 94, ECE: 90, EEE: 90 },
  { day: 'Sat', CS: 86, IT: 88, ECE: 85, EEE: 86 },
];

const attendanceDataOther = [
  { day: 'Mon', ETE: 88, CYBER: 83, CT: 87, MECH: 91, CIVIL: 80 },
  { day: 'Tue', ETE: 85, CYBER: 84, CT: 89, MECH: 86, CIVIL: 82 },
  { day: 'Wed', ETE: 90, CYBER: 87, CT: 85, MECH: 88, CIVIL: 83 },
  { day: 'Thu', ETE: 89, CYBER: 85, CT: 84, MECH: 90, CIVIL: 79 },
  { day: 'Fri', ETE: 92, CYBER: 86, CT: 88, MECH: 87, CIVIL: 81 },
  { day: 'Sat', ETE: 84, CYBER: 83, CT: 86, MECH: 85, CIVIL: 80 },
];

const Attendance = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [showPrimary, setShowPrimary] = useState(true);

  const currentData = showPrimary ? attendanceDataPrimary : attendanceDataOther;
  const colors = ['#3b82f6', '#22c55e', '#f97316', '#06b6d4', '#8b5cf6'];
  const keys = Object.keys(currentData[0]).filter((key) => key !== 'day');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="relative bg-white p-6 rounded-2xl shadow-sm border mb-6 overflow-hidden"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">
        Attendance by Department (Day by Day)
      </h3>

      {/* Slide Animation Container */}
      <div className="relative w-full h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={showPrimary ? 'primary' : 'other'}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full top-0 left-0"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                {keys.map((dept, index) => (
                  <Bar
                    key={dept}
                    dataKey={dept}
                    fill={colors[index % colors.length]}
                    barSize={20}
                    isAnimationActive={inView}
                    animationDuration={1500}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Single Arrow Button in Bottom-Right */}
      <button
        onClick={() => setShowPrimary(!showPrimary)}
        className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        title="Switch View"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </motion.div>
  );
};

export default Attendance;

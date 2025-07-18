import React, { useState } from 'react';
import { GraduationCap, Users2, ShieldCheck } from 'lucide-react';

const TotalOverview = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <div>
      <h2
        className={`text-xl mb-4 transition-all duration-200 font-bold tracking-wide ${
          hovering ? 'text-gray-900' : 'text-gray-800'
        }`}
      >
        People Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Students */}
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Total Students</p>
              <h3 className="text-3xl font-bold mt-2">2,847</h3>
              <p className="mt-1 font-medium">+12% from last Year</p>
            </div>
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Faculty */}
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Faculty Members</p>
              <h3 className="text-3xl font-bold mt-2">186</h3>
              <p className="mt-1 font-medium">+3% from last Year</p>
            </div>
            <Users2 className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Admin */}
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Admin Staff</p>
              <h3 className="text-3xl font-bold mt-2">4</h3>
              <p className="mt-1 font-medium">+1% from last Year</p>
            </div>
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalOverview;

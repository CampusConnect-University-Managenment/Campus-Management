import React from 'react';
import { Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <span className="text-xl font-bold">Dashboard</span>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 border rounded-md"
        />
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default Navbar;
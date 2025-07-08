import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <div className="text-2xl font-bold mb-6">CREATIVE TIM</div>
      <nav className="space-y-2">
        <SidebarItem icon={<Home />} text="Dashboard" to="/" />
        <SidebarItem icon={<ClipboardList />} text="Exam" to="/exam" />
        <SidebarItem icon={<Users />} text="Faculty" to="/faculty" />
        <SidebarItem icon={<BookOpen />} text="Student" to="/student" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => (
  <Link to={to} className="block">
    <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
      {icon}
      <span>{text}</span>
    </div>
  </Link>
);

export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, ClipboardList } from 'lucide-react';


const Sidebar = ({ role }) => {
  const menuItems = {
    admin: [
      { icon: <Home />, text: 'Dashboard', to: '/admin/dashboard' },
      { icon: <ClipboardList />, text: 'Exam', to: '/admin/exam' },
      { icon: <Users />, text: 'Faculty', to: '/admin/faculty' },
      { icon: <BookOpen />, text: 'Student', to: '/admin/student' },
      { icon: <BookOpen />, text: 'Notification', to: '/admin/notification-message' },
    ],
   student: [
  { icon: <ClipboardList />, text: 'Exam Interface', to: '/student/examinterface' },
  { icon: <ClipboardList />, text: 'Performance Analytics', to: '/student/performance' },
   { icon: <BookOpen />, text: 'Notification', to: '/admin/notification-message' },
],

    faculty: [
      { icon: <Home />, text: 'Faculty Home', to: '/faculty/home' },
    ],
  };

  
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, ClipboardList } from 'lucide-react';
<Route path="/admin/notification-message" element={<NotificationMessage />} />

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

  const items = menuItems[role] || [];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <div className="text-2xl font-bold mb-6">CREATIVE TIM</div>
      <nav className="space-y-2">
        {items.map((item, idx) => (
          <SidebarItem key={idx} icon={item.icon} text={item.text} to={item.to} />
        ))}
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

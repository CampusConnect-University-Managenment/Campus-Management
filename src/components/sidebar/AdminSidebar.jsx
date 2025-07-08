import React from "react";
import { HiX } from "react-icons/hi";
import Links from "./components/Link";
import routes from "../../routes";

const AdminSidebar = ({ open, onClose }) => {
  const adminRoutes = routes.filter(route => route.layout === "/admin");

  return (
    <div
    // style={{backgroundColor:"green"}}
      className={`fixed top-0 left-0 z-50 h-full w-64 flex-col bg-red-200 shadow-2xl transition-transform duration-300  ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close button for small screens */}
      <span
        className="absolute right-4 top-4 cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX className="text-2xl" />
      </span>

      {/* Logo + Title */}
      <div className="mx-6 mt-12 flex items-center space-x-2">
        <img src="/logo.svg" alt="Admin Logo" className="h-8 w-8" />
        <p className="text-xl font-bold uppercase text-navy-700 dark:text-white">
          Admin Portal
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-300 dark:bg-white/30" />

      {/* Navigation Links */}
      <ul className="flex-1 overflow-y-auto px-4">
        <Links routes={adminRoutes} />
      </ul>
    </div>
  );
};

export default AdminSidebar;

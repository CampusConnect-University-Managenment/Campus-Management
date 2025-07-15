import React, { useState, useEffect, useRef } from "react";
import { Bell, Search, User } from "lucide-react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const searchRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setVisible(false); // Scrolling down -> hide
      } else {
        setVisible(true); // Scrolling up -> show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-3 left-[19rem] w-[calc(100%-19rem-1rem)] z-50 bg-white rounded-2xl shadow-lg px-8 py-4 flex items-center justify-between transition-transform duration-150 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* 🔍 Search Bar */}
      <div ref={searchRef} className="relative">
        {!showSearch ? (
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Search className="h-5 w-5 text-blue-600" />
          </button>
        ) : (
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-blue-500" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-300 text-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            />
          </div>
        )}
      </div>

      {/* 🔔 Notifications and 👤 User */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell className="h-5 w-5 text-blue-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
          <User className="text-blue-600 w-5 h-5" />
        </div>
      </div>
    </nav>
  );
}

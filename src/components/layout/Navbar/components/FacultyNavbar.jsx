import React, { useState, useEffect, useRef } from "react";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FacultyNavbar() {
  const [visible, setVisible] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const lastScrollY = useRef(0);
  const profileRef = useRef();
  const navigate = useNavigate();

  // Handle Navbar scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-3 left-[19rem] w-[calc(100%-19rem-1rem)] z-50 bg-white rounded-2xl shadow-lg px-8 py-4 flex items-center justify-end transition-transform duration-150 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Right Side Controls */}
      <div className="flex items-center gap-6">
        {/* 🔔 Notification Bell */}
        <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <Bell className="h-5 w-5 text-blue-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* 👤 Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            <User className="text-blue-600 w-5 h-5" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-blue-300 rounded-xl shadow-xl z-50 px-4 py-3 space-y-2">
              {/* Top Profile Section */}
              <div className="flex items-center gap-3 border-b pb-3">
                <img
                  src="https://ui-avatars.com/api/?name=Vishwanathan+S"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    Yeswanth
                  </h4>
                  <p className="text-xs text-orange-500 font-medium">
                    Premium Member
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                <span
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/faculty/attendance");
                  }}
                >
                  Progress
                </span>
                <span className="cursor-pointer hover:text-blue-600">
                  Points
                </span>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <span className="cursor-pointer hover:text-blue-600">
                  Settings
                </span>
                <span className="cursor-pointer hover:text-blue-600">
                  Orders
                </span>
                <span
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/faculty/profile");
                  }}
                  className="cursor-pointer hover:text-blue-600 font-medium"
                >
                  Go to Profile
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
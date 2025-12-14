import React from "react";
import { useNavigate } from "react-router-dom";

export const MyTopNav = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Treasury", path: "/treasury" },
    { label: "Announcements", path: "/announcements" },
    { label: "Proposals", path: "/proposals" },
  ];

  return (
    <nav className="hidden md:block bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl sticky top-0 z-50 border-b-2 border-purple-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-extrabold text-white tracking-wider"
            >
              MyLogo
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="px-4 py-2 bg-white bg-opacity-20 text-white font-medium rounded-lg hover:bg-opacity-40 transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

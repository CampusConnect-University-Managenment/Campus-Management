import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes"; // adjust path as needed

const Sidebar = ({ role }) => {
  const location = useLocation();

  // Filter routes based on layout (role) and only include those with `name`
  const sidebarRoutes = routes.filter(
    (route) => route.layout === `/${role}` && route.name
  );

  return (
    <div className="space-y-2 p-4">
      {sidebarRoutes.map((route, index) => (
        <Link
          key={index}
          to={`${route.layout}/${route.path}`}
          className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 transition ${
            location.pathname === `${route.layout}/${route.path}`
              ? "bg-blue-200 font-semibold"
              : "text-gray-700"
          }`}
        >
          {route.icon}
          <span>{route.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;

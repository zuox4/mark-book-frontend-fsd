// pages/teacher/components/TeacherNavigation.tsx
import { teacherNavItems } from "@/config/teacherNavigation";
import React from "react";
import { Link, useLocation } from "react-router-dom";
const TeacherNavigation: React.FC = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    if (path === "") {
      return location.pathname === "/teacher";
    }
    return location.pathname.includes(path);
  };

  return (
    <div className="flex space-x-1 bg-sch-blue-dark rounded-lg p-1">
      {teacherNavItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            isActiveLink(item.to)
              ? "bg-white text-gray-900 shadow-sm"
              : "text-white hover:text-gray-900"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default TeacherNavigation;

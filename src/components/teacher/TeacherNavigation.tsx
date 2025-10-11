// pages/teacher/components/TeacherNavigation.tsx
import { teacherNavItems } from "@/config/teacherNavigation";
import { useAuth } from "@/hooks/auth";
import { useUserData } from "@/hooks/user/useUserData";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface TeacherNavigationProps {
  hasPoffice?: boolean;
  hasEventTypes?: boolean;
  hasGroupsLeader?: boolean;
  hasAdmin?: boolean;
}

const TeacherNavigation: React.FC<TeacherNavigationProps> = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { data } = useUserData(user?.id);

  const hasPoffice = data?.has_p_office;
  const hasEventTypes = data?.has_event_types;
  const hasGroupsLeader = data?.has_groups_leader;
  const hasAdmin = data?.has_admin;
  const isActiveLink = (path: string) => {
    if (path === "") {
      return location.pathname === "/teacher";
    }
    return location.pathname.includes(path);
  };

  const hasAccessToItem = (requiredRole?: string) => {
    if (!requiredRole) return true; // Если роль не указана, доступ разрешен

    switch (requiredRole) {
      case "project_leader":
        return hasPoffice;
      case "event_leader":
        return hasEventTypes;
      case "groups_leader":
        return hasGroupsLeader;
      case "admin":
        return hasAdmin;
      default:
        return true;
    }
  };

  // Фильтруем элементы меню по правам доступа
  const filteredNavItems = teacherNavItems.filter((item) =>
    hasAccessToItem(item.requiredRole)
  );

  return (
    <div className="fixed bg-sch-blue-ultra md:static md:h-fit  bottom-4 h-15 flex items-center w-fit z-10 rounded-full lg:flex space-x-1 lg:bg-sch-blue-dark lg:rounded-lg p-1 ">
      {filteredNavItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`px-4 py-2 text-sm font-medium lg:rounded-md transition-all rounded-full duration-200 ${
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

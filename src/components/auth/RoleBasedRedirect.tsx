// components/RoleBasedRedirect.tsx
import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(user);
    if (isAuthenticated && user) {
      if (user.roles?.includes("teacher")) {
        navigate("/teacher");
      } else if (user.roles?.includes("student")) {
        navigate("/student");
      } else {
        navigate("/");
      }
    }
  }, [user, isAuthenticated, navigate]);

  return null; // Этот компонент ничего не рендерит
};

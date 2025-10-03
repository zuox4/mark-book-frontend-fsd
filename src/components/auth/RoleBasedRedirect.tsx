// components/auth/RoleBasedRedirect.tsx
import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router-dom";

export const RoleBasedRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  console.log("RoleBasedRedirect:", { isAuthenticated, user });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.roles?.includes("teacher")) {
    return <Navigate to="/teacher" replace />;
  } else if (user?.roles?.includes("student")) {
    return <Navigate to="/student" replace />;
  } else {
    return <Navigate to="/welcome" replace />;
  }
};

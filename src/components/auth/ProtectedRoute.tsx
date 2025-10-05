import { useUserData } from "@/hooks/user/useUserData";
import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: "student" | "teacher";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading, logout } = useAuthStore();
  const { error } = useUserData(user?.id);

  if (error) {
    logout();
  }
  if (isLoading) return <div>Загрузка...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    if (user?.roles?.includes("teacher")) {
      return <Navigate to="/teacher" replace />;
    }
    if (user?.roles?.includes("student")) {
      return <Navigate to="/student" replace />;
    }
    // Если роль не определена, редирект на welcome
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};

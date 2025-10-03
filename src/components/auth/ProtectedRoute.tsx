import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "student" | "teacher";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если указана требуемая роль, проверяем её
  if (requiredRole && user?.roles?.includes(requiredRole)) {
    // Редирект на страницу, соответствующую роли пользователя
    if (user?.roles.includes("teacher")) {
      return <Navigate to="teacher" replace />;
    }
    if (user?.roles.includes("student")) {
      return <Navigate to="student" replace />;
    } else {
      return <Navigate to={"/login"} />;
    }
  }

  return <>{children}</>;
};

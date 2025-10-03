import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: "student" | "teacher";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если указана требуемая роль, проверяем что у пользователя она ЕСТЬ
  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    // Редирект на страницу, соответствующую роли пользователя
    if (user?.roles?.includes("teacher")) {
      return <Navigate to="/teacher" replace />;
    }
    if (user?.roles?.includes("student")) {
      return <Navigate to="/student" replace />;
    }
    // Если роль не определена, редирект на welcome
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

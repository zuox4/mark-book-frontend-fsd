// components/ProtectedRoute.tsx
import { useAuthStore } from "@/stores/useAuthStore";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackPath?: string;
}

export const ProtectedRoute = ({
  children,
  fallbackPath = "/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, token, checkAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Если есть токен, но isAuthenticated еще false - проверяем
    if (token && !isAuthenticated && !isLoading) {
      checkAuth().finally(() => {
        setAuthChecked(true);
      });
    } else {
      setAuthChecked(true);
    }
  }, [token, isAuthenticated, isLoading, checkAuth]);

  // Ждем пока проверим авторизацию
  if (!authChecked || (token && isLoading)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

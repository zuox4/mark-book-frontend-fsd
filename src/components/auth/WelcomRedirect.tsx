// components/auth/WelcomeRedirect.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export const WelcomeRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      setShowWelcome(false);

      // Редирект на основе роли
      if (user?.roles?.includes("teacher")) {
        navigate("/teacher", { replace: true });
      } else if (user?.roles?.includes("student")) {
        navigate("/student", { replace: true });
      } else {
        navigate("/welcome", { replace: true });
      }
    }, 2000); // 2 секунды показываем приветствие

    return () => clearTimeout(redirectTimer);
  }, [navigate, user]);

  if (showWelcome) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Добро пожаловать! 👋</h1>
        <p>Рады видеть вас снова</p>
        <div>Загрузка вашей персональной страницы...</div>
      </div>
    );
  }

  return null;
};

export default WelcomeRedirect;

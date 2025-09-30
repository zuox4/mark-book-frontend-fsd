import { MainLayoutAuth } from "@/components/auth/MainLayoutAuth";
import { lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Lazy импорты компонентов форм
const LoginForm = lazy(() => import("@/components/auth/LoginForm"));
const RegisterForm = lazy(() => import("@/components/auth/RegisterForm"));

// Компонент загрузки
const AuthLoading = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

const AuthPage = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const location = path.pathname.slice(1);

  const switchPage = () => {
    if (location === "login") {
      navigate("/registration");
    } else {
      navigate("/login");
    }
  };

  return (
    <MainLayoutAuth>
      <ToastContainer />

      <div className="flex flex-col items-center">
        <Suspense fallback={<AuthLoading />}>
          {location === "login" ? <LoginForm /> : <RegisterForm />}
        </Suspense>

        <span className="text-center text-white">
          {location === "login" ? "Нет аккаунта?" : "Есть аккаунт?"}
          <p
            className="underline font-codec-news cursor-pointer mt-2 text-white"
            onClick={switchPage}
          >
            {location === "login" ? "Зарегистрироваться" : "Войти"}
          </p>
        </span>
      </div>
    </MainLayoutAuth>
  );
};
export default AuthPage;

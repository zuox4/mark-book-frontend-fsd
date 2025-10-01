import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleBasedRedirect } from "@/components/auth/RoleBasedRedirect";
import AuthPage from "@/pages/auth/AuthPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import WelcomePage from "@/pages/auth/WelcomePage";
import EventsPage from "@/pages/student/events/eventsPage";
import ProjectOfficePage from "@/pages/student/project-office/projectOfficePage";
import Student from "@/pages/student/student";
import TeacherPage from "@/pages/teacher/TeacherPage";
import { createBrowserRouter } from "react-router-dom";

const routes = {
  main: { title: "Главная", path: "/" },
  login: { title: "Авторизация", path: "/login" },
  register: { title: "Регистрация", path: "/registration" },
  verify: { title: "Страница верификации", path: "/verify-email" },
  welcome: { title: "Добро пожаловать", path: "/welcome" },
  test: { title: "Тест", path: "/test" },
  teacher: { title: "Преподаватель", path: "/teacher" },
  student: {
    title: "Приложение ученика",
    path: "/student1",
    children: {
      main: { title: "Проектный офис", path: "/student1" },
      events: { title: "Мероприятия ученика", path: "/student1/events" },
    },
  },
};

export const router = createBrowserRouter([
  {
    path: routes.main.path,
    element: (
      <ProtectedRoute>
        <RoleBasedRedirect />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.login.path,
    element: <AuthPage />,
  },
  {
    path: routes.register.path,
    element: <AuthPage />,
  },
  {
    path: routes.verify.path,
    element: <VerifyEmailPage />,
  },
  {
    path: routes.teacher.path,
    element: <TeacherPage />,
  },
  {
    path: routes.welcome.path,
    element: (
      <ProtectedRoute>
        <WelcomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.test.path,
    element: <WelcomePage />,
  },
  {
    path: routes.student.path,
    element: <Student />,
    children: [
      {
        index: true,
        element: <ProjectOfficePage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
    ],
  },
]);

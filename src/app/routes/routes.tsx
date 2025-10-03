import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import AuthPage from "@/pages/auth/AuthPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import WelcomeRedirect from "@/pages/auth/WelcomRedirect";

import TeacherPage from "@/pages/teacher/TeacherPage";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        index: true, // Редирект с / на welcome
        element: <ProtectedRoute />,
      },
      {
        path: "teacher",
        element: <ProtectedRoute requiredRole="teacher" />,
        children: [
          {
            element: <TeacherPage />,
          },
        ],
      },
      {
        path: "student",
        element: <ProtectedRoute requiredRole="student" />,
      },
    ],
  },

  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/registration",
    element: <AuthPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/welcome",
    element: <WelcomeRedirect />,
  },
]);

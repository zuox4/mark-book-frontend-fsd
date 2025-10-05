import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AuthPage from "@/pages/auth/AuthPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import WelcomeRedirect from "@/pages/auth/WelcomRedirect";
import StudentPage from "@/pages/student/student-page";
import TeacherPage from "@/pages/teacher/TeacherPage";

import MarkBookPage from "@/pages/student/mark-book/mark-book-page";
import ProjectOfficePage from "@/pages/student/project-office/project-office-page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TanStackQueryClientProvider from "../providers/query-client-provider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TanStackQueryClientProvider>
        <ProtectedRoute />
      </TanStackQueryClientProvider>
    ), // Общий защищенный маршрут
    children: [
      { index: true, element: <Navigate to={"/teacher"} /> },
      {
        path: "teacher",
        element: <ProtectedRoute requiredRole="teacher" />,
        children: [
          {
            index: true,
            element: <TeacherPage />,
          },
        ],
      },
      {
        path: "student",
        element: <ProtectedRoute requiredRole="student" />,
        children: [
          {
            element: <StudentPage />,
            children: [
              {
                path: "",
                element: <ProjectOfficePage />,
              },
              {
                path: "markBook",
                element: <MarkBookPage />,
              },
            ],
          },
        ],
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

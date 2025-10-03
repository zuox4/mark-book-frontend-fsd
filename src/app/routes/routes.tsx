import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import WelcomeRedirect from "@/components/auth/WelcomRedirect";
import AuthPage from "@/pages/auth/AuthPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";

import EventsPage from "@/pages/student/events/eventsPage";
import MarkBookPage from "@/pages/student/mark-book/markBookPage";
import ProjectOfficePage from "@/pages/student/project-office/projectOfficePage";
import StudentPage from "@/pages/student/student-page";
import TeacherPage from "@/pages/teacher/TeacherPage";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
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
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <WelcomeRedirect />, // Комбинированный компонент
      },
      {
        path: "teacher",
        element: (
          <ProtectedRoute requiredRole="teacher">
            <TeacherPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "student",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true, // Это сработает для /student
            element: <ProjectOfficePage />,
          },
          {
            path: "events", // Это сработает для /student/events
            element: <EventsPage />,
          },
          {
            path: ":id/markBook", // Это сработает для /student/123/markBook
            element: <MarkBookPage />,
          },
        ],
      },
    ],
  },
]);

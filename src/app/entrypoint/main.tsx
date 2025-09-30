import { useAuthStore } from "@/stores/useAuthStore";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes";
import "../styles/index.css";
const token = useAuthStore.getState().token;
if (token) {
  useAuthStore.getState().checkAuth();
}
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

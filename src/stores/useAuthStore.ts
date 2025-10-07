// stores/useAuthStore.ts
import privateApi from "@/services/api/api";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface User {
  id: number;
  email: string;
  display_name: string;
  roles?: string[];
  external_id: string;
  is_verified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;

  clearError: () => void;
  isVerifying: boolean;
  verifyError: string | null;
  verifyEmail: (token: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isVerifying: false,
      verifyError: null,

      verifyEmail: async (token: string) => {
        set({ isVerifying: true, verifyError: null });
        try {
          const response = await privateApi.post("/auth/verify-email", {
            token,
          });
          console.log(response.data);
          set({
            isVerifying: false,
            verifyError: null,
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
          toast.success("Email verified successfully!");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Verification failed";
          set({
            isVerifying: false,
            verifyError: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await privateApi.post("/auth/login", {
            email,
            password,
          });
          const { user, access_token: token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          toast.success("Успешная авторизация");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || "Login failed";
          toast.error(errorMessage);
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      register: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await privateApi.post("/auth/register", {
            email,
            password,
          });
          const { user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          toast.success(response.data.message || "Registration successful");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.detail || "Registration failed";
          toast.error(errorMessage);
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });

        // toast.info("Logged out successfully");
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        // Вызывается когда данные восстановлены из storage
        if (state) {
          state.isLoading = false;
          // Также можно обновить isAuthenticated на основе токена
          state.isAuthenticated = !!state.token;
        }
      },

      version: 1,
    }
  )
);

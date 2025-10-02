import { useAuthStore } from "@/stores/useAuthStore"; // Импортируем ваш store
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Интерсептор с доступом к Zustand store
api.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const token = state.token; // Предполагаемая структура store

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

import { useAuthStore } from "@/stores/useAuthStore"; // Импортируем ваш store
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
export const STATIC_BASE_URL = "http://127.0.0.1:8000/static/logos/";
export const privateApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Интерсептор с доступом к Zustand store
privateApi.interceptors.request.use(
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

privateApi.interceptors.response.use(
  (response) => {
    // Любой статус в диапазоне 2xx вызовет эту функцию
    return response;
  },
  (error) => {
    // Любые статусы за пределами диапазона 2xx вызовут эту функцию
    if (error.response?.status === 401) {
      // 1. Вызовите метод logout из вашего Zustand store
      const logout = useAuthStore.getState().logout;
      logout(); // Убедитесь, что этот метод очищает token и сбрасывает состояние аутентификации:cite[2]
    }

    // 3. Прервите цепочку Promise, чтобы ошибка не обрабатывалась в запросе:cite[4]
    return Promise.reject(error);
  }
);

export default privateApi;

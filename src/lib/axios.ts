import axios from "axios";
import { appConfig } from "@/config/app.config";
import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Session expired or invalid token: clear auth and send user back to login
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

import axios from "axios";
import type { ApiError } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message ?? "An unexpected error occurred",
      status: error.response?.status ?? 500,
      code: error.response?.data?.code,
    };
    return Promise.reject(apiError);
  },
);

export default apiClient;

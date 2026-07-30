import axios from "axios";
import type { ApiError } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const apiClient = axios.create({
  baseURL: API_BASE_URL || '',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED") {
      const apiError: ApiError = {
        success: false,
        message: "Request timed out. Please check your connection and try again.",
      };
      return Promise.reject(apiError);
    }

    if (!error.response) {
      const apiError: ApiError = {
        success: false,
        message: "Unable to reach the server. Please check your internet connection and try again.",
      };
      return Promise.reject(apiError);
    }

    const data = error.response?.data;
    const message = data?.message ?? getDefaultErrorMessage(error.response?.status);
    const apiError: ApiError = {
      success: false,
      message,
      details: data?.details,
    };

    if (error.response?.status === 401 && !error.config?._retry) {
      try {
        error.config._retry = true;
        await apiClient.post("/api/v1/auth/refresh");
        return apiClient(error.config);
      } catch {
        return Promise.reject(apiError);
      }
    }

    return Promise.reject(apiError);
  },
);

function getDefaultErrorMessage(status: number): string {
  switch (status) {
    case 400: return "The request was invalid. Please check your input.";
    case 401: return "Please sign in to continue.";
    case 403: return "You do not have permission to perform this action.";
    case 404: return "The requested resource was not found.";
    case 409: return "A conflict occurred. The resource may already exist.";
    case 429: return "Too many requests. Please wait and try again.";
    case 500: return "Something went wrong on the server. Please try again later.";
    default: return "An unexpected error occurred.";
  }
}

export default apiClient;

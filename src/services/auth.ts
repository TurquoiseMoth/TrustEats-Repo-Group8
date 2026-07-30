import apiClient from "./api";
import type { AuthResponse, LoginRequest, RegisterRequest, ApiResponse } from "../types";

function storeAuth(data: AuthResponse) {
  if (data.token) {
    localStorage.setItem("auth_token", data.token);
  }
  if (data.manufacturer) {
    localStorage.setItem("auth_user", JSON.stringify(data.manufacturer));
  }
}

function clearAuth() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", data);
    const result = res.data.data!;
    storeAuth(result);
    return result;
  },

  register: async (data: RegisterRequest) => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", data);
    const result = res.data.data!;
    storeAuth(result);
    return result;
  },

  logout: () => {
    clearAuth();
  },

  getCurrentUser: async () => {
    const res = await apiClient.get<ApiResponse<AuthResponse>>("/auth/me");
    const result = res.data.data!;
    storeAuth(result);
    return result;
  },

  getStoredUser: () => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getStoredToken: () => localStorage.getItem("auth_token"),
};

import apiClient from "./api";
import type { AuthResponse, LoginRequest, RegisterRequest, ApiResponse } from "../types";

export const authService = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/login", data).then((res) => res.data.data!),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/register", data).then((res) => res.data.data!),

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  getCurrentUser: () =>
    apiClient.get<ApiResponse<AuthResponse>>("/auth/me").then((res) => res.data.data!),
};

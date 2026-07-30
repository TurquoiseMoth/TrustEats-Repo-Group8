import apiClient from "./api";
import type { User, LoginRequest, RegisterRequest, RegisterResponse, ApiResponse } from "../types";

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await apiClient.post<ApiResponse<{ user: User }>>("/api/v1/auth/login", data);
    return res.data.data!.user;
  },

  register: async (data: RegisterRequest) => {
    const res = await apiClient.post<ApiResponse<RegisterResponse>>("/api/v1/auth/register", data);
    return res.data.data!;
  },

  logout: async () => {
    await apiClient.post("/api/v1/auth/logout");
  },

  getCurrentUser: async () => {
    const res = await apiClient.get<ApiResponse<{ user: User }>>("/api/v1/auth/me");
    return res.data.data!.user;
  },

  forgotPassword: async (email: string) => {
    await apiClient.post<ApiResponse<null>>("/api/v1/auth/forgot-password", { email });
  },

  resetPassword: async (data: { token: string; userId: string; newPassword: string; confirmPassword: string }) => {
    await apiClient.post<ApiResponse<null>>("/api/v1/auth/reset-password", data);
  },
};

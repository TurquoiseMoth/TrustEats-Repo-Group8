import apiClient from "./api";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";

export const authService = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", data).then((res) => res.data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>("/auth/register", data).then((res) => res.data),

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  getCurrentUser: () =>
    apiClient.get<AuthResponse>("/auth/me").then((res) => res.data),
};

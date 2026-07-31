import apiClient from "./api";
import { shouldUseMock } from "./mockMode";
import { mockAuthService } from "./mockAuth";
import type { AuthResponse, LoginRequest, RegisterRequest, ApiResponse } from "../types";

// Auth service wraps the backend auth endpoints. It normalizes responses to
// the AuthResponse type in src/types/auth.ts. The functions throw the
// ApiError shape when the request fails (handled by apiClient interceptors).

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
    if (shouldUseMock()) return mockAuthService.login(data);
    const res = await apiClient.post("/auth/login", data);
    const payload = (res.data && res.data.data) ? res.data.data : res.data;
    // Normalize response to { manufacturer?, token? }
    const manufacturer = (payload && (payload.manufacturer ?? payload.user)) ?? undefined;
    const token = (payload && (payload.token ?? payload.accessToken ?? payload.access_token)) ?? undefined;
    const result: AuthResponse = { manufacturer, token };
    storeAuth(result);
    return result;
  },

  register: async (data: RegisterRequest) => {
    if (shouldUseMock()) return mockAuthService.register(data);
    const res = await apiClient.post("/auth/register", data);
    const payload = (res.data && res.data.data) ? res.data.data : res.data;
    const manufacturer = (payload && (payload.manufacturer ?? payload.user)) ?? undefined;
    const token = (payload && (payload.token ?? payload.accessToken ?? payload.access_token)) ?? undefined;
    const result: AuthResponse = { manufacturer, token };
    storeAuth(result);
    return result;
  },

  logout: async () => {
    if (shouldUseMock()) return mockAuthService.logout();
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // ignore
    }

    clearAuth();
  },

  getCurrentUser: async () => {
    if (shouldUseMock()) return mockAuthService.getCurrentUser();
    const res = await apiClient.get("/auth/me");
    const payload = (res.data && res.data.data) ? res.data.data : res.data;
    const manufacturer = (payload && (payload.manufacturer ?? payload.user)) ?? undefined;
    const token = (payload && (payload.token ?? payload.accessToken ?? payload.access_token)) ?? undefined;
    const result: AuthResponse = { manufacturer, token };
    storeAuth(result);
    return result;
  },

  // Convenience accessors for client-side state
  getStoredUser: () => {
    if (shouldUseMock()) return mockAuthService.getStoredUser();
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // Password reset
  forgotPassword: async (email: string) => {
    if (shouldUseMock()) return mockAuthService.forgotPassword(email);
    const res = await apiClient.post<ApiResponse<void>>("/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (payload: { token: string; userId: string; newPassword: string; confirmPassword: string }) => {
    if (shouldUseMock()) return mockAuthService.resetPassword(payload);
    const res = await apiClient.post<ApiResponse<void>>("/auth/reset-password", payload);
    return res.data;
  },

  // Email verification (accepts either `code` or `otp` from callers and sends `otp` to backend)
  verifyEmail: async (payload: { email: string; code?: string; otp?: string }) => {
    if (shouldUseMock()) return mockAuthService.verifyEmail(payload);
    const body = { email: payload.email, otp: payload.otp ?? payload.code };
    const res = await apiClient.post<ApiResponse<Record<string, unknown>>>("/auth/verify-email", body);
    return res.data;
  },

  resendVerification: async (email: string) => {
    if (shouldUseMock()) return mockAuthService.resendVerification(email);
    const res = await apiClient.post<ApiResponse<void>>("/auth/resend-verification", { email });
    return res.data;
  },

  getStoredToken: () => {
    if (shouldUseMock()) return mockAuthService.getStoredToken();
    try {
      return localStorage.getItem("auth_token");
    } catch {
      return null;
    }
  },
};




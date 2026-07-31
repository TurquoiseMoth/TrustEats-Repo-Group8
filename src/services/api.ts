import axios, { isAxiosError, type AxiosError, type AxiosRequestConfig } from "axios";
import type { ApiError } from "../types";

// Default Render deployment for the TrustEats backend.
const DEFAULT_API_BASE_URL = "https://trusteats.onrender.com/api/v1";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || DEFAULT_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  // support cookie-based auth (HttpOnly refresh/access cookies)
  // Enable sending credentials by default.
  withCredentials: true,
});

// Attach auth token when present (keeps compatibility with token-based flows)
apiClient.interceptors.request.use((config) => {
  // Prefer an explicit client-side token when available (localStorage).
  // For development, allow an env fallback token: VITE_DEV_AUTH_TOKEN (useful for local API that doesn't use cookies).
  const tokenFromStorage = localStorage.getItem("auth_token");
  const devToken = (import.meta.env as any)?.VITE_DEV_AUTH_TOKEN as string | undefined;
  const token = tokenFromStorage || (import.meta.env.DEV ? devToken : undefined);

  if (token) {
    const headers = { ...(config.headers as Record<string, string> | undefined), Authorization: `Bearer ${token}` };
    // assign back in a way compatible with axios types
    config.headers = headers as any;
  }
  return config;
});

// NOTE: If you set VITE_DEV_AUTH_TOKEN in .env for local debugging, restart the dev server so Vite picks it up.

// Refresh handling: on 401 try to refresh session once and retry queued requests.
type QueueItem = { resolve: (value?: unknown) => void; reject: (err?: unknown) => void; config: AxiosRequestConfig };
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error?: unknown, token?: string | null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (err: unknown) => {
    // Narrow to axios error when possible
    if (!isAxiosError(err)) {
      const apiError: ApiError = {
        success: false,
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
      };
      return Promise.reject(apiError);
    }

    const error = err as AxiosError;
    const originalRequest = (error.config ?? {}) as AxiosRequestConfig & { _retry?: boolean };

    // Timeout
    if (error.code === "ECONNABORTED") {
      const apiError: ApiError = {
        success: false,
        message: "Request timed out. Please check your connection and try again.",
      };
      return Promise.reject(apiError);
    }

    // No response at all (network error, CORS, DNS, etc.)
    if (!error.response) {
      const apiError: ApiError = {
        success: false,
        message: "Unable to reach the server. Please check your internet connection and try again.",
      };
      return Promise.reject(apiError);
    }

    const status = error.response.status;

    // Attempt token/credential refresh once when we get a 401
    if (status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request until the refresh finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        })
          .then(() => apiClient(originalRequest))
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Determine base URL dynamically so runtime setApiBaseUrl() works.
        const base = (apiClient.defaults.baseURL as string) || API_BASE_URL;
        const refreshUrl = `${base.replace(/\/$/, "")}/auth/refresh`;

        // Use a bare axios call to avoid interceptor recursion. The refresh
        // endpoint typically uses cookies (HttpOnly refresh token), so we include credentials.
        const refreshResp = await axios.post(refreshUrl, null, { withCredentials: true });

        // If the refresh endpoint returned a new token, persist it so the
        // auth header will be attached by the request interceptor on retries.
        const refreshedToken = refreshResp?.data && (refreshResp.data.token ?? refreshResp.data.accessToken ?? refreshResp.data.access_token);
        if (refreshedToken) {
          try {
            localStorage.setItem("auth_token", refreshedToken);
          } catch {
            // ignore storage errors
          }
          // also update default header so immediate retries include it
          apiClient.defaults.headers = { ...(apiClient.defaults.headers as Record<string, unknown>), Authorization: `Bearer ${refreshedToken}` } as any;
        }

        processQueue(undefined, refreshedToken ?? null);
        isRefreshing = false;

        // Retry original request with new cookies/session
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clean local client-side auth state if refresh failed
        try {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        } catch {
          // ignore storage errors
        }

        const apiError: ApiError = {
          success: false,
          message: "Session expired. Please sign in again.",
        };
        return Promise.reject(apiError);
      }
    }

    // For other errors, normalize to ApiError
    const message = (error.response?.data as any)?.message ?? getDefaultErrorMessage(status as number);
    const apiError: ApiError = {
      success: false,
      message,
      details: (error.response?.data as any)?.details,
    };

    return Promise.reject(apiError);
  },
);

function getDefaultErrorMessage(status: number | undefined): string {
  switch (status) {
    case 400:
      return "The request was invalid. Please check your input.";
    case 401:
      return "Please sign in to continue.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "A conflict occurred. The resource may already exist.";
    case 429:
      return "Too many requests. Please wait and try again.";
    case 500:
      return "Something went wrong on the server. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
}

export function setApiBaseUrl(url: string) {
  apiClient.defaults.baseURL = url;
}

export function getApiBaseUrl() {
  return apiClient.defaults.baseURL as string;
}

export default apiClient;

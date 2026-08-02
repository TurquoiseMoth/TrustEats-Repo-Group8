import apiClient, { getApiBaseUrl } from "./api";
import axios from "axios";
import { shouldUseMock } from "./mockMode";
import { mockReportsService } from "./mockReports";
import type { ApiResponse } from "../types";
import { getStoredToken } from "./authStorage";

export interface Report {
  id: string;
  productName?: string;
  code?: string;
  comment?: string;
  imageUrls?: string[];
  status: "pending" | "under_review" | "resolved" | "dismissed";
  reviewNotes?: string;
  createdAt: string;
}

function authHeaders() {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export const reportsService = {
  getAll: () => {
    if (shouldUseMock()) return mockReportsService.getAll();
    return apiClient
      .get<ApiResponse<{ reports: Report[] }>>("/reports/my")
      .then((res) => res.data.data!.reports);
  },

  getById: (id: string) => {
    if (shouldUseMock()) return mockReportsService.getById(id);
    return apiClient.get<ApiResponse<Report>>(`/reports/${id}`).then((res) => res.data.data!);
  },

  // Accept either a JSON object or FormData (with file attachments).
  create: (data: { code: string; comment?: string } | FormData) => {
    if (shouldUseMock()) return mockReportsService.create(data);
    if (data instanceof FormData) {
      // Use a plain axios call so the Content-Type header (with boundary) is set correctly by the browser
      const base = getApiBaseUrl?.() ?? apiClient.defaults.baseURL ?? "";
      return axios
        .post(`${base.replace(/\/$/, "")}/reports`, data, {
          withCredentials: true,
          headers: authHeaders(),
        })
        .then((res) => (res.data && res.data.data) ? res.data.data : res.data);
    }

    return apiClient.post<ApiResponse<Report>>("/reports", data).then((res) => res.data.data!);
  },
};

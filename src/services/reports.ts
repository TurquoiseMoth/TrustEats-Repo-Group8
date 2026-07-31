import apiClient, { getApiBaseUrl } from "./api";
import axios from "axios";
import type { ApiResponse } from "../types";

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

export const reportsService = {
  getAll: () =>
    apiClient.get<ApiResponse<Report[]>>("/reports").then((res) => res.data.data!),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Report>>(`/reports/${id}`).then((res) => res.data.data!),

  // Accept either a JSON object or FormData (with file attachments).
  create: (data: { code: string; comment?: string } | FormData) => {
    if (data instanceof FormData) {
      // Use a plain axios call so the Content-Type header (with boundary) is set correctly by the browser
      const base = getApiBaseUrl?.() ?? apiClient.defaults.baseURL ?? "";
      return axios
        .post(`${base.replace(/\/$/, "")}/reports`, data, { withCredentials: true })
        .then((res) => (res.data && res.data.data) ? res.data.data : res.data);
    }

    return apiClient.post<ApiResponse<Report>>("/reports", data).then((res) => res.data.data!);
  },
};

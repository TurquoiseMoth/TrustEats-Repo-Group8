import apiClient from "./api";
import type { ApiResponse } from "../types";

export interface Report {
  id: string;
  productName?: string;
  code?: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
}

export const reportsService = {
  getAll: () =>
    apiClient.get<ApiResponse<Report[]>>("/reports").then((res) => res.data.data!),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Report>>(`/reports/${id}`).then((res) => res.data.data!),

  create: (data: { code: string; reason: string; description?: string }) =>
    apiClient.post<ApiResponse<Report>>("/reports", data).then((res) => res.data.data!),
};

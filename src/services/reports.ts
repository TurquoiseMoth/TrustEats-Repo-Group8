import apiClient from "./api";
import type { Report, CreateReportRequest, PaginatedResponse } from "../types";

export const reportService = {
  getAll: (page = 1, pageSize = 20) =>
    apiClient
      .get<PaginatedResponse<Report>>("/reports", {
        params: { page, pageSize },
      })
      .then((res) => res.data),

  getById: (id: string) =>
    apiClient.get<Report>(`/reports/${id}`).then((res) => res.data),

  create: (data: CreateReportRequest) =>
    apiClient.post<Report>("/reports", data).then((res) => res.data),

  getByProduct: (productId: string) =>
    apiClient
      .get<PaginatedResponse<Report>>(`/products/${productId}/reports`)
      .then((res) => res.data),
};

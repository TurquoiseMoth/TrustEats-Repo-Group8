import apiClient from "./api";
import type { ApiResponse } from "../types";

export const reportService = {
  submit: (data: {
    code: string;
    comment: string;
    images?: File;
  }) => {
    const fd = new FormData();
    fd.append("code", data.code);
    fd.append("comment", data.comment);
    if (data.images) fd.append("images", data.images, data.images.name);
    return apiClient.post<ApiResponse<{ reportId: string }>>("/api/v1/reports", fd)
      .then((res) => res.data.data!.reportId);
  },

  getMyReports: () =>
    apiClient.get<ApiResponse<{ reports: unknown[] }>>("/api/v1/reports/my")
      .then((res) => res.data.data!.reports),
};

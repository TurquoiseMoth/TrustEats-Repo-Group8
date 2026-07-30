import apiClient from "./api";
import type { VerificationResult, VerificationRequest, ScanHistoryResponse, ApiResponse } from "../types";

export const verificationService = {
  verifyCode: (code: string) =>
    apiClient
      .get<ApiResponse<VerificationResult>>(`/api/v1/verify/${code}`)
      .then((res) => res.data.data!),

  verifyCodeWithContext: (data: VerificationRequest) =>
    apiClient
      .post<ApiResponse<VerificationResult>>("/api/v1/verify", data)
      .then((res) => res.data.data!),

  getHistory: (page = 1, limit = 20) =>
    apiClient
      .get<ApiResponse<ScanHistoryResponse>>(`/api/v1/verify/history?page=${page}&limit=${limit}`)
      .then((res) => res.data.data!),
};

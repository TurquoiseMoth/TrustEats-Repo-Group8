import apiClient from "./api";
import { mockVerificationService } from "./mockVerification";
import { shouldUseMock } from "./mockMode";
import type { VerificationResult, VerificationRequest, ScanHistoryResponse, ApiResponse } from "../types";
import { MOCK_VERIFICATIONS } from "../utils/mockData";

export const verificationService = {
  verifyCode: (code: string): Promise<VerificationResult> => {
    if (shouldUseMock()) return mockVerificationService.verifyCode(code);
    return apiClient
      .get<ApiResponse<VerificationResult>>(`/verify/${code}`)
      .then((res) => res.data.data!);
  },

  verifyCodeWithContext: (data: VerificationRequest): Promise<VerificationResult> => {
    if (shouldUseMock()) return mockVerificationService.verifyCode(data.code);
    return apiClient
      .post<ApiResponse<VerificationResult>>("/verify", data)
      .then((res) => res.data.data!);
  },

  // Fetch scan history (paginated). Returns { events: [], total, page, pages }
  getHistory: async (params?: { page?: number; limit?: number }): Promise<ScanHistoryResponse> => {
    if (shouldUseMock()) {
      return Promise.resolve({ events: MOCK_VERIFICATIONS, total: MOCK_VERIFICATIONS.length, page: 1, pages: 1 });
    }
    const query = [] as string[];
    if (params?.page) query.push(`page=${params.page}`);
    if (params?.limit) query.push(`limit=${params.limit}`);
    const path = `/verify/history${query.length ? `?${query.join("&")}` : ""}`;
    const res = await apiClient.get<ApiResponse<ScanHistoryResponse>>(path);
    return res.data.data!;
  },
};


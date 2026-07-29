import apiClient from "./api";
import { mockVerificationService } from "./mockVerification";
import type { VerificationResult, VerificationRequest, ApiResponse } from "../types";

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const verificationService = {
  verifyCode: (code: string): Promise<VerificationResult> => {
    if (USE_MOCK) return mockVerificationService.verifyCode(code);
    return apiClient
      .get<ApiResponse<VerificationResult>>(`/verify/${code}`)
      .then((res) => res.data.data!);
  },

  verifyCodeWithContext: (data: VerificationRequest): Promise<VerificationResult> => {
    if (USE_MOCK) return mockVerificationService.verifyCode(data.code);
    return apiClient
      .post<ApiResponse<VerificationResult>>("/verify", data)
      .then((res) => res.data.data!);
  },
};

import apiClient from "./api";
import type { VerificationResult, VerificationRequest, ApiResponse } from "../types";

export const verificationService = {
  verifyCode: (code: string) =>
    apiClient
      .get<ApiResponse<VerificationResult>>(`/verify/${code}`)
      .then((res) => res.data.data!),

  verifyCodeWithContext: (data: VerificationRequest) =>
    apiClient
      .post<ApiResponse<VerificationResult>>("/verify", data)
      .then((res) => res.data.data!),
};

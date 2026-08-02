import apiClient from "./api";
import { mockVerificationService } from "./mockVerification";
import { shouldUseMock } from "./mockMode";
import type { VerificationResult, VerificationRequest, ScanHistoryResponse, ApiResponse } from "../types";
import { MOCK_VERIFICATIONS } from "../utils/mockData";

type RawScanEvent = ScanHistoryResponse["events"][number] & {
  result?: ScanHistoryResponse["events"][number]["status"];
};

function normalizeScanHistory(data: ScanHistoryResponse): ScanHistoryResponse {
  return {
    ...data,
    events: (data.events ?? []).map((event) => {
      const status = event.status ?? (event as RawScanEvent).result ?? "fake";
      const product = event.productId;
      return {
        ...event,
        status,
        productName: event.productName ?? product?.name,
        brand: event.brand ?? product?.brand,
        imageUrl: event.imageUrl ?? product?.imageUrl,
      };
    }),
  };
}

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
    return normalizeScanHistory(res.data.data!);
  },
};


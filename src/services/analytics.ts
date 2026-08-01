import apiClient from "./api";
import { shouldUseMock } from "./mockMode";
import { mockAnalyticsService } from "./mockAnalytics";
import type { AnalyticsSummary, ApiResponse } from "../types";

export const analyticsService = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    if (shouldUseMock()) return mockAnalyticsService.getSummary();
    try {
      const res = await apiClient.get<ApiResponse<AnalyticsSummary>>("/analytics/summary");
      return res.data.data!;
    } catch {
      // If the analytics endpoint is missing, not authorized, or offline,
      // return a safe default so the dashboard can render rather than erroring.
      return {
        manufacturer: undefined,
        totalProducts: 0,
        totalCodesIssued: 0,
        totalScans: 0,
        scansByResult: { genuine: 0, suspicious: 0, fake: 0 },
        recentFlags: [],
        recentProducts: [],
      } as AnalyticsSummary;
    }
  },
};


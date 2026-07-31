import apiClient from "./api";
import type { AnalyticsSummary, ApiResponse } from "../types";

export const analyticsService = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    try {
      const res = await apiClient.get<ApiResponse<AnalyticsSummary>>("/analytics/summary");
      return res.data.data!;
    } catch {
      // If the analytics endpoint is missing, not authorized, or offline,
      // return a safe default so the dashboard can render rather than erroring.
      return {
        totalProducts: 0,
        totalCodesIssued: 0,
        totalScans: 0,
        scansByResult: { genuine: 0, suspicious: 0, fake: 0 },
        recentFlags: [],
      } as AnalyticsSummary;
    }
  },
};


import apiClient from "./api";
import type { AnalyticsSummary, ApiResponse } from "../types";

export const analyticsService = {
  getSummary: () =>
    apiClient.get<ApiResponse<AnalyticsSummary>>("/analytics/summary").then((res) => res.data.data!),
};

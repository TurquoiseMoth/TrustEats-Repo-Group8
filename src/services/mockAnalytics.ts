import type { AnalyticsSummary } from "../types";

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const mockAnalyticsService = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    await delay();
    return {
      totalProducts: 12,
      totalCodesIssued: 1840,
      totalScans: 5213,
      scansByResult: { genuine: 4801, suspicious: 221, fake: 191 },
      recentFlags: [
        {
          id: "mock-flag-1",
          scannedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          result: "fake",
          location: { country: "Nigeria", city: "Lagos" },
          product: { name: "Golden Morn Cereal", brand: "Golden Morn" },
          code: "9f4a2c1d-0000-4000-8000-000000000000",
        },
        {
          id: "mock-flag-2",
          scannedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
          result: "suspicious",
          location: { country: "Nigeria", city: "Abuja" },
          product: { name: "Farm Milk", brand: "Farm" },
          code: "6b1e9f3a-0000-4000-8000-000000000000",
        },
      ],
    };
  },
};

import type { Report } from "./reports";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

let reports: Report[] = [
  {
    id: "mock-report-1",
    productName: "Golden Morn Cereal",
    code: "9f4a2c1d-0000-4000-8000-000000000000",
    comment: "Bought from a market in Lagos, packaging looks off.",
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-report-2",
    productName: "Farm Milk",
    code: "6b1e9f3a-0000-4000-8000-000000000000",
    comment: "QR code scanned as suspicious, expiry date near.",
    status: "under_review",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockReportsService = {
  getAll: async (): Promise<Report[]> => {
    await delay();
    return [...reports];
  },

  getById: async (id: string): Promise<Report> => {
    await delay();
    const report = reports.find((r) => r.id === id);
    if (!report) throw { message: "Report not found" };
    return report;
  },

  create: async (data: { code: string; comment?: string }): Promise<Report> => {
    await delay();
    const report: Report = {
      id: `mock-report-${Date.now()}`,
      code: data.code,
      comment: data.comment,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    reports = [report, ...reports];
    return report;
  },
};

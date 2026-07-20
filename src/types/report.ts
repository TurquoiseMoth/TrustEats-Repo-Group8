export interface Report {
  id: string;
  productId: string;
  reason: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

export type ReportStatus = "open" | "investigating" | "resolved" | "dismissed";

export interface CreateReportRequest {
  productId: string;
  reason: string;
  description: string;
}

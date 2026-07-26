export interface AnalyticsSummary {
  totalProducts: number;
  totalCodesIssued: number;
  totalScans: number;
  scansByResult: {
    GENUINE: number;
    SUSPICIOUS: number;
    FAKE: number;
  };
  recentFlags: RecentFlag[];
}

export interface RecentFlag {
  id: string;
  scannedAt: string;
  resultStatus: "GENUINE" | "SUSPICIOUS" | "FAKE";
  reasonCode: string;
  city?: string;
  country?: string;
  product?: {
    id: string;
    name: string;
  } | null;
  code: string;
}

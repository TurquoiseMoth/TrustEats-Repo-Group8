export interface AnalyticsSummary {
  totalProducts: number;
  totalCodesIssued: number;
  totalScans: number;
  scansByResult: {
    genuine: number;
    suspicious: number;
    fake: number;
  };
  recentFlags: RecentFlag[];
}

export interface RecentFlag {
  id: string;
  scannedAt: string;
  result: "genuine" | "suspicious" | "fake";
  location?: {
    country?: string;
    city?: string;
  };
  product?: {
    name: string;
    brand: string;
  } | null;
  code: string;
}

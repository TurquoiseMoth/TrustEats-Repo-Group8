export interface AnalyticsSummary {
  manufacturer?: {
    id: string;
    companyName: string;
    status: "pending" | "approved" | "suspended";
  };
  totalProducts: number;
  totalCodesIssued: number;
  totalScans: number;
  scansByResult: {
    genuine: number;
    suspicious: number;
    fake: number;
  };
  recentFlags: RecentFlag[];
  recentProducts?: RecentProduct[];
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
    imageUrl?: string;
  } | null;
  code: string;
}

export interface RecentProduct {
  id: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  createdAt?: string;
}

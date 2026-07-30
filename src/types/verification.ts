export type VerificationStatus = "genuine" | "suspicious" | "fake";

export interface VerificationResult {
  status: VerificationStatus;
  message: string;
  scannedAt: string;
  product?: {
    name: string;
    brand: string;
  } | null;
  batch?: {
    batchNumber: string;
    status: string;
    expiryDate?: string;
  } | null;
  manufacturer?: {
    companyName: string;
    country: string;
  } | null;
  scanStats?: {
    scansInWindow: number;
    distinctLocationsInWindow: number;
    windowHours: number;
  };
}

export interface VerificationRequest {
  code: string;
  city?: string;
  country?: string;
}

export interface ScanEvent {
  _id: string;
  code: string;
  status: VerificationStatus;
  message: string;
  scannedAt: string;
  productName?: string;
  brand?: string;
}

export interface ScanHistoryResponse {
  events: ScanEvent[];
  total: number;
  page: number;
  pages: number;
}

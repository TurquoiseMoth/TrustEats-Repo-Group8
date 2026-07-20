export interface VerificationResult {
  id: string;
  productId: string;
  status: VerificationStatus;
  confidence: number;
  details: string;
  verifiedAt: string;
}

export type VerificationStatus = "pending" | "verified" | "rejected" | "flagged";

export interface ScanResult {
  barcode: string;
  format: string;
  productId?: string;
}

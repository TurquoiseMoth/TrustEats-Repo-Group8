import type { VerificationStatus } from "./verification";

export interface Product {
  id: string;
  name: string;
  barcode: string;
  brand: string;
  imageUrl?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

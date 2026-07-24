export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  batchNumber?: string;
  manufactureDate?: string;
  expiryDate?: string;
  _count?: {
    verificationCodes: number;
  };
  createdAt?: string;
}

export interface VerificationCode {
  id: string;
  code: string;
  unitSerial: string;
  status: string; // ACTIVE, REVOKED, etc.
  qrCodeUrl: string;
  maxExpectedScans: number;
  productId: string;
  createdAt: string;
}

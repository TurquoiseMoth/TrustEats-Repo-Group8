export interface VerificationResult {
  status: "GENUINE" | "SUSPICIOUS" | "FAKE";
  reason: string;
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    batchNumber: string;
    manufactureDate: string;
    expiryDate: string;
    manufacturer: {
      name: string;
      isVerified: boolean;
    };
    verificationCode: string;
  } | null;
  scanStats?: {
    scansInWindow: number;
    distinctLocationsInWindow: number;
    windowHours: number;
  };
}

export interface VerificationRequest {
  code: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
  deviceId?: string;
}

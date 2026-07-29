import type { VerificationResult } from "../types";

const MOCK_PRODUCTS: Record<string, VerificationResult> = {
  default: {
    status: "GENUINE",
    reason: "Product verified against NAFDAC database",
    product: {
      id: "prod_001",
      name: "Gino Pepper and Onion Paste",
      description: "A rich blend of pepper and onion for authentic Nigerian dishes",
      category: "Condiment",
      imageUrl: "/assets/products/gino-pepper-and-onion-paste-product-image.png",
      batchNumber: "GIN-2026-0618",
      manufactureDate: "2026-06-20",
      expiryDate: "2027-06-22",
      manufacturer: {
        name: "Gino",
        isVerified: true,
      },
      verificationCode: "NAFDAC-2782864",
    },
    scanStats: {
      scansInWindow: 3,
      distinctLocationsInWindow: 1,
      windowHours: 24,
    },
  },
  FAKE: {
    status: "FAKE",
    reason: "Verification code not found in NAFDAC registry",
    product: null,
    scanStats: {
      scansInWindow: 12,
      distinctLocationsInWindow: 8,
      windowHours: 24,
    },
  },
  SUSPICIOUS: {
    status: "SUSPICIOUS",
    reason: "Multiple scans from different locations in short time window",
    product: {
      id: "prod_002",
      name: "Golden Morn Cereal",
      description: "Nutritious whole grain cereal for the whole family",
      category: "Cereal",
      imageUrl: "/assets/products/golden-morn-cereal-product-image.png",
      batchNumber: "GM-2026-0510",
      manufactureDate: "2026-05-15",
      expiryDate: "2027-05-15",
      manufacturer: {
        name: "Golden Morn",
        isVerified: true,
      },
      verificationCode: "NAFDAC-1234567",
    },
    scanStats: {
      scansInWindow: 25,
      distinctLocationsInWindow: 12,
      windowHours: 24,
    },
  },
};

/**
 * Mock verification service that returns fake data for demo/testing.
 * To use the real API, use verificationService from ./verification instead.
 */
export const mockVerificationService = {
  verifyCode: (code: string): Promise<VerificationResult> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const upperCode = code.toUpperCase();
        if (upperCode.includes("FAKE") || upperCode === "000000") {
          resolve(MOCK_PRODUCTS.FAKE);
        } else if (upperCode.includes("SUS") || upperCode === "999999") {
          resolve(MOCK_PRODUCTS.SUSPICIOUS);
        } else {
          // Return genuine result with the scanned code
          const result = { ...MOCK_PRODUCTS.default };
          if (result.product) {
            result.product.verificationCode = `NAFDAC-${code}`;
          }
          resolve(result);
        }
      }, 1200);
    });
  },
};

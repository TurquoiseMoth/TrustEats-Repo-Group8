import type { VerificationResult } from "../types";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const GENUINE_PRODUCT = {
  name: "Our Full Cream Milk",
  brand: "Our",
};

const SUSPICIOUS_PRODUCT = {
  name: "NutriStart Infant Formula",
  brand: "NutriStart",
};

const FAKE_PRODUCT = {
  name: "Golden Morn Cereal",
  brand: "Golden Morn",
};

export const mockVerificationService = {
  verifyCode: async (code: string): Promise<VerificationResult> => {
    await delay();

    if (!code) {
      throw new Error("Code is required");
    }

    const trimmed = code.trim();
    const upper = trimmed.toUpperCase();

    // Documented test codes:
    // "FAKE" / "000000" -> FAKE, "SUS" / "999999" -> SUSPICIOUS, everything else GENUINE
    let status: "genuine" | "suspicious" | "fake" = "genuine";
    let message = "This product is genuine and has passed all verification checks.";
    let product = GENUINE_PRODUCT;
    let batch = {
      batchNumber: "QM001240001",
      status: "active",
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    let manufacturer = { companyName: "Lagos Dairies Ltd", country: "Nigeria" };
    let scanStats = { scansInWindow: 3, distinctLocationsInWindow: 2, windowHours: 24 };

    if (upper === "FAKE" || trimmed === "000000" || /^9/.test(trimmed)) {
      status = "fake";
      message = "This product could not be verified. It may be counterfeit.";
      product = FAKE_PRODUCT;
      batch = { batchNumber: "QM001240999", status: "deactivated", expiryDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() };
      manufacturer = { companyName: "Unverified Supplier", country: "Nigeria" };
      scanStats = { scansInWindow: 47, distinctLocationsInWindow: 9, windowHours: 24 };
    } else if (upper === "SUS" || trimmed === "999999" || /^6/.test(trimmed)) {
      status = "suspicious";
      message = "This product batch is expired or flagged for review. Use caution.";
      product = SUSPICIOUS_PRODUCT;
      batch = { batchNumber: "QM001240666", status: "flagged", expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() };
      manufacturer = { companyName: "NutriStart Foods", country: "Nigeria" };
      scanStats = { scansInWindow: 22, distinctLocationsInWindow: 6, windowHours: 24 };
    }

    return {
      status,
      message,
      scannedAt: new Date().toISOString(),
      product,
      batch,
      manufacturer,
      scanStats,
    };
  },
};

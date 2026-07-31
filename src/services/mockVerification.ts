import type { VerificationResult } from "../types";

export const mockVerificationService = {
  verifyCode: async (code: string): Promise<VerificationResult> => {
    // Small artificial delay to simulate network
    await new Promise((r) => setTimeout(r, 250));

    if (!code) {
      throw new Error("Code is required");
    }

    // Simple rule-based mock: codes starting with `9` are fake, `6` suspicious, otherwise genuine
    let status: "genuine" | "suspicious" | "fake" = "genuine";
    let message = "Mock: verification passed";
    if (/^9/.test(code)) {
      status = "fake";
      message = "Mock: code appears invalid";
    } else if (/^6/.test(code)) {
      status = "suspicious";
      message = "Mock: suspicious activity detected";
    }

    return {
      status,
      message,
      scannedAt: new Date().toISOString(),
      product: { name: "Mock Product", brand: "MockBrand" },
      batch: null,
      manufacturer: null,
      scanStats: { scansInWindow: 0, distinctLocationsInWindow: 0, windowHours: 0 },
    } as VerificationResult;
  },
};

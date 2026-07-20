import apiClient from "./api";
import type { VerificationResult, ScanResult } from "../types";

export const verificationService = {
  verifyProduct: (productId: string) =>
    apiClient
      .post<VerificationResult>(`/verification/${productId}`)
      .then((res) => res.data),

  getResult: (id: string) =>
    apiClient
      .get<VerificationResult>(`/verification/${id}`)
      .then((res) => res.data),

  scanBarcode: (barcode: string) =>
    apiClient
      .post<ScanResult>("/verification/scan", { barcode })
      .then((res) => res.data),
};

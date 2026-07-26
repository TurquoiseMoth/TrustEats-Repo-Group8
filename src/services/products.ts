import apiClient from "./api";
import type { Product, VerificationCode, ApiResponse } from "../types";

export const productService = {
  create: (data: Partial<Product>) =>
    apiClient.post<ApiResponse<Product>>("/products", data).then((res) => res.data.data!),

  getAll: () =>
    apiClient.get<ApiResponse<Product[]>>("/products").then((res) => res.data.data!),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Product>>(`/products/${id}`).then((res) => res.data.data!),

  update: (id: string, data: Partial<Product>) =>
    apiClient.patch<ApiResponse<Product>>(`/products/${id}`, data).then((res) => res.data.data!),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/products/${id}`).then((res) => res.data),

  generateCodes: (productId: string, quantity: number, unitSerialPrefix: string) =>
    apiClient.post<ApiResponse<{ count: number; codes: VerificationCode[] }>>(`/products/${productId}/codes`, { quantity, unitSerialPrefix }).then((res) => res.data.data!),

  getCodes: (productId: string) =>
    apiClient.get<ApiResponse<VerificationCode[]>>(`/products/${productId}/codes`).then((res) => res.data.data!),

  revokeCode: (codeId: string) =>
    apiClient.post<ApiResponse<VerificationCode>>(`/products/codes/${codeId}/revoke`).then((res) => res.data.data!),
};

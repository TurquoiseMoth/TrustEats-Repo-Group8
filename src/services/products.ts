import apiClient from "./api";
import type { Product, Batch, CreateBatchPayload, ApiResponse } from "../types";

function buildFormData(data: Record<string, unknown>): FormData {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      fd.append(key, value, value.name);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) fd.append(key, item, item.name);
        else fd.append(key, String(item));
      });
    } else if (value !== undefined && value !== null) {
      fd.append(key, String(value));
    }
  });
  return fd;
}

export const productService = {
  create: (data: Record<string, unknown>) => {
    const fd = buildFormData(data);
    return apiClient.post<ApiResponse<{ product: Product }>>("/api/v1/products", fd)
      .then((res) => res.data.data!.product);
  },

  getAll: (page = 1, limit = 20) =>
    apiClient.get<ApiResponse<{ products: Product[]; total: number; page: number; pages: number }>>(`/api/v1/products?page=${page}&limit=${limit}`)
      .then((res) => res.data.data!),

  getById: (id: string) =>
    apiClient.get<ApiResponse<{ product: Product }>>(`/api/v1/products/${id}`)
      .then((res) => res.data.data!.product),

  update: (id: string, data: Record<string, unknown>) => {
    const fd = buildFormData(data);
    return apiClient.patch<ApiResponse<{ product: Product }>>(`/api/v1/products/${id}`, fd)
      .then((res) => res.data.data!.product);
  },

  createBatch: (data: CreateBatchPayload) =>
    apiClient.post<ApiResponse<{ batch: Batch; generatedCodes: { code: string; qrCodeUrl: string }[] }>>("/api/v1/batches", data)
      .then((res) => res.data.data!),

  getBatches: (productId: string) =>
    apiClient.get<ApiResponse<{ batches: Batch[] }>>(`/api/v1/batches?productId=${productId}`)
      .then((res) => res.data.data!.batches),
};

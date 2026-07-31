import apiClient, { getApiBaseUrl } from "./api";
import axios, { type AxiosRequestConfig } from "axios";
import type { Product, VerificationCode, ApiResponse } from "../types";

export const productService = {
  // create accepts either JSON or FormData (with image files).
  create: (data: Partial<Product> | FormData) => {
    if (data instanceof FormData) {
      const base = getApiBaseUrl?.() ?? apiClient.defaults.baseURL ?? "";
      return axios
        .post(`${base.replace(/\/$/, "")}/products`, data, { withCredentials: true })
        .then((res) => (res.data && res.data.data) ? res.data.data : res.data);
    }

    return apiClient.post<ApiResponse<Product>>("/products", data).then((res) => res.data.data!);
  },

  getAll: (page = 1, limit = 20) =>
    apiClient.get<ApiResponse<{ products: Product[]; total: number; page: number; pages: number }>>(`/products?page=${page}&limit=${limit}`)
      .then((res) => res.data.data!),

  getById: (id: string) =>
    apiClient.get<ApiResponse<{ product: Product }>>(`/products/${id}`)
      .then((res) => res.data.data!.product),

  update: (id: string, data: Record<string, unknown>) => {
    const fd = buildFormData(data);
    return apiClient.patch<ApiResponse<{ product: Product }>>(`/products/${id}`, fd)
      .then((res) => res.data.data!.product);
  },

  createBatch: (data: CreateBatchPayload) =>
    apiClient.post<ApiResponse<{ batch: Batch; generatedCodes: { code: string; qrCodeUrl: string }[] }>>("/batches", data)
      .then((res) => res.data.data!),

  getBatches: (productId: string) =>
    apiClient.get<ApiResponse<{ batches: Batch[] }>>(`/batches?productId=${productId}`)
      .then((res) => res.data.data!.batches),
};


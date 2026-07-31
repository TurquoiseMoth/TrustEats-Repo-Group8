import apiClient, { getApiBaseUrl } from "./api";
import axios from "axios";
import { shouldUseMock } from "./mockMode";
import { mockProductService } from "./mockProducts";
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
  // create accepts either JSON or FormData (with image files).
  create: (data: Partial<Product> | FormData) => {
    if (shouldUseMock()) return mockProductService.create(data);

    if (data instanceof FormData) {
      const base = getApiBaseUrl?.() ?? apiClient.defaults.baseURL ?? "";
      return axios
        .post(`${base.replace(/\/$/, "")}/products`, data, { withCredentials: true })
        .then((res) => (res.data && res.data.data) ? res.data.data : res.data);
    }

    return apiClient.post<ApiResponse<Product>>("/products", data).then((res) => res.data.data!);
  },

  getAll: (page = 1, limit = 20) => {
    if (shouldUseMock()) return mockProductService.getAll(page, limit);
    return apiClient.get<ApiResponse<{ products: Product[]; total: number; page: number; pages: number }>>(`/products?page=${page}&limit=${limit}`)
      .then((res) => res.data.data!);
  },

  getById: (id: string) => {
    if (shouldUseMock()) return mockProductService.getById(id);
    return apiClient.get<ApiResponse<{ product: Product }>>(`/products/${id}`)
      .then((res) => res.data.data!.product);
  },

  update: (id: string, data: Record<string, unknown>) => {
    if (shouldUseMock()) return mockProductService.update(id, data);
    const fd = buildFormData(data);
    return apiClient.patch<ApiResponse<{ product: Product }>>(`/products/${id}`, fd)
      .then((res) => res.data.data!.product);
  },

  createBatch: (data: CreateBatchPayload) => {
    if (shouldUseMock()) return mockProductService.createBatch(data);
    return apiClient.post<ApiResponse<{ batch: Batch; generatedCodes: { code: string; qrCodeUrl: string }[] }>>("/batches", data)
      .then((res) => res.data.data!);
  },

  getBatches: (productId: string) => {
    if (shouldUseMock()) return mockProductService.getBatches(productId);
    return apiClient.get<ApiResponse<{ batches: Batch[] }>>(`/batches?productId=${productId}`)
      .then((res) => res.data.data!.batches);
  },
};


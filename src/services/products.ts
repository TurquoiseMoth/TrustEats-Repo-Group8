import apiClient from "./api";
import type { Product, PaginatedResponse } from "../types";

export const productService = {
  getAll: (page = 1, pageSize = 20) =>
    apiClient
      .get<PaginatedResponse<Product>>("/products", {
        params: { page, pageSize },
      })
      .then((res) => res.data),

  getById: (id: string) =>
    apiClient.get<Product>(`/products/${id}`).then((res) => res.data),

  getByBarcode: (barcode: string) =>
    apiClient
      .get<Product>(`/products/barcode/${barcode}`)
      .then((res) => res.data),

  search: (query: string) =>
    apiClient
      .get<PaginatedResponse<Product>>("/products/search", {
        params: { q: query },
      })
      .then((res) => res.data),
};

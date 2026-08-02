import apiClient from "./api";
import type { ApiResponse } from "../types";

export interface AuditLogEntry {
  _id: string;
  action: string;
  performedBy?: { _id?: string; email?: string; firstName?: string; lastName?: string };
  performedByRole?: string;
  timestamp?: string;
  targetId?: string;
  targetModel?: string;
}

export interface AdminManufacturer {
  _id: string;
  userId?:
    | string
    | {
        _id?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
      };
  companyName: string;
  napamsEmail?: string;
  cacNumber?: string;
  nafdacNumber?: string;
  nafdacCofRNumber?: string;
  certificateOfRecognitionUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  country?: string;
  status: "pending" | "approved" | "suspended";
  createdAt?: string;
  updatedAt?: string;
  approvedAt?: string;
  productCount?: number;
}

export const adminService = {
  getManufacturers: async (params?: { status?: "pending" | "approved" | "suspended" }) => {
    const qs = params?.status ? `?status=${encodeURIComponent(params.status)}` : "";
    const res = await apiClient.get<ApiResponse<{ manufacturers: AdminManufacturer[] }>>(
      `/admin/manufacturers${qs}`,
    );
    return res.data.data!;
  },

  getManufacturerById: async (manufacturerId: string) => {
    const res = await apiClient.get<ApiResponse<{ manufacturer: AdminManufacturer }>>(
      `/admin/manufacturers/${manufacturerId}`,
    );
    return res.data.data!.manufacturer;
  },

  getPendingManufacturers: async () => {
    const res = await apiClient.get<ApiResponse<{ manufacturers: AdminManufacturer[] }>>("/admin/manufacturers/pending");
    return res.data.data!;
  },

  approveManufacturer: async (manufacturerId: string) => {
    const res = await apiClient.patch<ApiResponse<{ manufacturer: unknown }>>(
      `/admin/manufacturers/${manufacturerId}/approve`
    );
    return res.data;
  },

  suspendManufacturer: async (manufacturerId: string, reason: string) => {
    const res = await apiClient.patch<ApiResponse<void>>(
      `/admin/manufacturers/${manufacturerId}/suspend`,
      { reason }
    );
    return res.data;
  },

  getPendingReports: async () => {
    const res = await apiClient.get<ApiResponse<{ reports: unknown[] }>>(
      "/admin/reports/pending"
    );
    return res.data.data!;
  },

  reviewReport: async (reportId: string, payload: { status: string; reviewNotes?: string }) => {
    const res = await apiClient.patch<ApiResponse<{ report: unknown }>>(
      `/admin/reports/${reportId}/review`,
      payload
    );
    return res.data;
  },

  recallBatch: async (batchId: string, reason: string) => {
    const res = await apiClient.patch<ApiResponse<void>>(
      `/admin/batches/${batchId}/recall`,
      { reason }
    );
    return res.data;
  },

  deactivateCode: async (codeId: string) => {
    const res = await apiClient.patch<ApiResponse<void>>(
      `/admin/codes/${codeId}/deactivate`
    );
    return res.data;
  },

  getAuditLogs: async (params?: { page?: number; limit?: number; action?: string; targetId?: string }) => {
    const qs = [] as string[];
    if (params?.page) qs.push(`page=${params.page}`);
    if (params?.limit) qs.push(`limit=${params.limit}`);
    if (params?.action) qs.push(`action=${encodeURIComponent(params.action)}`);
    if (params?.targetId) qs.push(`targetId=${encodeURIComponent(params.targetId)}`);
    const path = `/admin/audit-logs${qs.length ? `?${qs.join("&")}` : ""}`;
    const res = await apiClient.get<ApiResponse<{ logs: AuditLogEntry[]; total: number; page: number; pages: number }>>(path);
    return res.data.data!;
  },
};

export default adminService;

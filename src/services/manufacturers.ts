import apiClient, { getApiBaseUrl } from "./api";
import axios from "axios";
import { shouldUseMock } from "./mockMode";
import { mockManufacturerService } from "./mockManufacturers";
import type { ApiResponse } from "../types";

export interface ManufacturerProfile {
  _id: string;
  userId: string;
  companyName: string;
  napamsEmail: string;
  cacNumber: string;
  nafdacCofRNumber: string;
  certificateOfRecognitionUrl?: string;
  contactPhone?: string;
  address?: string;
  country?: string;
  logoUrl?: string;
  status: "pending" | "approved" | "suspended";
  termsAcceptedAt?: string;
  createdAt: string;
}

export interface SubmitManufacturerProfileInput {
  companyName: string;
  napamsEmail: string;
  cacNumber: string;
  nafdacCofRNumber?: string;
  certificateOfRecognition: File;
  termsAccepted: boolean;
  contactPhone?: string;
  address?: string;
  country?: string;
  logo?: File;
}

export const manufacturerService = {
  submitProfile: (data: SubmitManufacturerProfileInput) => {
    if (shouldUseMock()) return mockManufacturerService.submitProfile(data);
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value, value.name);
      } else if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    });
    // Use a plain axios call so the browser sets the multipart Content-Type boundary correctly
    const base = getApiBaseUrl?.() ?? apiClient.defaults.baseURL ?? "";
    return axios
      .post(`${base.replace(/\/$/, "")}/manufacturers/register`, fd, { withCredentials: true })
      .then((res) => (res.data && res.data.data) ? res.data.data.manufacturer : res.data);
  },

  getProfile: () => {
    if (shouldUseMock()) return mockManufacturerService.getProfile();
    return apiClient
      .get<
        ApiResponse<{ manufacturer: ManufacturerProfile }>
      >("/manufacturers/me")
      .then((res) => res.data.data!.manufacturer);
  },
};

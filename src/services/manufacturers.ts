import apiClient from "./api";
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
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value, value.name);
      } else if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    });
    return apiClient
      .post<
        ApiResponse<{ manufacturer: ManufacturerProfile }>
      >("/manufacturers/register", fd)
      .then((res) => res.data.data!.manufacturer);
  },

  getProfile: () =>
    apiClient
      .get<
        ApiResponse<{ manufacturer: ManufacturerProfile }>
      >("/manufacturers/me")
      .then((res) => res.data.data!.manufacturer),
};

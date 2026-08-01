import apiClient, { getApiBaseUrl } from "./api";
import axios, { isAxiosError } from "axios";
import { shouldUseMock } from "./mockMode";
import { mockManufacturerService } from "./mockManufacturers";
import type { ApiResponse, RegisterRequest } from "../types";

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

export type RegisterManufacturerAccountInput = RegisterRequest &
  SubmitManufacturerProfileInput;

function authHeaders() {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export const manufacturerService = {
  registerAccount: (data: RegisterManufacturerAccountInput) => {
    if (shouldUseMock()) return mockManufacturerService.submitProfile(data);
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value, value.name);
      } else if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    });

    const base = getApiBaseUrl?.() ?? apiClient.defaults.baseURL ?? "";
    return axios
      .post(`${base.replace(/\/$/, "")}/manufacturers/register-account`, fd, {
        withCredentials: true,
      })
      .then((res) => (res.data && res.data.data) ? res.data.data : res.data)
      .catch((err: unknown) => {
        if (isAxiosError(err)) {
          const data = err.response?.data as
            | { message?: string; error?: string }
            | undefined;
          throw new Error(
            data?.message ??
              data?.error ??
              "Manufacturer account registration failed.",
          );
        }
        throw err;
      });
  },

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
      .post(`${base.replace(/\/$/, "")}/manufacturers/register`, fd, {
        withCredentials: true,
        headers: authHeaders(),
      })
      .then((res) => (res.data && res.data.data) ? res.data.data.manufacturer : res.data)
      .catch((err: unknown) => {
        if (isAxiosError(err)) {
          const data = err.response?.data as
            | { message?: string; error?: string }
            | undefined;
          throw new Error(
            data?.message ??
              data?.error ??
              "Manufacturer profile submission failed.",
          );
        }
        throw err;
      });
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

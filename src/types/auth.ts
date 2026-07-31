export interface Manufacturer {
  id: string;
  name: string;
  email: string;
  role?: string;
  isVerified?: boolean;
  apiKey?: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  // legacy "name" kept for compatibility with older callers
  name?: string;
  // preferred: full name field
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: 'consumer' | 'manufacturer';
  // whether the user accepted terms — sent for audit/compliance, optional
  termsAccepted?: boolean;
}

export interface AuthResponse {
  manufacturer: Manufacturer;
  token?: string;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
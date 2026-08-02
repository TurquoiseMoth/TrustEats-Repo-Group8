export interface User {
  _id: string;
  id?: string;
  email: string;
  role: "consumer" | "manufacturer" | "admin";
  firstName: string;
  lastName: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
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
  role?: "consumer" | "manufacturer";
  // whether the user accepted terms — sent for audit/compliance, optional
  termsAccepted?: boolean;
}

export interface AuthResponse {
  manufacturer?: User;
  token?: string;
  otp?: string;
  userId?: string;
  role?: "consumer" | "manufacturer" | "admin";
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "consumer" | "manufacturer";
}

export interface RegisterResponse {
  userId: string;
  role: string;
}

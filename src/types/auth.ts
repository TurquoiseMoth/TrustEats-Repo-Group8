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
  name: string;
  email: string;
  password: string;
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
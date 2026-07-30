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



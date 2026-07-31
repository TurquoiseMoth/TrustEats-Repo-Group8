import type { AuthResponse, User, LoginRequest, RegisterRequest, ApiResponse } from "../types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

interface MockAccount {
  email: string;
  password: string;
  user: User;
}

// Demo accounts — safe to share, they only exist in mock mode.
export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    email: "admin@trusteats.demo",
    password: "Admin@123",
    user: {
      _id: "mock-admin-1",
      email: "admin@trusteats.demo",
      role: "admin",
      firstName: "TrustEats",
      lastName: "Admin",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "manufacturer@trusteats.demo",
    password: "Manufacturer@123",
    user: {
      _id: "mock-mfr-1",
      email: "manufacturer@trusteats.demo",
      role: "manufacturer",
      firstName: "Golden",
      lastName: "Foods",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "consumer@trusteats.demo",
    password: "Consumer@123",
    user: {
      _id: "mock-consumer-1",
      email: "consumer@trusteats.demo",
      role: "consumer",
      firstName: "Ada",
      lastName: "Okafor",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  },
];

function storeSession(user: User): void {
  try {
    localStorage.setItem("auth_token", "mock-token");
    localStorage.setItem("auth_user", JSON.stringify(user));
  } catch {
    // ignore storage errors
  }
}

function clearSession(): void {
  try {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  } catch {
    // ignore storage errors
  }
}

function toAuthResponse(user: User): AuthResponse {
  return { manufacturer: user, token: "mock-token" };
}

function buildUser(data: RegisterRequest): User {
  const fullName = data.fullName ?? data.name ?? "";
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return {
    _id: `mock-${Date.now()}`,
    email: data.email,
    role: data.role === "manufacturer" ? "manufacturer" : "consumer",
    firstName: firstName || "New",
    lastName: rest.join(" ") || "User",
    isActive: true,
    createdAt: new Date().toISOString(),
  };
}

export const mockAuthService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await delay();
    const email = data.email.trim().toLowerCase();
    const account = MOCK_ACCOUNTS.find(
      (a) => a.email === email && a.password === data.password,
    );
    if (!account) {
      throw { message: "Invalid email or password." };
    }
    storeSession(account.user);
    return toAuthResponse(account.user);
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    await delay();
    const user = buildUser(data);
    storeSession(user);
    return toAuthResponse(user);
  },

  logout: async (): Promise<void> => {
    await delay(100);
    clearSession();
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    await delay(150);
    try {
      const raw = localStorage.getItem("auth_user");
      if (!raw) throw new Error("Not authenticated");
      const user = JSON.parse(raw) as User;
      if (!user) throw new Error("Not authenticated");
      return toAuthResponse(user);
    } catch {
      throw { message: "Not authenticated" };
    }
  },

  forgotPassword: async (): Promise<ApiResponse<void>> => {
    await delay(200);
    return { success: true, message: "If that email exists, a reset link was sent." };
  },

  resetPassword: async (): Promise<ApiResponse<void>> => {
    await delay(200);
    return { success: true };
  },

  verifyEmail: async (): Promise<ApiResponse<Record<string, unknown>>> => {
    await delay(200);
    return { success: true };
  },

  resendVerification: async (): Promise<ApiResponse<void>> => {
    await delay(200);
    return { success: true };
  },

  getStoredUser: (): User | null => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  getStoredToken: (): string | null => {
    try {
      return localStorage.getItem("auth_token");
    } catch {
      return null;
    }
  },
};

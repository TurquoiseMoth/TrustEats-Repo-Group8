import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { authService } from "../services/auth";
import type { Manufacturer, RegisterRequest } from "../types";

interface AuthContextValue {
  user: Manufacturer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Manufacturer | null>(authService.getStoredUser());
  const [token, setToken] = useState<string | null>(authService.getStoredToken());
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!token;

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    setUser(result.manufacturer);
    setToken(result.token ?? null);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const result = await authService.register(data);
    setUser((result as any).manufacturer);
    setToken((result as any).token ?? null);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const result = await authService.getCurrentUser();
      setUser(result.manufacturer);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

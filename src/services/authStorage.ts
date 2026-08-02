import type { User } from "../types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const ROLES = ["admin", "manufacturer", "consumer"] as const;

function roleTokenKey(role: string) {
  return `${TOKEN_KEY}_${role}`;
}

function safeGet(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // ignore storage errors
  }
}

function safeRemove(storage: Storage, key: string) {
  try {
    storage.removeItem(key);
  } catch {
    // ignore storage errors
  }
}

export function storeAuthSession(user?: User, token?: string) {
  if (token) {
    safeSet(sessionStorage, TOKEN_KEY, token);
    safeSet(localStorage, TOKEN_KEY, token);
    if (user?.role) {
      safeSet(sessionStorage, roleTokenKey(user.role), token);
      safeSet(localStorage, roleTokenKey(user.role), token);
    }
  }
  if (user) {
    const raw = JSON.stringify(user);
    safeSet(sessionStorage, USER_KEY, raw);
    safeSet(localStorage, USER_KEY, raw);
  }
}

export function storeRoleToken(role: "admin" | "manufacturer" | "consumer", token: string) {
  safeSet(sessionStorage, roleTokenKey(role), token);
  safeSet(localStorage, roleTokenKey(role), token);
}

export function clearAuthSession() {
  safeRemove(sessionStorage, TOKEN_KEY);
  safeRemove(sessionStorage, USER_KEY);
  safeRemove(localStorage, TOKEN_KEY);
  safeRemove(localStorage, USER_KEY);
  ROLES.forEach((role) => {
    safeRemove(sessionStorage, roleTokenKey(role));
    safeRemove(localStorage, roleTokenKey(role));
  });
}

export function getStoredUser(): User | null {
  const raw = safeGet(sessionStorage, USER_KEY) ?? safeGet(localStorage, USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return safeGet(sessionStorage, TOKEN_KEY) ?? safeGet(localStorage, TOKEN_KEY);
}

export function getRoleToken(role: "admin" | "manufacturer" | "consumer") {
  const roleToken =
    safeGet(sessionStorage, roleTokenKey(role)) ??
    safeGet(localStorage, roleTokenKey(role));
  if (roleToken) return roleToken;

  const user = getStoredUser();
  if (user?.role === role) {
    return getStoredToken();
  }

  return null;
}

export function getTokenForPath(path: string) {
  if (path.startsWith("/admin")) {
    return getRoleToken("admin");
  }

  if (
    path.startsWith("/products") ||
    path.startsWith("/batches") ||
    path.startsWith("/manufacturers") ||
    path.startsWith("/analytics")
  ) {
    return getRoleToken("manufacturer");
  }

  return getStoredToken();
}

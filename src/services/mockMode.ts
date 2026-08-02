// Runtime mock mode: lets users switch the whole app to local mock data
// (e.g. when the backend is down) without rebuilding or setting env vars.
// State is persisted in localStorage so it survives reloads.

const STORAGE_KEY = "trusteats_mock_mode";

export function isMockMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMockMode(enabled: boolean): void {
  try {
    if (enabled) localStorage.setItem(STORAGE_KEY, "1");
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
  window.dispatchEvent(
    new CustomEvent("trusteats:mock-mode", { detail: { enabled } }),
  );
}

// Mock mode must be explicitly enabled by env and runtime toggle.
// Do not silently fall back to mock auth when VITE_API_BASE_URL is missing:
// api.ts already has a real default backend URL, and silent mock signup means
// users never get created in the database.
export function shouldUseMock(): boolean {
  return import.meta.env.VITE_ENABLE_MOCK_MODE === "true" && isMockMode();
}

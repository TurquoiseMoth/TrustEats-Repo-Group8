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

// The app only uses mock data when the runtime toggle is on. When no backend
// URL is configured it falls back to the default Render deployment (see
// src/services/api.ts), so the live API is used unless mock mode is enabled.
export function shouldUseMock(): boolean {
  return isMockMode();
}

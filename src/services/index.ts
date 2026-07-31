export { default as apiClient } from "./api";
export { authService } from "./auth";
export { productService } from "./products";
export { analyticsService } from "./analytics";
export { verificationService } from "./verification";

// Helper: initializeServices
// Call this early in app startup (main.tsx) if you need to programmatically
// set the API base URL from a Postman collection or other external config.
export function initializeServices({ apiBaseUrl }: { apiBaseUrl?: string }) {
  if (apiBaseUrl) {
    // Lazy-set default on the api client
    void import("./api").then((m) => {
      m.setApiBaseUrl(apiBaseUrl);
    });
  }
}

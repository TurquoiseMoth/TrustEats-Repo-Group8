import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Allow overriding proxy target via VITE_API_PROXY_TARGET when running locally.
const API_PROXY_TARGET =
  process.env.VITE_API_PROXY_TARGET || "https://trusteats.onrender.com";
const proxySecure = API_PROXY_TARGET.startsWith("https");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/v1": {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: proxySecure,
      },
    },
  },
});

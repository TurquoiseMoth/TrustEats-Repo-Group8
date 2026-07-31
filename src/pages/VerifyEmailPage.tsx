import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "../constants";
import { EmailVerification } from "../components/EmailVerification";

// Toast initialization moved to main.tsx to make it global across the app.




























export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as { email?: string })?.email;

  const handleVerify = async (code: string): Promise<boolean> => {
    if (!email) return false;
    try {
      // Call backend verify endpoint
      const { authService } = await import("../services/auth");

      const res = await authService.verifyEmail({ email, code });

      // Backend may return { success: boolean } or { success: boolean, message?: string } or data in res.data
      // We intentionally avoid noisy console.debug in cleanup mode.
      if (res && (res.success === true || (res.success === undefined && res.data))) {
        return true;
      }

      // If backend provided an error message, surface it to the user via a toast
      const backendMessage = (res && (res.message || (res.data && (res.data.message || (res.data as any).error)))) as string | undefined;
      if (backendMessage) {
        window.dispatchEvent(new CustomEvent("trusteats:notify", { detail: { type: "error", message: backendMessage } }));
      }

      return false;
    } catch (err: any) {
      // verify email failed — handled by toast below.
      const msg = err?.message ?? "Verification failed";
      window.dispatchEvent(new CustomEvent("trusteats:notify", { detail: { type: "error", message: msg } }));
      return false;
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      const { authService } = await import("../services/auth");
      await authService.resendVerification(email);
    } catch {
      // ignore
    }
  };

  if (!email) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",     background: "#f0f8ff", fontFamily: "'Inter', sans-serif", padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#292d32", marginBottom: "8px" }}>Verify Your Email</h1>
        <p style={{ fontSize: "15px", color: "#666666", textAlign: "center" }}>
          No email provided. Please sign up first.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "#eef4fc" }}>
      <EmailVerification
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        onVerified={() => navigate(ROUTES.DASHBOARD)}
        step={{ current: 2, total: 3 }}
      />
    </div>
  );
}
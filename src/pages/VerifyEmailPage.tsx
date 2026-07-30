import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "../constants";
import { EmailVerification } from "../components/EmailVerification";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as { email?: string })?.email;

  const handleVerify = async (code: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    return code === "123456";
  };

  const handleResend = async () => {
    await new Promise((r) => setTimeout(r, 500));
  };

  if (!email) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#eef4fc", fontFamily: "'Inter', sans-serif", padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#292d32", marginBottom: "8px" }}>Verify Your Email</h1>
        <p style={{ fontSize: "15px", color: "#666", textAlign: "center" }}>
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
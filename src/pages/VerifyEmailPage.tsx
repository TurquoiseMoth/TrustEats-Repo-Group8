import { useLocation, useNavigate } from "react-router-dom";
import { EmailVerification } from "../components/EmailVerification";

// Adjust this import to wherever your API client actually lives
// import { verifyEmailCode, resendEmailCode } from "../api/auth";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pass the email in via router state when navigating here from Sign Up,
  // e.g. navigate("/verify-email", { state: { email } })
  const email = (location.state as { email?: string })?.email ?? "test@example.com";

  const handleVerify = async (code: string): Promise<boolean> => {
    // TEMPORARY fake check for testing — swap this for the real API call
    // once your backend endpoint exists.
    await new Promise((r) => setTimeout(r, 800));
    return code === "123456";
  };

  const handleResend = async () => {
    // TEMPORARY fake resend for testing.
    await new Promise((r) => setTimeout(r, 500));
    console.log("Fake resend triggered — a new code would be sent to", email);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "#eef4fc" }}>
      <EmailVerification
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        onVerified={() => navigate("/onboarding")}
        step={{ current: 2, total: 3 }}
      />
    </div>
  );
}
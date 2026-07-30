import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { ROUTES } from "../constants";
import { verificationService } from "../services/verification";
import type { VerificationResult } from "../types";

type ConfirmState = "confirming" | "verifying" | "error";

export default function ScanConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const code = (location.state as { code?: string })?.code ?? "";
  const [state, setState] = useState<ConfirmState>(code ? "verifying" : "confirming");
  const [errorMessage, setErrorMessage] = useState("");
  const verifiedRef = useRef(false);

  const verify = useCallback(async (c: string) => {
    try {
      const result: VerificationResult = await verificationService.verifyCode(c);
      if (result.status === "GENUINE") {
        navigate(ROUTES.VERIFY.replace(":code", c), { state: { result } });
      } else {
        navigate(ROUTES.RESULT.replace(":code", c), { state: { result } });
      }
    } catch {
      setErrorMessage("Could not verify product. Please check your connection and try again.");
      setState("error");
    }
  }, [navigate]);

  useEffect(() => {
    if (code && !verifiedRef.current) {
      verifiedRef.current = true;
      verify(code);
    }
  }, [code, verify]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to={ROUTES.SCAN} style={styles.backBtn}>&lsaquo;</Link>
        <h1 style={styles.headerTitle}>Scan Confirmation</h1>
      </div>

      <div style={styles.content}>
        {state === "confirming" && (
          <div style={styles.center}>
            <p style={styles.codeLabel}>Verification Code</p>
            <p style={styles.codeValue}>{code || "No code provided"}</p>
            {code && (
              <button style={styles.btn} onClick={() => { verifiedRef.current = true; setState("verifying"); verify(code); }}>
                Verify Now
              </button>
            )}
          </div>
        )}

        {state === "verifying" && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.statusText}>Verifying product...</p>
          </div>
        )}

        {state === "error" && (
          <div style={styles.center}>
            <p style={styles.errorIcon}>!</p>
            <p style={styles.errorTitle}>Verification Failed</p>
            <p style={styles.errorText}>{errorMessage}</p>
            <button style={styles.btn} onClick={() => navigate(ROUTES.SCAN)}>
              Try Again
            </button>
          </div>
        )}

        <Link to={ROUTES.REPORTS} style={styles.reportLink}>
          Report Counterfeit
        </Link>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #F0F0F0",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "26px",
    color: "#292d32",
    cursor: "pointer",
    lineHeight: 1,
    padding: "0",
    textDecoration: "none",
  },
  headerTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#292d32",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "100%",
    maxWidth: "320px",
  },
  codeLabel: {
    fontSize: "14px",
    color: "#888",
    margin: 0,
  },
  codeValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#292d32",
    letterSpacing: "2px",
    margin: 0,
    textAlign: "center",
    wordBreak: "break-all",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#3c7443",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #eee",
    borderTop: "3px solid #3c7443",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  statusText: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  errorIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#D32F2F",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: 700,
    margin: 0,
  },
  errorTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#292d32",
    margin: 0,
  },
  errorText: {
    fontSize: "13px",
    color: "#888",
    textAlign: "center",
    margin: 0,
  },
  reportLink: {
    marginTop: "32px",
    fontSize: "14px",
    color: "#D32F2F",
    textDecoration: "none",
    fontWeight: 600,
    padding: "12px 24px",
    border: "1.5px solid #D32F2F",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

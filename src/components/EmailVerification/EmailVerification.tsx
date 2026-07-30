import { useOtpVerification } from "../../hooks/useOtpVerification";
import styles from "./EmailVerification.module.css";

interface EmailVerificationProps {
  /** The email address the code was sent to */
  email: string;
  /** Called once all 6 digits are entered. Return true if the code is valid. */
  onVerify: (code: string) => Promise<boolean> | boolean;
  /** Called when the person requests a new code */
  onResend: () => Promise<void> | void;
  /** Called after a successful verification (e.g. navigate to next step) */
  onVerified?: () => void;
  /** Optional step indicator, e.g. { current: 2, total: 3 } */
  step?: { current: number; total: number };
  length?: number;
}

export function EmailVerification({
  email,
  onVerify,
  onResend,
  onVerified,
  step,
  length = 6,
}: EmailVerificationProps) {
  const {
    digits,
    status,
    errorMessage,
    canResend,
    isResending,
    formattedTimeLeft,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    resend,
  } = useOtpVerification({
    length,
    onSubmit: async (code) => {
      const ok = await onVerify(code);
      if (ok) onVerified?.();
      return ok;
    },
    onResend,
  });

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className={styles.card}>
      {step && (
        <div className={styles.steps} aria-label={`Step ${step.current} of ${step.total}`}>
          {Array.from({ length: step.total }, (_, i) => i + 1).map((n, i, arr) => (
            <div key={n} className={styles.stepItem}>
              <span
                className={[
                  styles.stepDot,
                  n <= step.current ? styles.stepDotActive : "",
                ].join(" ")}
              >
                {n}
              </span>
              {i < arr.length - 1 && <span className={styles.stepLine} />}
            </div>
          ))}
        </div>
      )}

      <div className={styles.iconWrap} aria-hidden="true">
        <EnvelopeIcon success={isSuccess} />
      </div>

      <h1 className={styles.title}>Verify Your Email</h1>
      <p className={styles.subtitle}>
        We&apos;ve sent a {length}-digit verification code to
        <br />
        <span className={styles.email}>{email}</span>
      </p>

      <div
        className={styles.otpRow}
        role="group"
        aria-label="Verification code"
        aria-invalid={isError}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            pattern="\d*"
            maxLength={1}
            value={digit}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={[
              styles.otpBox,
              isError ? styles.otpBoxError : "",
              isSuccess ? styles.otpBoxSuccess : "",
            ].join(" ")}
            aria-label={`Digit ${i + 1} of ${length}`}
          />
        ))}
      </div>

      <div className={styles.statusRow} aria-live="polite">
        {isSubmitting && (
          <span className={styles.statusText}>
            <Spinner /> Verifying…
          </span>
        )}
        {isError && errorMessage && (
          <span className={`${styles.statusText} ${styles.statusError}`}>{errorMessage}</span>
        )}
        {isSuccess && (
          <span className={`${styles.statusText} ${styles.statusSuccess}`}>
            Email verified ✓
          </span>
        )}
      </div>

      <p className={styles.resendRow}>
        Didn&apos;t receive code?{" "}
        {canResend ? (
          <button type="button" className={styles.resendLink} onClick={resend}>
            Resend
          </button>
        ) : (
          <>
            <span className={styles.resendDisabled}>Resend</span> in{" "}
            <strong>{isResending ? "…" : formattedTimeLeft}</strong>
          </>
        )}
      </p>
    </div>
  );
}

function EnvelopeIcon({ success }: { success: boolean }) {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
      <path
        d="M10 40 L60 10 L110 40 V85 A6 6 0 0 1 104 91 H16 A6 6 0 0 1 10 85 Z"
        fill="#F5F5F5"
        stroke="#D9D9D9"
        strokeWidth="2"
      />
      <path d="M25 42 H95" stroke="#C7C7C7" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 52 H95" stroke="#C7C7C7" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 62 H75" stroke="#C7C7C7" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M10 40 L60 75 L110 40 V85 A6 6 0 0 1 104 91 H16 A6 6 0 0 1 10 85 Z"
        fill="#4CAF6D"
      />
      <path d="M10 40 L60 75 L110 40" stroke="#3C9257" strokeWidth="2" fill="none" />
      <circle cx="97" cy="72" r="17" fill={success ? "#1E7A46" : "#1E7A46"} />
      <path
        d="M89 72 L95 78 L106 65"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function Spinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}
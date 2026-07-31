import { useOtpVerification } from "../../hooks/useOtpVerification";

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
    <div className="mx-auto w-full max-w-[420px] rounded-[16px] bg-white px-7 py-10 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)] max-[480px]:max-w-full max-[480px]:rounded-none max-[480px]:px-5 max-[480px]:py-8 max-[480px]:shadow-none">
      {step && (
        <div className="mb-7 flex items-center justify-center gap-2" aria-label={`Step ${step.current} of ${step.total}`}>
          {Array.from({ length: step.total }, (_, i) => i + 1).map((n, i, arr) => (
            <div key={n} className="flex items-center gap-2">
              <span
                className={[
                  "inline-flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-semibold",
                  n <= step.current ? "bg-[#1e7a46] text-white" : "bg-[#e5e7eb] text-[#6b7280]",
                ].join(" ")}
              >
                {n}
              </span>
              {i < arr.length - 1 && <span className="h-px w-8 bg-[#d1d5db]" />}
            </div>
          ))}
        </div>
      )}

      <div className="mb-5 flex justify-center" aria-hidden="true">
        <EnvelopeIcon success={isSuccess} />
      </div>

      <h1 className="mb-2 text-[22px] font-bold text-[#1a1a1a]">Verify Your Email</h1>
      <p className="mb-7 text-sm leading-[1.5] text-[#6b7280]">
        We&apos;ve sent a {length}-digit verification code to
        <br />
        <span className="font-semibold text-[#1a1a1a]">{email}</span>
      </p>

      <div
        className="mb-3.5 flex justify-center gap-2.5 max-[480px]:gap-2"
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
              "h-[52px] w-12 rounded-[10px] border-[1.5px] border-[#d1d5db] bg-white text-center text-xl font-semibold text-[#1a1a1a] transition-[border-color,box-shadow] duration-150 focus:border-[#1e7a46] focus:shadow-[0_0_0_3px_rgba(30,122,70,0.15)] focus:outline-none disabled:opacity-70 max-[480px]:h-[50px] max-[480px]:w-11 max-[480px]:text-lg",
              isError ? "border-[#e04f4f] bg-[#fef2f2]" : "",
              isSuccess ? "border-[#4caf6d] bg-[#f2fbf5]" : "",
            ].join(" ")}
            aria-label={`Digit ${i + 1} of ${length}`}
          />
        ))}
      </div>

      <div className="mb-2 min-h-5" aria-live="polite">
        {isSubmitting && (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6b7280]">
            <Spinner /> Verifying…
          </span>
        )}
        {isError && errorMessage && (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#e04f4f]">{errorMessage}</span>
        )}
        {isSuccess && (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1e7a46]">
            Email verified ✓
          </span>
        )}
      </div>

      <p className="mt-4 text-[13px] text-[#6b7280]">
        Didn&apos;t receive code?{" "}
        {canResend ? (
          <button type="button" className="cursor-pointer bg-transparent p-0 font-bold text-[#1e7a46] underline hover:text-[#16603a]" onClick={resend}>
            Resend
          </button>
        ) : (
          <>
            <span className="font-bold text-[#9ca3af]">Resend</span> in{" "}
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
  return <span className="h-[13px] w-[13px] animate-spin rounded-full border-2 border-[#d1d5db] border-t-[#6b7280] motion-reduce:animate-none" aria-hidden="true" />;
}

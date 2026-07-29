import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type VerificationStatus = "idle" | "submitting" | "success" | "error";

interface UseOtpVerificationOptions {
  /** How many digits the code has. Defaults to 6 to match the design. */
  length?: number;
  /** Seconds before "Resend" becomes available again. Defaults to 119 (1:59). */
  resendCooldownSeconds?: number;
  /** Called once all boxes are filled. Return/resolve false (or throw) to mark the code as invalid. */
  onSubmit: (code: string) => Promise<boolean> | boolean;
  /** Called when the person taps "Resend". */
  onResend?: () => Promise<void> | void;
}

/**
 * Encapsulates all the state/behavior an OTP input needs:
 * - digit array + refs for each box
 * - auto-advance on type, auto-retreat on backspace
 * - full-code paste support
 * - auto-submit once the last box is filled
 * - resend cooldown countdown
 */
export function useOtpVerification({
  length = 6,
  resendCooldownSeconds = 119,
  onSubmit,
  onResend,
}: UseOtpVerificationOptions) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(resendCooldownSeconds);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const code = useMemo(() => digits.join(""), [digits]);
  const isComplete = code.length === length;
  const canResend = secondsLeft <= 0 && !isResending;

  // Countdown for resend
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Autofocus the first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusBox = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const setDigitAt = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = useCallback(
    (index: number, rawValue: string) => {
      // Only keep the last typed numeral — protects against odd IME/autofill input.
      const value = rawValue.replace(/\D/g, "").slice(-1);

      if (status === "error") {
        setStatus("idle");
        setErrorMessage(null);
      }

      setDigitAt(index, value);

      if (value && index < length - 1) {
        focusBox(index + 1);
      }
    },
    [length, status]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (digits[index]) {
          // Clear current box, stay put
          setDigitAt(index, "");
        } else if (index > 0) {
          // Empty already — hop back and clear that one
          setDigitAt(index - 1, "");
          focusBox(index - 1);
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && index > 0) {
        focusBox(index - 1);
        e.preventDefault();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        focusBox(index + 1);
        e.preventDefault();
      }
    },
    [digits, length]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
      if (!pasted) return;
      e.preventDefault();

      const next = Array(length).fill("");
      for (let i = 0; i < Math.min(pasted.length, length); i++) {
        next[i] = pasted[i];
      }
      setDigits(next);

      const nextFocusIndex = Math.min(pasted.length, length - 1);
      focusBox(nextFocusIndex);
    },
    [length]
  );

  const reset = useCallback(() => {
    setDigits(Array(length).fill(""));
    setStatus("idle");
    setErrorMessage(null);
    focusBox(0);
  }, [length]);

  const submit = useCallback(
    async (codeToSubmit: string) => {
      setStatus("submitting");
      setErrorMessage(null);
      try {
        const ok = await onSubmit(codeToSubmit);
        if (ok) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage("That code doesn't look right. Check it and try again.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Something went wrong verifying your code. Please try again.");
      }
    },
    [onSubmit]
  );

  // Auto-submit the moment the last box is filled
  useEffect(() => {
    if (isComplete && status === "idle") {
      submit(code);
    }
  }, [isComplete, status, code, submit]);

  const resend = useCallback(async () => {
    if (!canResend) return;
    setIsResending(true);
    try {
      await onResend?.();
      setSecondsLeft(resendCooldownSeconds);
      reset();
    } finally {
      setIsResending(false);
    }
  }, [canResend, onResend, resendCooldownSeconds, reset]);

  const formattedTimeLeft = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [secondsLeft]);

  return {
    digits,
    status,
    errorMessage,
    isComplete,
    canResend,
    isResending,
    formattedTimeLeft,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    resend,
    reset,
  };
}
import { useRef, useState } from "react";
import "./VerifyEmail.css";
import emailImage from "../assets/email.png";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Replace this with your API verification later
  const correctOtp = "123456";

  const verifyOtp = (enteredOtp: string) => {
    if (enteredOtp === correctOtp) {
      setIsOtpInvalid(false);
      console.log("OTP Verified");
    } else {
      setIsOtpInvalid(true);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    // Remove error while typing again
    if (isOtpInvalid) {
      setIsOtpInvalid(false);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Verify when all digits are filled
    if (newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="verify-page">
      <img
        src={emailImage}
        alt="Email Verification"
        className="email-image"
      />

      <h2>Verify Your Email</h2>

      <p className="subtitle">
        We've sent a 6-digit verification code to
        <br />
        <strong>info@greenfoodsltd.com</strong>
      </p>

      <div className={`otp-container ${isOtpInvalid ? "error" : ""}`}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {inputRefs.current[index] = el}}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {isOtpInvalid && (
        <p className="otp-error-message">
          Incorrect verification code.
        </p>
      )}

      <p className="resend">
        Didn't receive code?
        <span> Resend in 1:59</span>
      </p>
    </div>
  );
};

export default VerifyEmail;



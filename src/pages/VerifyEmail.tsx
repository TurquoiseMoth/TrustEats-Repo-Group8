import { useRef, useState } from "react";
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#eef6ff] px-5 py-[30px]">
      <img
        src={emailImage}
        alt="Email Verification"
        className="mb-[25px] h-[202px] w-[210px]"
      />

      <h2 className="mb-3 h-6 w-[210px] font-bold text-[#2d2d2d]">Verify Your Email</h2>

      <p className="mb-7 h-12 w-full text-center leading-[1.7] text-[#292D32]">
        We've sent a 6-digit verification code to
        <br />
        <strong className="font-[590] text-[#292D32]">info@greenfoodsltd.com</strong>
      </p>

      <div className={`mb-2.5 flex justify-around gap-3 ${isOtpInvalid ? "error" : ""}`}>
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
            className={`h-[47px] w-10 rounded-[12px] border-2 border-[#86d4aa] bg-white text-center text-[22px] font-semibold outline-none transition-[0.2s] focus:border-[#2e9d63] focus:shadow-[0_0_0_3px_rgba(46,157,99,0.15)] ${isOtpInvalid ? "border border-[#FF0000] text-[#FF0000]" : ""}`}
          />
        ))}
      </div>

      {isOtpInvalid && (
        <p className="mb-5 text-sm text-[#FF0000]">
          Incorrect verification code.
        </p>
      )}

      <p className="text-[15px] text-[#555]">
        Didn't receive code?
        <span className="font-semibold text-[#333]"> Resend in 1:59</span>
      </p>
    </div>
  );
};

export default VerifyEmail;

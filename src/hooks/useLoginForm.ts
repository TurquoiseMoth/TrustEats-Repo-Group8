import { useState } from "react";

interface UseLoginFormOptions {
  onSubmit: (email: string, password: string, rememberMe: boolean) => Promise<boolean> | boolean;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function useLoginForm({ onSubmit }: UseLoginFormOptions) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const ok = await onSubmit(email.trim(), password, rememberMe);
      if (!ok) {
        setFormError("Incorrect email or password. Please try again.");
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    errors,
    formError,
    isSubmitting,
    handleSubmit,
  };
}
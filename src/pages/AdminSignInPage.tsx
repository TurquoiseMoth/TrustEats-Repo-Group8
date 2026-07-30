import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { ROUTES } from "../constants";
import LeafPattern from "../components/auth/LeafPattern";
import { useAuth } from "../contexts/AuthContext";

export default function AdminSignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setFormError("Please enter your email and password.");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setFormError((err as { message?: string })?.message ?? "Sign in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LeafPattern />

      <div className="flex-1 flex items-start justify-center px-5 md:px-6 pb-10">
        <div className="w-full max-w-[420px] md:max-w-[700px] md:bg-white md:border md:border-green-100 md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-none md:rounded-2xl p-0 md:p-12 mt-6 md:mt-20 lg:mt-28">
          <div className="px-1 md:px-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Sign In</h1>
            <p className="text-sm md:text-base font-bold text-gray-900 mb-0.5">Welcome!</p>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Sign in to continue to your account</p>

            {formError && (
              <div
                role="alert"
                className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 text-red-700 text-sm font-medium"
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4 md:mb-5">
                <label htmlFor="admin-email" className="block text-sm md:text-base font-bold text-gray-900 mb-1.5 md:mb-2">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="Input details"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 md:py-3.5 rounded-lg border border-gray-300 text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                />
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="admin-password" className="block text-sm md:text-base font-bold text-gray-900 mb-1.5 md:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 md:py-3.5 pr-11 rounded-lg border border-gray-300 text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5 md:mb-6">
                <label className="flex items-center gap-2 text-sm md:text-base text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Remember me
                </label>
                <a href="#" className="text-sm md:text-base font-medium text-red-600 hover:underline">
                  Forget Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-lg bg-primary text-white text-base md:text-lg font-semibold hover:bg-primary/85 disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mb-3"
              >
                {isSubmitting && (
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white/50 border-t-white animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isSubmitting ? "Signing in…" : "Log In"}
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.REGISTER)}
                disabled={isSubmitting}
                className="w-full py-3.5 md:py-4 rounded-lg border-[1.5px] border-primary text-primary text-base md:text-lg font-semibold hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

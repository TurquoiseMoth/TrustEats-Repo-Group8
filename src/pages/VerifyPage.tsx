import { Check, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui";
import { Spinner } from "../components/ui";
import { verificationService } from "../services/verification";
import { ROUTES } from "../constants";
import type { VerificationResult } from "../types";

export default function VerifyPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const passedResult = location.state?.result as VerificationResult | undefined;

  const { data: result, isLoading, error } = useQuery<VerificationResult>({
    queryKey: ["verification", code],
    queryFn: () => verificationService.verifyCode(code!),
    enabled: !passedResult && !!code,
    staleTime: 5 * 60 * 1000,
  });

  const verification = passedResult ?? result;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 font-sans">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-500 text-sm">Loading product details...</p>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 font-sans">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 border border-red-200">
          <span className="text-red-500 text-3xl font-bold">!</span>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-800">Could not load product</p>
        <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
          The product could not be verified. Please check the code and try again.
        </p>
        <button
          onClick={() => navigate(ROUTES.SCAN)}
          className="mt-6 px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Return to Scan
        </button>
      </div>
    );
  }

  if (verification.status !== "genuine") {
    navigate(ROUTES.RESULT.replace(":code", code ?? ""), { state: { result: verification }, replace: true });
    return null;
  }

  const product = verification.product;
  const manufacturer = verification.manufacturer;
  const batch = verification.batch;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12 font-sans">
      <div className="relative mt-8 mb-6 flex flex-col items-center">
        <div className="relative flex h-25 w-25 items-center justify-center rounded-full bg-green-100 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border border-green-200">
          <div className="flex h-17.5 w-17.5 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <Check size={36} strokeWidth={3} />
          </div>
          <div className="absolute -top-2.5 -left-5 h-3 w-3 rotate-45 bg-blue-400"></div>
          <div className="absolute top-2.5 -right-7.5 h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="absolute -bottom-2.5 -left-2.5 h-3 w-3 rounded-full bg-pink-400"></div>
          <div className="absolute bottom-5 -right-5 h-3 w-3 rotate-12 bg-purple-400"></div>
          <div className="absolute -top-7.5 right-2.5 h-2 w-2 rounded-full bg-red-400"></div>
          <div className="absolute -bottom-5 left-7.5 h-2 w-2 rotate-45 bg-orange-400"></div>
          <div className="absolute top-10 -left-10 h-2 w-2 rounded-full bg-green-400"></div>
          <div className="absolute top-12.5 -right-10 h-2.5 w-2.5 rotate-[-20deg] bg-cyan-400"></div>
        </div>

        <div className="mt-8 flex items-center gap-1.5 rounded-full border border-green-200 bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <Check size={16} strokeWidth={2.5} /> Product is Verified
        </div>

        <p className="mt-4 max-w-xs text-center text-[15px] leading-relaxed text-gray-500">
          This product has undergone all verification and is duly verified by{" "}
          <span className="font-bold text-gray-700">NAFDAC</span>
        </p>
      </div>

      <div className="w-full max-w-95 rounded-[1.25rem] border-[1.5px] border-primary/40 bg-background p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] mb-10">
        <h3 className="mb-6 text-[17px] font-bold text-gray-900 tracking-wide">Product Details</h3>

        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-300 pb-4">
            <span className="text-[15px] text-gray-600">Product Name</span>
            <span className="text-[15px] font-medium text-gray-800 text-right leading-tight">
              {product?.name ?? "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-300 pb-4 pt-1">
            <span className="text-[15px] text-gray-600">Brand</span>
            <span className="text-[15px] font-medium text-gray-800">
              {product?.brand ?? code}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-300 pb-4 pt-1">
            <span className="text-[15px] text-gray-600">Batch Number</span>
            <span className="text-[15px] font-medium text-gray-800">
              {batch?.batchNumber ?? "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-300 pb-4 pt-1">
            <span className="text-[15px] text-gray-600">Expiry Date</span>
            <span className="text-[15px] font-medium text-gray-800">
              {batch?.expiryDate ? new Date(batch.expiryDate).toLocaleDateString() : "N/A"}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-[15px] text-gray-600">Company/Brand</span>
            <span className="text-[15px] font-medium text-gray-800">
              {manufacturer?.companyName ?? "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-95 flex gap-3 mb-10">
        <Button
          className="flex-1 rounded-full bg-primary py-6 text-[15px] font-semibold text-white hover:bg-primary/90 transition-colors shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          onClick={() => navigate(ROUTES.SCAN)}
        >
          Return to Scan
        </Button>
        <Button className="flex-1 rounded-full border-2 border-primary bg-transparent py-6 text-[15px] font-semibold text-primary hover:bg-green-50 transition-colors">
          Report
        </Button>
      </div>

      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline underline-offset-4 mt-2"
      >
        <ArrowLeft size={18} strokeWidth={2.5} /> Return to Dashboard
      </Link>
    </div>
  );
}

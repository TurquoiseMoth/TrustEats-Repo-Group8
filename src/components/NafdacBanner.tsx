import { Shield } from "lucide-react";

export function NafdacBanner() {
  return (
    <section className="mt-12 rounded-lg bg-green-50 p-6 sm:flex-row sm:justify-between sm:items-center md:px-12 md:py-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center justify-center rounded-full bg-[#14833B] p-3">
          <Shield className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-[20px] font-bold text-[#2F3437] md:text-[24px]">
            Aligned with <span className="text-[#14833B]">NAFDAC</span> Standards
          </h3>
          <p className="mt-2 text-[15px] font-medium leading-relaxed text-[#6B7280]">
            TrustEats works in compliance with NAFDAC guidelines to ensure food safety,
            product authenticity, and consumer protection across Nigeria.
          </p>
        </div>
      </div>
      <div className="mt-4 flex shrink-0 items-center gap-3 sm:mt-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
          <span className="text-[13px] font-bold text-[#14833B]">NAFDAC</span>
        </div>
      </div>
    </section>
  );
}

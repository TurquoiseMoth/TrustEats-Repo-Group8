import { ShieldCheck } from "lucide-react";

export function NafdacBanner() {
  return (
    <section className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center gap-3 rounded-[22px] bg-primary/5 px-6 py-5 md:mt-24 md:flex-row md:py-4 lg:px-10">
      {/* Left: icon + text (70-75%) */}
      <div className="flex w-full items-center gap-3 md:w-3/4 md:gap-2">
        <div className="flex shrink-0 items-center justify-center">
          <ShieldCheck size={36} className="text-primary" strokeWidth={1.8} />
        </div>
        <p className="text-[16px] font-medium leading-snug text-text-main md:text-[17px]">
          Building a safer food ecosystem in alignment with{" "}
          <strong>NAFDAC</strong> standards.
        </p>
      </div>

      {/* Right: NAFDAC logo (25-30%) */}
      <div className="flex shrink-0 items-center justify-end md:w-1/4">
        <img
          src="/assets/nafdac-aligned.png"
          alt="NAFDAC"
          className="h-auto w-36 object-contain md:w-44"
        />
      </div>
    </section>
  );
}

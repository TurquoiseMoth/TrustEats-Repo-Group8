import { ShieldCheck } from "lucide-react";

export function NafdacBanner() {
  return (
    <section className="mx-auto mt-11 flex w-[calc(100%-2rem)] max-w-7xl flex-col items-start gap-7 rounded-[12px] bg-primary/10 px-5 py-10 md:mt-8 md:w-[calc(100%-3rem)] md:flex-row md:items-center md:justify-between md:gap-5 md:px-5 md:py-5 lg:w-[calc(100%-5rem)] lg:px-5">
      <div className="flex w-full items-start gap-3 md:w-auto md:flex-1 md:items-center">
        <div className="flex shrink-0 items-center justify-center">
          <ShieldCheck size={26} className="text-primary" strokeWidth={1.8} />
        </div>
        <p className="max-w-[36rem] text-[17px] font-medium leading-relaxed text-text-main md:max-w-none md:text-[16px] md:leading-snug">
          Building a safer food ecosystem in alignment with{" "}
          <strong>NAFDAC</strong> standards.
        </p>
      </div>

      <div className="flex shrink-0 items-center justify-start md:justify-end">
        <img
          src="/assets/nafdac-aligned.png"
          alt="NAFDAC"
          className="h-auto w-40 object-contain md:w-44"
        />
      </div>
    </section>
  );
}

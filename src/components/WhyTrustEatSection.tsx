import { ShieldCheck, UserCheck, BarChart3, BadgeCheck } from "lucide-react";
import { FeatureCard } from "./ui";

const features = [
  {
    icon: ShieldCheck,
    title: "Instant Verification",
    description: "Verify any product in seconds with a simple QR code scan.",
  },
  {
    icon: UserCheck,
    title: "Consumer Protection",
    description: "Helps you avoid fake or unsafe products and make confident choices.",
  },
  {
    icon: BarChart3,
    title: "For Manufacturers",
    description: "Build trust, reduce counterfeiting and grow your brand.",
  },
  {
    icon: BadgeCheck,
    title: "NAFDAC Aligned",
    description: "Built in alignment with NAFDAC guidelines for food safety and quality.",
  },
] as const;

export function WhyTrustEatSection() {
  return (
    <section className="mt-16 flex flex-col items-center md:mt-24">
      <h2 className="text-[28px] font-bold leading-tight text-[#2F3437]">
        Why <span className="text-brand-base">TrustEat</span>
      </h2>

      <div className="mt-10 grid w-full max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

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
    <section className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center px-6 md:mt-24 lg:px-10">
      <h2 className="text-[28px] font-bold leading-tight text-text-main">
        Why <span className="text-brand-base">TrustEats</span>
      </h2>

      <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

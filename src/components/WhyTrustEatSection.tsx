import { ShieldCheck, UserCheck, BarChart3, BadgeCheck } from "lucide-react";
import { FeatureCard } from "./ui";

const features = [
  {
    icon: ShieldCheck,
    title: "Instant Verification",
    description: "Verify any product in seconds with a simple QR code scan.",
    orderClassName: "order-1",
  },
  {
    icon: UserCheck,
    title: "Consumer Protection",
    description: "Helps you avoid fake or unsafe products and make confident choices.",
    orderClassName: "order-2 lg:order-3",
  },
  {
    icon: BarChart3,
    title: "For Manufacturer",
    description: "Build trust, reduce counterfeiting and grow your brand.",
    orderClassName: "order-3 lg:order-2",
  },
  {
    icon: BadgeCheck,
    title: "NAFDAC Aligned",
    description: "Built in alignment with NAFDAC guidelines for food safety and quality.",
    orderClassName: "order-4",
  },
] as const;

export function WhyTrustEatSection() {
  return (
    <section className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-start px-4 md:mt-16 md:px-6 lg:px-10">
      <h2 className="text-[28px] font-bold leading-tight text-text-main md:text-[30px]">
        Why TrustEat
      </h2>

      <div className="mt-5 grid w-full grid-cols-2 gap-4 md:mt-6 md:gap-5 lg:grid-cols-4 lg:gap-4">
        {features.map((feature) => (
          <div key={feature.title} className={feature.orderClassName}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="h-full min-h-[229px] rounded-[12px] px-5 py-7 shadow-none md:min-h-[196px] md:px-7 md:py-8 lg:min-h-[196px]"
              iconWrapClassName="mb-6 h-12 w-12 rounded-[14px] bg-primary md:mb-5 md:h-11 md:w-11 lg:h-10 lg:w-10"
              iconClassName="h-7 w-7 md:h-6 md:w-6"
              titleClassName="mb-4 text-[18px] leading-tight md:text-[17px] lg:mb-3 lg:text-[16px]"
              descriptionClassName="text-[17px] leading-[1.65] text-text-main md:text-[16px] lg:text-[15px] lg:leading-relaxed"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

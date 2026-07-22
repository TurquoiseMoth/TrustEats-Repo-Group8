import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center rounded-[20px] border-0 bg-white px-8 pt-10 pb-8 text-center shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FDF4]">
        <Icon className="h-7 w-7 text-[#14833B]" />
      </div>
      <h3 className="mb-2 text-[18px] font-bold text-[#14833B]">{title}</h3>
      <p className="text-[14px] font-medium leading-relaxed text-[#6B7280]">
        {description}
      </p>
    </Card>
  );
}

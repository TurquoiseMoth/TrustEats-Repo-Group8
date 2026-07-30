import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center rounded-[20px] border-0 bg-white px-8 pt-10 pb-8 text-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3c7443]">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="mb-2 text-[18px] font-bold text-[#3c7443]">{title}</h3>
      <p className="text-[14px] font-medium leading-relaxed text-[#6B7280]">
        {description}
      </p>
    </Card>
  );
}

import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
  backgroundColor: string;
  buttonBgColor: string;
  buttonText: string;
  loginPrefix: string;
  loginText: string;
}

export function RoleCard({
  icon: Icon,
  title,
  description,
  accentColor,
  backgroundColor,
  buttonBgColor,
  buttonText,
  loginPrefix,
  loginText,
}: RoleCardProps) {
  return (
    <Card
      className={`relative flex flex-col items-center rounded-[28px] border-0 px-10 pt-14 pb-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${backgroundColor}`}
    >
      <div
        className={`absolute -top-6 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[4px] border-white ${buttonBgColor}`}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>

      <h3 className={`mb-3 text-[22px] font-bold ${accentColor}`}>{title}</h3>

      <p className="mb-8 max-w-[260px] text-[14px] font-medium leading-relaxed text-[#9CA3AF]">
        {description}
      </p>

      <button
        className={`mb-6 w-full cursor-pointer rounded-2xl py-2.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 ${buttonBgColor}`}
      >
        {buttonText}
      </button>

      <p className="text-[13px] text-[#9CA3AF]">
        {loginPrefix}{" "}
        <span className={`cursor-pointer font-semibold ${accentColor}`}>
          {loginText}
        </span>
      </p>
    </Card>
  );
}

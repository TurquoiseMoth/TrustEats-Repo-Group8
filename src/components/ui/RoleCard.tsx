import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Card } from "./Card";

interface RoleCardProps {
  icon?: LucideIcon;
  customIcon?: ReactNode;
  title: string;
  description: string;
  accentColor: string;
  backgroundColor: string;
  buttonBgColor: string;
  buttonText: string;
  loginPrefix: string;
  loginText: string;
  loginHref?: string;
  buttonHref?: string;
}

export function RoleCard({
  icon: Icon,
  customIcon,
  title,
  description,
  accentColor,
  backgroundColor,
  buttonBgColor,
  buttonText,
  loginPrefix,
  loginText,
  loginHref,
  buttonHref,
}: RoleCardProps) {
  return (
    <Card
      className={`relative flex flex-col items-center rounded-[28px] border-0 px-10 pt-14 pb-8 text-center ${backgroundColor}`}
    >
      <div
        className={`absolute -top-6 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[4px] border-white ${buttonBgColor}`}
      >
        {customIcon ? (
          <div className="flex h-7 w-7 items-center justify-center">{customIcon}</div>
        ) : Icon ? (
          <Icon className="h-7 w-7 text-white" />
        ) : null}
      </div>

      <h3 className={`mb-3 text-[22px] font-bold ${accentColor}`}>{title}</h3>

      <p className="mb-8 max-w-[260px] text-[14px] font-medium leading-relaxed text-text-main">
        {description}
      </p>

      {buttonHref ? (
        <Link
          to={buttonHref}
          className={`mb-6 flex w-full items-center justify-center rounded-2xl py-2.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 no-underline ${buttonBgColor}`}
        >
          {buttonText}
        </Link>
      ) : (
        <button
          className={`mb-6 w-full cursor-pointer rounded-2xl py-2.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 ${buttonBgColor}`}
        >
          {buttonText}
        </button>
      )}

      <p className="text-[13px] text-text-main">
        {loginPrefix}{" "}
        {loginHref ? (
          <Link to={loginHref} className={`cursor-pointer font-semibold ${accentColor}`}>
            {loginText}
          </Link>
        ) : (
          <span className={`cursor-pointer font-semibold ${accentColor}`}>
            {loginText}
          </span>
        )}
      </p>
    </Card>
  );
}

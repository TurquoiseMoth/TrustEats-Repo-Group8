import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconWrapClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  iconWrapClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: FeatureCardProps) {
  return (
    <Card
      className={twMerge(
        clsx(
          "flex flex-col items-center rounded-[20px] border-0 bg-card px-8 pt-10 pb-8 text-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]",
          className,
        ),
      )}
    >
      <div
        className={twMerge(
          clsx("mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary", iconWrapClassName),
        )}
      >
        <Icon className={twMerge(clsx("h-7 w-7 text-white", iconClassName))} />
      </div>
      <h3 className={twMerge(clsx("mb-2 text-[18px] font-bold text-primary", titleClassName))}>
        {title}
      </h3>
      <p
        className={twMerge(
          clsx("text-[14px] font-medium leading-relaxed text-gray-500", descriptionClassName),
        )}
      >
        {description}
      </p>
    </Card>
  );
}

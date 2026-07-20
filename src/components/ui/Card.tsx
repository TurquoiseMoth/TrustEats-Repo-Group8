import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx("rounded-xl border border-gray-200 bg-white p-4 shadow-sm", className),
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={twMerge(clsx("mb-3", className))}>{children}</div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={twMerge(clsx("", className))}>{children}</div>;
}

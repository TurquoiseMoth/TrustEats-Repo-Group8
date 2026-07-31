import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
          sizeStyles[size],
          className,
        ),
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

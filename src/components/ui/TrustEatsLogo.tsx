import { twMerge } from "tailwind-merge";

interface TrustEatsLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  iconColor?: string;
  textColor?: string;
}

export function TrustEatsLogo({
  size = 24,
  showText = true,
  className,
  iconColor = "#3F7A46",
  textColor = "#292d32",
}: TrustEatsLogoProps) {
  const height = Math.round(size * (28 / 24));
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <svg width={size} height={height} viewBox="0 0 24 28" fill="none">
        <path
          d="M12 2L2 7V13C2 19.63 6.35 25.78 12 27C17.65 25.78 22 19.63 22 13V7L12 2Z"
          fill={iconColor}
        />
        <path
          d="M9 14L11 16L15 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
          TrustEats
        </span>
      )}
    </div>
  );
}

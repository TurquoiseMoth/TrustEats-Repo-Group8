import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface BackButtonProps {
  /** Extra classes for the button (Tailwind). */
  className?: string;
  /** Inline styles (used by inline-styled pages). */
  style?: React.CSSProperties;
  /** Optional label text next to the arrow. Defaults to none. */
  label?: string;
  /** Optional route to navigate to. Defaults to browser history back. */
  to?: string;
}

export function BackButton({ className = "", style, label, to }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={[
        "inline-flex items-center gap-1 rounded-lg bg-transparent font-semibold text-[#292d32] transition-colors hover:text-[#3c7443]",
        className,
      ].join(" ")}
      style={style}
    >
      <ChevronLeft size={20} aria-hidden="true" />
      {label}
    </button>
  );
}

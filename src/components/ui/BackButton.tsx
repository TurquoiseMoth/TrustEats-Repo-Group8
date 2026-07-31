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
      aria-label={label ? `Go back to ${label}` : "Go back"}
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={[
        "group inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        label ? "h-9 px-4 text-sm font-semibold" : "h-9 w-9",
        className,
      ].join(" ")}
      style={style}
    >
      <ChevronLeft size={20} strokeWidth={2.5} aria-hidden="true" />
      {label && <span>{label}</span>}
    </button>
  );
}

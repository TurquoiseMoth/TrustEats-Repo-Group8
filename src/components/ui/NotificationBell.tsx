import { Bell } from "lucide-react";

interface NotificationBellProps {
  /** Number of unread notifications. Badge is hidden when 0/undefined. */
  count?: number;
  /** Extra classes for the wrapper (e.g. absolute positioning). */
  className?: string;
  /** Extra classes for the bell icon. */
  iconClassName?: string;
  /** Accessible label for the bell button. */
  ariaLabel?: string;
}

export function NotificationBell({
  count = 0,
  className = "",
  iconClassName = "h-5 w-5",
  ariaLabel = "Notifications",
}: NotificationBellProps) {
  return (
    <span
      role="img"
      aria-label={count > 0 ? `${ariaLabel} (${count} unread)` : ariaLabel}
      className={["relative inline-flex", className].filter(Boolean).join(" ")}
    >
      <Bell className={iconClassName} aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </span>
  );
}

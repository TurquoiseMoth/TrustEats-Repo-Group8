import { User } from "lucide-react";
import type { User as AuthUser } from "../../types";

interface SidebarUserSummaryProps {
  user: AuthUser | null;
  fallbackLabel: string;
}

export function SidebarUserSummary({ user, fallbackLabel }: SidebarUserSummaryProps) {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  const label = fullName || fallbackLabel;
  const email = user?.email;

  return (
    <div className="mb-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{label}</p>
          {email && <p className="truncate text-xs text-gray-500">{email}</p>}
        </div>
      </div>
    </div>
  );
}

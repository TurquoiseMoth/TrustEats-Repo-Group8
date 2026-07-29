import type { ApplicationStatus } from "../../types/application.types";

const STYLES: Record<ApplicationStatus, { bg: string; text: string; label: string }> = {
  submitted: { bg: "bg-blue-100", text: "text-blue-700", label: "Submitted" },
  approved: { bg: "bg-green-100", text: "text-green-700", label: "Approved" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, text, label } = STYLES[status];
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {label}
    </span>
  );
}

export default StatusBadge;
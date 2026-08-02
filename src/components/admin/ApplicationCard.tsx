import { FileText, Calendar, Clock, CheckCircle2, Trash2 } from "lucide-react";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface Application {
  id: string;
  companyName: string;
  appId: string;
  status: ApplicationStatus;
  date: string;
  time: string;
  isNew?: boolean;
}

interface ApplicationCardProps {
  application: Application;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRevoke: (id: string) => void;
  onDelete: (id: string) => void;
  onReviewDetails: (id: string) => void;
}

const statusLabel: Record<ApplicationStatus, string> = {
  pending: "Awaiting approval",
  approved: "Application approved",
  rejected: "Application rejected",
};

export default function ApplicationCard({
  application,
  onApprove,
  onReject,
  onRevoke,
  onDelete,
  onReviewDetails,
}: ApplicationCardProps) {
  const { id, companyName, appId, status, date, time, isNew } = application;

  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {companyName}
              <span className="ml-1 font-normal text-slate-400">· {appId}</span>
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{statusLabel[status]}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {time}
              </span>
            </div>
          </div>
        </div>

        {isNew ? (
          <button
            onClick={() => onDelete(id)}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        ) : (
          <button
            onClick={() => onReviewDetails(id)}
            className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Review Details
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {isNew && (
          <button
            onClick={() => onReviewDetails(id)}
            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Review
          </button>
        )}

        {!isNew && status === "pending" && (
          <>
            <button
              onClick={() => onApprove(id)}
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(id)}
              className="flex-1 rounded-lg border border-red-300 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Reject
            </button>
          </>
        )}

        {!isNew && status === "approved" && (
          <>
            <button
              disabled
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-2.5 text-sm font-semibold text-primary"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approved
            </button>
            <button
              onClick={() => onRevoke(id)}
              className="flex-1 rounded-lg border border-red-300 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Revoke
            </button>
          </>
        )}

        {!isNew && status === "rejected" && (
          <button
            onClick={() => onApprove(id)}
            className="flex-1 rounded-lg border border-primary/60 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
          >
            Re-approve
          </button>
        )}
      </div>
    </div>
  );
}

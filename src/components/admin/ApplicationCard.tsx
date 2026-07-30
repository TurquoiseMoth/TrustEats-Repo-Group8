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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <FileText className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {companyName}
              <span className="ml-1 font-normal text-slate-400">· {appId}</span>
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{statusLabel[status]}</p>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
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
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Review Details
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-3">
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
              className="flex-1 rounded-lg bg-emerald-800 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
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
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-100 py-2.5 text-sm font-semibold text-emerald-800"
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
            className="flex-1 rounded-lg border border-emerald-300 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            Re-approve
          </button>
        )}
      </div>
    </div>
  );
}
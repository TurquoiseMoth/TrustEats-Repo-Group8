import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ZoomIn, X } from "lucide-react";
import certificateImg from "../assets/images/certificate.png";

interface ApplicationDetail {
  companyName: string;
  napamsEmail: string;
  cacNumber: string;
  nafdacNumber: string;
  certificateImage: string;
}

// TODO: replace with real fetch by :id from your API/service layer
const mockDetail: ApplicationDetail = {
  companyName: "GreenField Foods LTD",
  napamsEmail: "info@GreenFoodsLTD.com",
  cacNumber: "RC 1234567",
  nafdacNumber: "02-123456",
  certificateImage: certificateImg,
};

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {label}
      </p>
      <p className="mt-1.5 text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default function AdminApplicationDetailPage() {
  
  const navigate = useNavigate();
  const [zoomed, setZoomed] = useState(false);
  const [submitting, setSubmitting] = useState<"approve" | "reject" | null>(null);

  const detail = mockDetail; // TODO: fetch by id

  const handleApprove = async () => {
    setSubmitting("approve");
    // TODO: call API to approve application `id`
    setTimeout(() => {
      setSubmitting(null);
      navigate(-1);
    }, 600);
  };

  const handleReject = async () => {
    setSubmitting("reject");
    // TODO: call API to reject application `id`
    setTimeout(() => {
      setSubmitting(null);
      navigate(-1);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center gap-3 bg-emerald-700 px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
          aria-label="Back to applications"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-white">Admin Application Detail</h1>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          <InfoField label="Company Name" value={detail.companyName} />
          <InfoField label="NAPAMS Registered Email" value={detail.napamsEmail} />
          <InfoField label="CAC Number" value={detail.cacNumber} />
          <InfoField
            label="NAFDAC Certificate of Recognition (C of R)"
            value={detail.nafdacNumber}
          />
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              NAFDAC Certificate
            </p>
            <button
              onClick={() => setZoomed(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              <ZoomIn className="h-3.5 w-3.5" />
              View full size
            </button>
          </div>
          <button
            onClick={() => setZoomed(true)}
            className="mt-4 block w-full overflow-hidden rounded-lg border border-slate-200"
          >
            <img
              src={detail.certificateImage}
              alt={`NAFDAC certificate for ${detail.companyName}`}
              className="mx-auto max-h-[420px] w-full object-contain bg-white"
            />
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleApprove}
            disabled={submitting !== null}
            className="flex-1 rounded-lg bg-emerald-800 py-3 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
          >
            {submitting === "approve" ? "Approving…" : "Approve"}
          </button>
          <button
            onClick={handleReject}
            disabled={submitting !== null}
            className="flex-1 rounded-lg border border-red-300 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            {submitting === "reject" ? "Rejecting…" : "Reject"}
          </button>
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setZoomed(false)}
        >
          <button
            onClick={() => setZoomed(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={detail.certificateImage}
            alt={`NAFDAC certificate for ${detail.companyName}, enlarged`}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
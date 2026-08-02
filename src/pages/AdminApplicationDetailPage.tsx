import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, ZoomIn, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import certificateImg from "../assets/images/certificate.png";
import { adminService } from "../services/admin";

function notify(type: "success" | "error", message: string) {
  window.dispatchEvent(
    new CustomEvent("trusteats:notify", { detail: { type, message } }),
  );
}

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
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [zoomed, setZoomed] = useState(false);

  const { data: detail, isLoading, error } = useQuery({
    queryKey: ["admin-manufacturer", id],
    queryFn: () => adminService.getManufacturerById(id!),
    enabled: !!id,
  });

  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin-manufacturers"] }),
      queryClient.invalidateQueries({ queryKey: ["admin-manufacturer", id] }),
    ]);
  };

  const approveMutation = useMutation({
    mutationFn: () => adminService.approveManufacturer(id!),
    onSuccess: async () => {
      await invalidate();
      notify("success", "Manufacturer approved successfully.");
      navigate(-1);
    },
    onError: () => notify("error", "Unable to approve manufacturer."),
  });

  const rejectMutation = useMutation({
    mutationFn: () =>
      adminService.suspendManufacturer(id!, "Rejected by admin"),
    onSuccess: async () => {
      await invalidate();
      notify("success", "Manufacturer rejected successfully.");
      navigate(-1);
    },
    onError: () => notify("error", "Unable to reject manufacturer."),
  });

  const isSubmitting = approveMutation.isPending || rejectMutation.isPending;
  const certificateImage = detail?.certificateOfRecognitionUrl || certificateImg;

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
        {isLoading && (
          <p className="rounded-xl bg-white p-6 text-sm text-slate-500">
            Loading application details...
          </p>
        )}

        {error && (
          <p className="rounded-xl bg-white p-6 text-sm text-red-600">
            Unable to load application details.
          </p>
        )}

        {detail && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoField label="Company Name" value={detail.companyName} />
              <InfoField
                label="NAPAMS Registered Email"
                value={detail.napamsEmail ?? "N/A"}
              />
              <InfoField label="CAC Number" value={detail.cacNumber ?? "N/A"} />
              <InfoField
                label="NAFDAC Certificate of Recognition (C of R)"
                value={detail.nafdacCofRNumber ?? detail.nafdacNumber ?? "N/A"}
              />
              <InfoField label="Contact Email" value={detail.contactEmail ?? "N/A"} />
              <InfoField label="Contact Phone" value={detail.contactPhone ?? "N/A"} />
              <InfoField label="Address" value={detail.address ?? "N/A"} />
              <InfoField label="Status" value={detail.status} />
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
                  src={certificateImage}
                  alt={`NAFDAC certificate for ${detail.companyName}`}
                  className="mx-auto max-h-[420px] w-full bg-white object-contain"
                />
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => approveMutation.mutate()}
                disabled={isSubmitting || detail.status === "approved"}
                className="flex-1 rounded-lg bg-emerald-800 py-3 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
              >
                {approveMutation.isPending
                  ? "Approving..."
                  : detail.status === "approved"
                    ? "Approved"
                    : "Approve"}
              </button>
              <button
                onClick={() => rejectMutation.mutate()}
                disabled={isSubmitting || detail.status === "suspended"}
                className="flex-1 rounded-lg border border-red-300 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                {rejectMutation.isPending
                  ? "Rejecting..."
                  : detail.status === "suspended"
                    ? "Rejected"
                    : "Reject"}
              </button>
            </div>
          </>
        )}
      </div>

      {zoomed && detail && (
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
            src={certificateImage}
            alt={`NAFDAC certificate for ${detail.companyName}, enlarged`}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

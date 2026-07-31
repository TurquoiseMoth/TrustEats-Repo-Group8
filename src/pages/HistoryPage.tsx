import { useState } from "react";
import { ChevronRight, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verification";
import type { ScanEvent } from "../types";
import { Spinner, BackButton } from "../components/ui";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    + ', ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function statusBadge(event: ScanEvent) {
  if (event.status === "genuine") {
    return (
      <div className="flex items-center w-fit gap-1 rounded-full border border-[#bbf7d0] bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary">
        <CheckCircle2 size={12} strokeWidth={2.5} /> Verified
      </div>
    );
  }
  if (event.status === "suspicious") {
    return (
      <div className="flex items-center w-fit gap-1 rounded-full border border-orange-200 bg-[#fff7ed] px-2 py-0.5 text-[11px] font-semibold text-[#f97316]">
        <AlertTriangle size={12} strokeWidth={2.5} /> Suspicious
      </div>
    );
  }
  return (
    <div className="flex items-center w-fit gap-1 rounded-full border border-red-200 bg-[#fef2f2] px-2 py-0.5 text-[11px] font-semibold text-danger">
      <XCircle size={12} strokeWidth={2.5} /> Fake
    </div>
  );
}

export default function HistoryPage() {
  const [selectedEvent, setSelectedEvent] = useState<ScanEvent | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["scanHistory"],
    queryFn: () => verificationService.getHistory(),
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <p className="text-gray-500 text-sm">Failed to load history.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm">
          Retry
        </button>
      </div>
    );
  }

  const events = data.events ?? [];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans pb-24 relative">
      <div className="flex items-center px-4 py-6">
        <BackButton className="mr-4" />
        <h1 className="text-[22px] font-bold text-text-main">History (Consumer)</h1>
      </div>

      {events.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
          <p>No scan history yet.</p>
        </div>
      ) : (
        <div className="flex-1 px-4 space-y-3 max-w-md mx-auto w-full">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex items-center justify-between rounded-xl bg-white p-3.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-shadow"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex flex-col justify-center gap-1.5">
                <h3 className="text-[16px] font-bold text-text-main leading-tight">
                  {event.productName ?? event.code}
                </h3>
                {statusBadge(event)}
                <span className="text-[13px] font-medium text-gray-500 mt-0.5">
                  {formatDate(event.scannedAt)}
                </span>
              </div>
              <div className="text-gray-400">
                <ChevronRight size={20} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl pt-5 pb-8 px-5">
            <div className="flex justify-end mb-4">
              <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={24} className="text-gray-700" strokeWidth={2} />
              </button>
            </div>

            <div className="rounded-2xl border-[1.5px] border-gray-200 bg-gray-50 p-5 mb-5 flex flex-col items-center gap-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
              {statusBadge(selectedEvent)}
              <p className="text-[13px] text-gray-500 text-center">{selectedEvent.message}</p>
              <p className="text-[11px] text-gray-400">{formatDate(selectedEvent.scannedAt)}</p>
            </div>

            <div className="rounded-[1.25rem] border-[1.5px] border-primary/40 bg-background p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
              <h3 className="mb-5 text-[17px] font-bold text-gray-900 tracking-wide">Scan Details</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between border-b border-gray-300 pb-3.5">
                  <span className="text-[14px] text-gray-600">Product</span>
                  <span className="text-[14px] font-medium text-gray-800 text-right max-w-[150px]">
                    {selectedEvent.productName ?? "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-3.5">
                  <span className="text-[14px] text-gray-600">Brand</span>
                  <span className="text-[14px] font-medium text-gray-800">
                    {selectedEvent.brand ?? "N/A"}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[14px] text-gray-600">Code</span>
                  <span className="text-[14px] font-medium text-gray-800">
                    {selectedEvent.code}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

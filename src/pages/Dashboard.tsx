import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Scan,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../constants";
import { verificationService } from "../services/verification";
import phone from "../assets/phone.png";
import pepper from "../assets/pepper.png";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getStatusMeta(status: "genuine" | "suspicious" | "fake") {
  if (status === "genuine") {
    return {
      label: "Verified",
      icon: CheckCircle2,
      className: "border-[#d1fae5] bg-[#ecfdf5] text-[#008236]",
    };
  }
  if (status === "suspicious") {
    return {
      label: "Suspicious",
      icon: AlertTriangle,
      className: "border-orange-200 bg-[#fff7ed] text-[#f97316]",
    };
  }
  return {
    label: "Fake",
    icon: XCircle,
    className: "border-red-200 bg-[#fef2f2] text-[#ef4444]",
  };
}

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["scanHistory", "dashboard"],
    queryFn: () => verificationService.getHistory({ page: 1, limit: 30 }),
    staleTime: 30_000,
  });

  const events = data?.events ?? [];
  const now = new Date();
  const monthlyEvents = events.filter((event) => {
    const scannedAt = new Date(event.scannedAt);
    return (
      !Number.isNaN(scannedAt.getTime()) &&
      scannedAt.getMonth() === now.getMonth() &&
      scannedAt.getFullYear() === now.getFullYear()
    );
  });
  const summary = monthlyEvents.reduce(
    (acc, event) => {
      acc.total += 1;
      acc[event.status] += 1;
      return acc;
    },
    { total: 0, genuine: 0, suspicious: 0, fake: 0 },
  );
  const recentScan = events[0];
  const recentMeta = recentScan ? getStatusMeta(recentScan.status) : null;
  const RecentIcon = recentMeta?.icon;

  return (
    <div className="flex flex-col gap-6 px-5 pb-[15px] pt-12 md:mx-auto md:w-full md:max-w-5xl md:px-10 md:py-10">

      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="flex max-w-[280px] flex-col md:max-w-none">
          <h1 className="m-0 text-[1.35rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#1f2937]">Welcome back!</h1>
          <p className="mt-2.5 mb-0 text-[0.875rem] font-medium leading-[1.4] text-[#4b5563]">
            Scan a product's QR code to verify its authenticity in seconds.
          </p>
        </div>

        <Link
          to={ROUTES.NOTIFICATIONS}
          aria-label="Notifications"
          className="md:hidden -mt-1 flex items-center justify-center bg-transparent p-1 text-[#1f2937]"
        >
          <Bell size={22} aria-hidden="true" />
        </Link>
      </header>

      {/* Content grid — mobile order: Banner, Monthly Summary, Recent Scan.
          Desktop order: left column (Banner, Recent Scan), right column (Monthly Summary). */}
      <div
        className="grid grid-cols-1 gap-6 [grid-template-areas:'banner'_'summary'_'recent'] md:grid-cols-[1.5fr_1fr] md:gap-8 md:[grid-template-areas:'banner_summary'_'recent_summary']"
      >
        {/* Banner */}
        <div className="relative flex min-h-[242px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#3C744333] p-5 font-bold leading-8 text-[#292D32] [grid-area:banner]">
          <div className="relative z-[2] max-w-[58%]">
            <h2 className="m-0 mb-2 text-[1.25rem] font-bold leading-[1.2] text-[#111827]">Verify. Trust. <br /> Eat.</h2>
            <p className="mt-[38px] h-[88px] w-[166px] text-[0.75rem] font-normal leading-[22px] text-[#292D32]">
              Scan QR code on food products to know if they are genuine and safe for you and your family.
            </p>
          </div>

          <Link
            to={ROUTES.SCAN}
            className="relative z-[2] mt-4 flex cursor-pointer items-center gap-2 self-start rounded-[12px] bg-[#3C7443] p-2.5 px-4 text-[0.875rem] font-semibold text-white shadow-[0_4px_6px_-1px_rgba(45,106,79,0.2)] hover:bg-[#23533e]"
          >
            <span>Scan a Product</span>
            <Scan size={16} aria-hidden="true" />
          </Link>

          <div className="pointer-events-none absolute flex h-[94%] items-end justify-end">
            <img
              src={phone}
              alt="Product verification preview"
              className="relative bottom-0 left-[169px] h-[242px] w-[229px] object-contain"
            />
          </div>
        </div>

        {/* Monthly Scan Summary */}
        <div className="w-full rounded-[16px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] [grid-area:summary]">
          <h3 className="mb-4 text-base font-bold text-[#2d3748]">Monthly Scan Summary</h3>

          <div className="grid grid-cols-[1fr_1.5fr] items-center gap-4">
            {/* Total Scans */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[32px] font-extrabold leading-none text-[#2d3748]">
                {isLoading ? "..." : summary.total}
              </span>
              <span className="mt-1.5 text-[13px] font-semibold text-[#4a5568]">Total Scan</span>
            </div>

            {/* Status List */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] py-2">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>Verified</span>
                </div>
                <span className="text-[0.875rem] font-bold text-[#111827]">{isLoading ? "-" : summary.genuine}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#e2e8f0] py-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#F59E0B]">
                  <AlertTriangle size={16} aria-hidden="true" />
                  <span>Suspicious</span>
                </div>
                <span className="text-[0.875rem] font-bold text-[#111827]">{isLoading ? "-" : summary.suspicious}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#EF4444]">
                  <XCircle size={16} aria-hidden="true" />
                  <span>Fake</span>
                </div>
                <span className="text-[0.875rem] font-bold text-[#111827]">{isLoading ? "-" : summary.fake}</span>
              </div>
            </div>
          </div>
          {error && (
            <p className="mt-3 text-xs font-medium text-[#ef4444]">
              Failed to load scan summary.
            </p>
          )}
        </div>

        {/* Recent Scans */}
        <div className="[grid-area:recent]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#2d3748]" style={{ margin: 0 }}>Recent Scan</h3>
            <Link to={ROUTES.HISTORY} className="text-[0.875rem] font-semibold text-[#2d6a4f] hover:underline">
              View all
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-[20px] border border-[#f3f4f6] bg-white p-5 text-center text-sm text-[#6b7280]">
              Loading recent scan...
            </div>
          ) : !recentScan || !recentMeta || !RecentIcon ? (
            <div className="rounded-[20px] border border-[#f3f4f6] bg-white p-5 text-center text-sm text-[#6b7280]">
              No scan history yet.
            </div>
          ) : (
          <div className="flex items-center justify-between rounded-[20px] border border-[#f3f4f6] bg-white p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-[12px] border border-[#f3f4f6] bg-[#f9fafb] p-1">
                <img
                  src={recentScan.imageUrl || pepper}
                  alt={recentScan.productName ?? "Scanned product"}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="m-0 text-[0.875rem] font-bold text-[#111827]">
                  {recentScan.productName ?? recentScan.code}
                </h4>
                <div className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold ${recentMeta.className}`}>
                  <RecentIcon size={12} aria-hidden="true" />
                  <span>{recentMeta.label}</span>
                </div>
                <p className="m-0 text-[0.7rem] text-[#9ca3af]">
                  {formatDate(recentScan.scannedAt)}
                </p>
              </div>
            </div>

            <ChevronRight size={20} className="cursor-pointer text-[#9ca3af]" aria-hidden="true" />
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

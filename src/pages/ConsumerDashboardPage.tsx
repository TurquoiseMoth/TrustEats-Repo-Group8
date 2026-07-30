import { Link } from "react-router";
import { Bell, ScanLine, QrCode, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "../constants";
import { analyticsService } from "../services/analytics";
import { verificationService } from "../services/verification";
import { Spinner } from "../components/ui";

const statusIcon: Record<string, typeof CheckCircle> = {
  genuine: CheckCircle,
  fake: XCircle,
  suspicious: AlertTriangle,
};

const statusColor: Record<string, string> = {
  genuine: "text-green-600 bg-green-50",
  fake: "text-red-600 bg-red-50",
  suspicious: "text-amber-600 bg-amber-50",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ConsumerDashboardPage() {
  const { data: analytics, isLoading: loadingAnalytics, error: analyticsError } = useQuery({
    queryKey: ["analytics", "summary"],
    queryFn: () => analyticsService.getSummary(),
    staleTime: 60_000,
    retry: 1,
  });

  const { data: history, isLoading: loadingHistory, error: historyError } = useQuery({
    queryKey: ["scanHistory", "dashboard"],
    queryFn: () => verificationService.getHistory(1, 3),
    staleTime: 30_000,
    retry: 1,
  });

  const totalScans = analytics?.totalScans ?? 0;
  const genuineCount = analytics?.scansByResult?.genuine ?? 0;
  const flaggedCount = (analytics?.scansByResult?.suspicious ?? 0) + (analytics?.scansByResult?.fake ?? 0);
  const recentScans = history?.events?.slice(0, 3) ?? [];

  if (loadingAnalytics || loadingHistory) {
    return (
      <div className="p-6 max-w-2xl mx-auto flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (analyticsError) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-red-500 text-sm mb-4">Failed to load dashboard data.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Retry</button>
      </div>
    );
  }




  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to={ROUTES.NOTIFICATIONS} className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <Bell size={22} />
        </Link>
      </div>

      <Link
        to={ROUTES.SCAN}
        className="flex items-center justify-center gap-3 w-full rounded-2xl bg-primary px-6 py-4 text-white font-semibold text-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity mb-8"
      >
        <ScanLine size={22} />
        Scan a Product
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] mb-6">
        <div className="flex items-center gap-2 mb-4">
          <QrCode size={18} className="text-text-secondary" />
          <h2 className="text-base font-semibold text-gray-800">Summary</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-green-50 py-3">
            <p className="text-xl font-bold text-green-700">{totalScans}</p>
            <p className="text-xs text-green-600 font-medium">Total Scans</p>
          </div>
          <div className="rounded-xl bg-blue-50 py-3">
            <p className="text-xl font-bold text-blue-700">{genuineCount}</p>
            <p className="text-xs text-blue-600 font-medium">Genuine</p>
          </div>
          <div className="rounded-xl bg-amber-50 py-3">
            <p className="text-xl font-bold text-amber-700">{flaggedCount}</p>
            <p className="text-xs text-amber-600 font-medium">Flagged</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recent Scans</h2>
      </div>
      {historyError ? (
        <p className="text-sm text-red-400 text-center py-8">Failed to load scan history.</p>
      ) : recentScans.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No recent scans.</p>
      ) : (
        <div className="space-y-3">
          {recentScans.map((scan) => {
            const Icon = statusIcon[scan.status] ?? CheckCircle;
            const colorClass = statusColor[scan.status] ?? "text-gray-600 bg-gray-50";
            return (
              <div key={scan._id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{scan.productName ?? scan.code}</p>
                  <p className="text-xs text-gray-500">{scan.brand ?? ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-700 capitalize">{scan.status}</p>
                  <p className="text-[11px] text-gray-400">{formatDate(scan.scannedAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

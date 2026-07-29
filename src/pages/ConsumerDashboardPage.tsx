import { Link } from "react-router";
import { Bell, ScanLine, QrCode, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { ROUTES } from "../constants";
import { MOCK_VERIFICATIONS } from "../utils/mockData";
import type { VerificationRecord } from "../utils/mockData";

const statusIcon: Record<VerificationRecord["result"], typeof CheckCircle> = {
  Genuine: CheckCircle,
  Failed: XCircle,
  Counterfeit: AlertTriangle,
};

const statusColor: Record<VerificationRecord["result"], string> = {
  Genuine: "text-green-600 bg-green-50",
  Failed: "text-red-600 bg-red-50",
  Counterfeit: "text-amber-600 bg-amber-50",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr.replace(" ", "T"));
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ConsumerDashboardPage() {
  const thisMonth = "August 2026";
  const monthlyScans = MOCK_VERIFICATIONS.filter((v) => v.scanDate.startsWith("2026-08"));
  const recentScans = MOCK_VERIFICATIONS.slice(0, 3);

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
        className="flex items-center justify-center gap-3 w-full rounded-2xl bg-[#14833B] px-6 py-4 text-white font-semibold text-lg shadow-md hover:opacity-90 transition-opacity mb-8"
      >
        <ScanLine size={22} />
        Scan a Product
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <QrCode size={18} className="text-[#14833B]" />
          <h2 className="text-base font-semibold text-gray-800">Monthly Summary</h2>
        </div>
        <p className="text-sm text-gray-500 mb-3">{thisMonth}</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-green-50 py-3">
            <p className="text-xl font-bold text-green-700">{monthlyScans.length}</p>
            <p className="text-xs text-green-600 font-medium">Total Scans</p>
          </div>
          <div className="rounded-xl bg-blue-50 py-3">
            <p className="text-xl font-bold text-blue-700">{monthlyScans.filter((v) => v.result === "Genuine").length}</p>
            <p className="text-xs text-blue-600 font-medium">Genuine</p>
          </div>
          <div className="rounded-xl bg-amber-50 py-3">
            <p className="text-xl font-bold text-amber-700">{monthlyScans.filter((v) => v.result !== "Genuine").length}</p>
            <p className="text-xs text-amber-600 font-medium">Flagged</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recent Scans</h2>
      </div>
      <div className="space-y-3">
        {recentScans.map((scan) => {
          const Icon = statusIcon[scan.result];
          const colorClass = statusColor[scan.result];
          return (
            <div key={scan.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{scan.product}</p>
                <p className="text-xs text-gray-500">{scan.manufacturer} · {scan.method}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700">{scan.result}</p>
                <p className="text-[11px] text-gray-400">{formatDate(scan.scanDate)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

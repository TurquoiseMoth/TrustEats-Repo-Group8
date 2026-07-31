import { Building2, UserCheck, PackageSearch, Ban } from "lucide-react";
import StatCard from "../components/admin/StatCard";
import ApplicationsChart from "../components/admin/ApplicationsChart";
import RecentApplicationsTable from "../components/admin/RecentApplicationsTable";
import type {
  Application,
  DashboardStats,
  MonthlyApplicationData,
} from "../types/application.types";

const PLACEHOLDER_STATS: DashboardStats = {
  totalCompanies: 12,
  verifiedCount: 7,
  pendingCount: 5,
  rejectedCount: 0,
};

const PLACEHOLDER_CHART_DATA: MonthlyApplicationData[] = [
  { month: "Jan", submitted: 45, approved: 42 },
  { month: "Feb", submitted: 52, approved: 48 },
  { month: "Mar", submitted: 58, approved: 58 },
  { month: "Apr", submitted: 57, approved: 60 },
  { month: "May", submitted: 60, approved: 76 },
  { month: "Jun", submitted: 68, approved: 78 },
  { month: "Jul", submitted: 78, approved: 88 },
];

const PLACEHOLDER_APPLICATIONS: Application[] = [
  { id: "APP-5522", organization: "Sahel Frozen Foods", type: "Renewal", submittedDate: "17 Jul, 2026", status: "submitted" },
  { id: "APP-5523", organization: "Naija Crunch Foods Ltd", type: "Facility Addition", submittedDate: "15 Jul, 2026", status: "approved" },
  { id: "APP-5524", organization: "AquaPure Table Water", type: "Renewal", submittedDate: "12 Jul, 2026", status: "rejected" },
  { id: "APP-5525", organization: "Delta Palm Products", type: "New Certification", submittedDate: "10 Jul, 2026", status: "pending" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="hidden md:block bg-secondary px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="px-5 md:px-8 py-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <StatCard
            label="Company/Brand"
            value={PLACEHOLDER_STATS.totalCompanies}
            description="Total Company Registered"
            icon={Building2}
          />
          <StatCard
            label="Verified"
            value={PLACEHOLDER_STATS.verifiedCount}
            description="Approved Applications"
            icon={UserCheck}
          />
          <StatCard
            label="Pending"
            value={PLACEHOLDER_STATS.pendingCount}
            description="Pending Applications"
            icon={PackageSearch}
          />
          <StatCard
            label="Rejected"
            value={PLACEHOLDER_STATS.rejectedCount}
            description="Rejected Applications"
            icon={Ban}
          />
        </div>

        <div className="mb-6">
          <ApplicationsChart data={PLACEHOLDER_CHART_DATA} />
        </div>

        <RecentApplicationsTable applications={PLACEHOLDER_APPLICATIONS} />
      </div>
    </div>
  );
}
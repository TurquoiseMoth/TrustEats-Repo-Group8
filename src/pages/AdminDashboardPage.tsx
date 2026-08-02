import { Building2, UserCheck, PackageSearch, Ban } from "lucide-react";
import StatCard from "../components/admin/StatCard";
import ApplicationsChart from "../components/admin/ApplicationsChart";
import RecentApplicationsTable from "../components/admin/RecentApplicationsTable";
import { useQuery } from "@tanstack/react-query";
import { adminService, type AdminManufacturer } from "../services/admin";
import type {
  Application,
  DashboardStats,
  MonthlyApplicationData,
} from "../types/application.types";

const PLACEHOLDER_CHART_DATA: MonthlyApplicationData[] = [
  { month: "Jan", submitted: 45, approved: 42 },
  { month: "Feb", submitted: 52, approved: 48 },
  { month: "Mar", submitted: 58, approved: 58 },
  { month: "Apr", submitted: 57, approved: 60 },
  { month: "May", submitted: 60, approved: 76 },
  { month: "Jun", submitted: 68, approved: 78 },
  { month: "Jul", submitted: 78, approved: 88 },
];

function toApplication(manufacturer: AdminManufacturer): Application {
  return {
    id: manufacturer._id,
    organization: manufacturer.companyName,
    type: "Manufacturer Registration",
    submittedDate: manufacturer.createdAt
      ? new Intl.DateTimeFormat(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(manufacturer.createdAt))
      : "N/A",
    status:
      manufacturer.status === "suspended"
        ? "rejected"
        : manufacturer.status === "approved"
          ? "approved"
          : "pending",
  };
}

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-manufacturers"],
    queryFn: () => adminService.getManufacturers(),
    staleTime: 15_000,
  });

  const manufacturers = data?.manufacturers ?? [];
  const stats: DashboardStats = {
    totalCompanies: manufacturers.length,
    verifiedCount: manufacturers.filter((m) => m.status === "approved").length,
    pendingCount: manufacturers.filter((m) => m.status === "pending").length,
    rejectedCount: manufacturers.filter((m) => m.status === "suspended").length,
  };
  const applications = manufacturers.slice(0, 5).map(toApplication);

  return (
    <div>
      <div className="hidden md:block bg-secondary px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>

      <div className="mx-auto max-w-[1680px] px-5 py-6 md:px-8 2xl:px-12">
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Company/Brand"
            value={stats.totalCompanies}
            description="Total Company Registered"
            icon={Building2}
          />
          <StatCard
            label="Verified"
            value={stats.verifiedCount}
            description="Approved Applications"
            icon={UserCheck}
          />
          <StatCard
            label="Pending"
            value={stats.pendingCount}
            description="Pending Applications"
            icon={PackageSearch}
          />
          <StatCard
            label="Rejected"
            value={stats.rejectedCount}
            description="Rejected Applications"
            icon={Ban}
          />
        </div>

        {isLoading && <p className="mb-4 text-sm text-gray-500">Loading applications...</p>}
        {error && <p className="mb-4 text-sm text-red-600">Unable to load admin data.</p>}

        <div className="mb-6">
          <ApplicationsChart data={PLACEHOLDER_CHART_DATA} />
        </div>

        <RecentApplicationsTable applications={applications} />
      </div>
    </div>
  );
}

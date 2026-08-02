import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApplicationCard from "../components/admin/ApplicationCard";
import type { Application, ApplicationStatus } from "../components/admin/ApplicationCard";
import { adminService, type AdminManufacturer } from "../services/admin";

type Tab = "All" | "Approved" | "Pending" | "Rejected";
const tabs: Tab[] = ["All", "Approved", "Pending", "Rejected"];

function notify(type: "success" | "error", message: string) {
  window.dispatchEvent(
    new CustomEvent("trusteats:notify", { detail: { type, message } }),
  );
}

function toApplication(manufacturer: AdminManufacturer): Application {
  const created = manufacturer.createdAt ? new Date(manufacturer.createdAt) : null;
  return {
    id: manufacturer._id,
    companyName: manufacturer.companyName,
    appId: `APP-${manufacturer._id.slice(-5).toUpperCase()}`,
    status:
      manufacturer.status === "suspended"
        ? "rejected"
        : manufacturer.status === "approved"
          ? "approved"
          : "pending",
    date: created
      ? new Intl.DateTimeFormat(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(created)
      : "N/A",
    time: created
      ? new Intl.DateTimeFormat(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }).format(created)
      : "",
  };
}

export default function AdminApplicationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-manufacturers"],
    queryFn: () => adminService.getManufacturers(),
    staleTime: 15_000,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-manufacturers"] });

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveManufacturer(id),
    onSuccess: () => {
      notify("success", "Manufacturer approved successfully.");
      invalidate();
    },
    onError: () => notify("error", "Unable to approve manufacturer."),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) =>
      adminService.suspendManufacturer(id, "Rejected by admin"),
    onSuccess: () => {
      notify("success", "Manufacturer rejected successfully.");
      invalidate();
    },
    onError: () => notify("error", "Unable to reject manufacturer."),
  });

  const updateStatus = (id: string, status: ApplicationStatus) => {
    if (status === "approved") approveMutation.mutate(id);
    if (status === "rejected") rejectMutation.mutate(id);
    if (status === "pending") rejectMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    rejectMutation.mutate(id);
  };

  const handleReviewDetails = (id: string) => {
    navigate(`/admin/applications/${id}`);
  };

  const applications = (data?.manufacturers ?? []).map(toApplication);
  const filtered = applications.filter((app) => {
    if (activeTab === "All") return true;
    if (activeTab === "Approved") return app.status === "approved";
    if (activeTab === "Pending") return app.status === "pending";
    if (activeTab === "Rejected") return app.status === "rejected";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-emerald-700 px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Admin Applications</h1>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="mb-6 flex gap-1 rounded-xl bg-slate-100 p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-emerald-800 text-white"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <p className="py-12 text-center text-sm text-slate-500">
              Loading applications...
            </p>
          ) : error ? (
            <p className="py-12 text-center text-sm text-red-600">
              Unable to load manufacturer applications.
            </p>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              No applications in this category.
            </p>
          ) : (
            filtered.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onApprove={(id) => updateStatus(id, "approved")}
                onReject={(id) => updateStatus(id, "rejected")}
                onRevoke={(id) => updateStatus(id, "pending")}
                onDelete={handleDelete}
                onReviewDetails={handleReviewDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

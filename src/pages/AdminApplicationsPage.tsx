import { useState } from "react";
import { useNavigate } from "react-router";
import ApplicationCard from "../components/admin/ApplicationCard";
import type { Application, ApplicationStatus } from "../components/admin/ApplicationCard";

const initialApplications: Application[] = [
  { id: "1", companyName: "Colgate Inc", appId: "APP-5521", status: "pending", date: "18 Jul, 2026", time: "9:45 AM" },
  { id: "2", companyName: "Gino", appId: "APP-5521", status: "pending", date: "18 Jul, 2026", time: "9:45 AM" },
  { id: "3", companyName: "Beleuxe", appId: "APP-5521", status: "pending", date: "18 Jul, 2026", time: "9:45 AM" },
  { id: "4", companyName: "Delta Palm Product", appId: "APP-5521", status: "pending", date: "18 Jul, 2026", time: "9:45 AM" },
  { id: "5", companyName: "Gino", appId: "APP-5521", status: "approved", date: "18 Jul, 2026", time: "9:45 AM" },
  { id: "6", companyName: "Zuri Spice Company", appId: "APP-5521", status: "pending", date: "18 Jul, 2026", time: "9:45 AM", isNew: true },
];

type Tab = "All" | "Approved" | "Pending" | "Rejected";
const tabs: Tab[] = ["All", "Approved", "Pending", "Rejected"];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const navigate = useNavigate();

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status, isNew: false } : app))
    );
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const handleReviewDetails = (id: string) => {
    navigate(`/admin/applications/${id}`);
  };

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
          {filtered.length === 0 ? (
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
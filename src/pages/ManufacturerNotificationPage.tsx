import { Link, useNavigate } from "react-router";
import { ROUTES } from "../constants";
import { Bell, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";

const emptyState = (
  <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
      <Bell className="h-10 w-10 text-primary" />
    </div>
    <h2 className="text-xl font-bold text-gray-900">Manufacturer Notifications</h2>
    <p className="max-w-xs text-sm text-gray-500">
      You have no new notifications. Alerts about your products and verification reports will appear here.
    </p>
    <Link
      to={ROUTES.MANUFACTURER_DASHBOARD}
      className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
    >
      Back to Dashboard
    </Link>
  </div>
);

export default function ManufacturerNotificationPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-['Inter',sans-serif]">
        <header className="sticky top-0 z-40 flex h-12 items-center bg-primary px-4">
          <button onClick={() => navigate(-1)} className="text-white" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">Notifications</h1>
        </header>

        {emptyState}

        <ManufacturerMobileNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-['Inter',sans-serif]">
      <ManufacturerSidebar />

      <div className="ml-60 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
          <h1 className="text-lg font-bold text-white">Notifications</h1>
        </header>

        {emptyState}
      </div>
    </div>
  );
}

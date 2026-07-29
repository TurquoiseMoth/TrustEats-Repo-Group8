import { Link } from "react-router";
import { ROUTES } from "../constants";
import { Bell, ArrowLeft } from "lucide-react";

export default function ManufacturerNotificationPage() {
  return (
    <div className="min-h-screen bg-[#EEF2F5] font-['Inter',sans-serif]">
      <header className="sticky top-0 z-40 flex h-12 items-center bg-[#3F7A46] px-4">
        <Link to={ROUTES.MANUFACTURER_DASHBOARD} className="text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">Notifications</h1>
      </header>

      <div className="flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Bell className="h-10 w-10 text-[#3F7A46]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Manufacturer Notifications</h2>
        <p className="max-w-xs text-sm text-gray-500">
          You have no new notifications. Alerts about your products and verification reports will appear here.
        </p>
        <Link
          to={ROUTES.MANUFACTURER_DASHBOARD}
          className="mt-4 rounded-xl bg-[#3F7A46] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

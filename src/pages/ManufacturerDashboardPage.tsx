import { useMediaQuery } from "../hooks/useMediaQuery";
import { Link } from "react-router";
import { ROUTES } from "../constants";
import {
  ShieldCheck,
  Building2,
  ArrowLeft,
  Home,
  QrCode,
  Settings,
  LayoutDashboard,
  FileText,
  BarChart3,
  Megaphone,
  Bell,
  PackagePlus,
  Construction,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: ROUTES.MANUFACTURER_DASHBOARD, icon: LayoutDashboard, active: true },
  { label: "Organizations", href: ROUTES.MANUFACTURER_ORGANIZATIONS, icon: Building2 },
  { label: "Applications", href: ROUTES.MANUFACTURER_APPLICATIONS, icon: FileText },
  { label: "Consumer Reports", href: ROUTES.MANUFACTURER_CONSUMER_REPORTS, icon: BarChart3 },
  { label: "Add Product", href: ROUTES.PRODUCT_UPLOAD, icon: PackagePlus },
  { label: "Promotion & Tips", href: ROUTES.MANUFACTURER_PROMOTION_TIPS, icon: Megaphone },
  { label: "Notification", href: ROUTES.MANUFACTURER_NOTIFICATIONS, icon: Bell },
];

const mobileTabs = [
  { label: "Home", href: ROUTES.HOME, icon: Home },
  { label: "QR Code", href: ROUTES.SCAN, icon: QrCode },
  { label: "Dashboard", href: ROUTES.MANUFACTURER_DASHBOARD, icon: LayoutDashboard, active: true },
  { label: "Settings", href: ROUTES.SETTINGS, icon: Settings },
];

function PlaceholderContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
        <Construction className="h-12 w-12 text-yellow-600" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wide">
        Manufacturer Dashboard
      </h2>
      <div className="inline-block rounded-full bg-yellow-200 px-6 py-2">
        <span className="text-sm font-bold uppercase tracking-widest text-yellow-800">
          Under Construction
        </span>
      </div>
      <p className="max-w-md text-base text-gray-500">
        This page is being implemented by another developer. Please check back later.
      </p>
    </div>
  );
}

function ManufacturerDashboardPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-[#EEF2F5]">
        <header className="sticky top-0 z-40 flex h-12 items-center bg-[#3F7A46] px-4">
          <button onClick={() => window.history.back()} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-20">
          <PlaceholderContent />
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
          <div className="flex h-14 items-center justify-around">
            {mobileTabs.map(({ label, href, icon: Icon, active }) => (
              <Link
                key={label}
                to={href}
                className="flex w-full flex-col items-center justify-center gap-0.5"
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={active ? "text-[#3F7A46]" : "text-gray-400"}
                />
                <span
                  className={`text-xs font-medium ${
                    active ? "text-[#3F7A46]" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#EEF2F5]">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5">
          <ShieldCheck className="h-7 w-7 text-[#3F7A46]" />
          <span className="text-lg font-bold text-[#3F7A46]">TrustEats</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {sidebarLinks.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={label}
              to={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#3F7A46] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-5">
          <Link
            to={ROUTES.SETTINGS}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>

      <div className="ml-60 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center bg-[#689F78] px-8">
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-5xl">
            <PlaceholderContent />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManufacturerDashboardPage;

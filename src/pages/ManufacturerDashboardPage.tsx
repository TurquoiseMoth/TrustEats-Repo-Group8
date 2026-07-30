import { useMediaQuery } from "../hooks/useMediaQuery";
import { Link } from "react-router";
import { ROUTES } from "../constants";
import {
  ShieldCheck,
  ArrowLeft,
  Home,
  QrCode,
  Settings,
  LayoutDashboard,
  Bell,
  PackagePlus,
  Package,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: ROUTES.MANUFACTURER_DASHBOARD, icon: LayoutDashboard },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode },
  { label: "Add Product", href: ROUTES.PRODUCT_UPLOAD, icon: PackagePlus },
  { label: "Product List", href: ROUTES.PRODUCT_LIST, icon: Package },
  { label: "Notification", href: ROUTES.MANUFACTURER_NOTIFICATIONS, icon: Bell },
];

const quickLinks = [
  { label: "Add Product", href: ROUTES.PRODUCT_UPLOAD, icon: PackagePlus, desc: "Register a new product batch" },
  { label: "QR Code Generator", href: ROUTES.QR_CODE, icon: QrCode, desc: "Generate codes for your products" },
  { label: "Product List", href: ROUTES.PRODUCT_LIST, icon: Package, desc: "View all your registered products" },
  { label: "Notifications", href: ROUTES.MANUFACTURER_NOTIFICATIONS, icon: Bell, desc: "Check alerts and updates" },
];

function DashboardPlaceholder() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Manufacturer Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {quickLinks.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            to={href}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ManufacturerDashboardPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-40 flex h-12 items-center bg-primary px-4">
          <button onClick={() => window.history.back()} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-20">
          <DashboardPlaceholder />
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
          <div className="flex h-14 items-center justify-around">
            <Link to={ROUTES.HOME} className="flex w-full flex-col items-center justify-center gap-0.5 text-gray-400">
              <Home size={20} strokeWidth={1.8} />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link to={ROUTES.QR_CODE} className="flex w-full flex-col items-center justify-center gap-0.5 text-gray-400">
              <QrCode size={20} strokeWidth={1.8} />
              <span className="text-xs font-medium">QR Code</span>
            </Link>
            <Link to={ROUTES.MANUFACTURER_DASHBOARD} className="flex w-full flex-col items-center justify-center gap-0.5 text-primary">
              <LayoutDashboard size={20} strokeWidth={2.5} />
              <span className="text-xs font-medium text-primary">Dashboard</span>
            </Link>
            <Link to={ROUTES.SETTINGS} className="flex w-full flex-col items-center justify-center gap-0.5 text-gray-400">
              <Settings size={20} strokeWidth={1.8} />
              <span className="text-xs font-medium">Settings</span>
            </Link>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold text-primary">TrustEats</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {sidebarLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
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
        <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-5xl">
            <DashboardPlaceholder />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManufacturerDashboardPage;

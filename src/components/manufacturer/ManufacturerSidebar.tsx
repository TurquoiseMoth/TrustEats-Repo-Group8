import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  QrCode,
  PackagePlus,
  Package,
  Bell,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { ROUTES } from "../../constants";
import { DEFAULT_UNREAD_COUNT } from "../../constants/notifications";
import { NotificationBell } from "../ui/NotificationBell";

const sidebarLinks = [
  { label: "Dashboard", href: ROUTES.MANUFACTURER_DASHBOARD, icon: LayoutDashboard },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode },
  { label: "Add Product", href: ROUTES.PRODUCT_UPLOAD, icon: PackagePlus },
  { label: "Product List", href: ROUTES.MANUFACTURER_PRODUCTS, icon: Package },
  { label: "Notification", href: ROUTES.MANUFACTURER_NOTIFICATIONS, icon: Bell },
];

/**
 * Shared desktop sidebar for the manufacturer flow so the layout stays
 * identical across the dashboard, QR code, product upload and notification pages.
 */
export function ManufacturerSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <ShieldCheck className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold text-primary">TrustEats</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {sidebarLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              to={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {href === ROUTES.MANUFACTURER_NOTIFICATIONS ? (
                <NotificationBell count={DEFAULT_UNREAD_COUNT} iconClassName="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <Link
          to={ROUTES.PROFILE}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}

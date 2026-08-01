import { Link, useLocation } from "react-router";
import { Home, QrCode, Package } from "lucide-react";
import { ROUTES } from "../../constants";

const mobileTabs = [
  { label: "Home", href: ROUTES.MANUFACTURER_DASHBOARD, icon: Home },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode },
  { label: "Product", href: ROUTES.MANUFACTURER_PRODUCTS, icon: Package },
  // Notifications are disabled until a backend endpoint exists.
  // { label: "Notification", href: ROUTES.MANUFACTURER_NOTIFICATIONS, icon: Bell },
];

/**
 * Shared mobile bottom navigation for the manufacturer flow so navigation
 * stays consistent between the dashboard, QR code and product upload pages.
 */
export function ManufacturerMobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <div className="flex h-14 items-center justify-around">
        {mobileTabs.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              to={href}
              className="flex w-full flex-col items-center justify-center gap-0.5"
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={isActive ? "text-primary" : "text-gray-400"}
              />
              <span
                className={`text-xs font-medium ${isActive ? "text-primary" : "text-gray-400"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

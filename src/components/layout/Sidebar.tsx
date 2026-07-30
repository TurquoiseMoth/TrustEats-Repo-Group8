import { Link, useLocation } from "react-router";
import { LayoutDashboard, QrCode, PlusSquare, Package, Bell, Settings, ShieldCheck } from "lucide-react";
import { ROUTES } from "../../constants";

const navItems = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode },
  { label: "Add Product", href: ROUTES.ADD_PRODUCT, icon: PlusSquare },
  { label: "Product List", href: ROUTES.PRODUCT_LIST, icon: Package },
  { label: "Notification", href: ROUTES.NOTIFICATIONS, icon: Bell },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 border-r border-gray-200 bg-white px-5 py-6">
      <div className="flex items-center gap-2 px-2 mb-10">
        <ShieldCheck className="text-primary" size={26} aria-hidden="true" />
        <span className="text-lg font-bold">
          Trust<span className="text-primary">Eats</span>
        </span>
      </div>

      <nav className="flex-1" aria-label="Dashboard navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  ].join(" ")}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        to={ROUTES.SETTINGS}
        className="flex items-center gap-2 justify-center px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <Settings size={16} aria-hidden="true" />
        Setting
      </Link>
    </aside>
  );
}

export default Sidebar;
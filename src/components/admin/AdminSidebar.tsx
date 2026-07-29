import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileWarning,
  Megaphone,
  Bell,
} from "lucide-react";
import { ROUTES } from "../../constants";
import logo from "../../assets/images/logo.png";

const navItems = [
  { label: "Dashboard", href: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: "Organizations", href: ROUTES.ADMIN_ORGANIZATIONS, icon: Building2 },
  { label: "Applications", href: ROUTES.ADMIN_APPLICATIONS, icon: ClipboardList },
  { label: "Consumer Reports", href: ROUTES.ADMIN_CONSUMER_REPORTS, icon: FileWarning },
  { label: "Promotion & Tips", href: ROUTES.ADMIN_PROMOTION_TIPS, icon: Megaphone },
  { label: "Notification", href: ROUTES.ADMIN_NOTIFICATIONS, icon: Bell },
];

function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 bg-[#eef4fc] border-r border-gray-200 px-5 py-6">
      <div className="px-1 mb-8">
        <img src={logo} alt="TrustEats" className="h-8 w-auto" />
      </div>

      <nav className="flex-1" aria-label="Admin navigation">
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
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#2F6844] text-white"
                      : "text-gray-600 hover:bg-white hover:text-gray-900",
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
    </aside>
  );
}

export default AdminSidebar;
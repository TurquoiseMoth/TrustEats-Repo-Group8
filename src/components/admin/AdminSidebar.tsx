import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileWarning,
  Megaphone,
  Bell,
  User,
} from "lucide-react";
import { ROUTES } from "../../constants";
import { DEFAULT_UNREAD_COUNT } from "../../constants/notifications";
import { NotificationBell } from "../ui/NotificationBell";
import { authService } from "../../services/auth";
import logo from "../../assets/images/Logo.png";

const navItems = [
  { label: "Dashboard (Admin)", href: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: "Organizations (Admin)", href: ROUTES.ADMIN_ORGANIZATIONS, icon: Building2 },
  { label: "Applications (Admin)", href: ROUTES.ADMIN_APPLICATIONS, icon: ClipboardList },
  { label: "Consumer Reports (Admin)", href: ROUTES.ADMIN_CONSUMER_REPORTS, icon: FileWarning },
  { label: "Promotion & Tips (Admin)", href: ROUTES.ADMIN_PROMOTION_TIPS, icon: Megaphone },
  { label: "Notification (Admin)", href: ROUTES.ADMIN_NOTIFICATIONS, icon: Bell },
];

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 bg-background border-r border-gray-200 px-5 py-6">
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
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-white hover:text-gray-900",
                  ].join(" ")}
                >
                  {item.href === ROUTES.ADMIN_NOTIFICATIONS ? (
                    <NotificationBell
                      count={DEFAULT_UNREAD_COUNT}
                      iconClassName="h-[18px] w-[18px]"
                    />
                  ) : (
                    <Icon size={18} aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
      >
        <User size={18} aria-hidden="true" />
        Admin
      </button>
    </aside>
  );
}

export default AdminSidebar;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileWarning,
  Megaphone,
  Bell,
  LogOut,
} from "lucide-react";
import { ROUTES } from "../../constants";
import { DEFAULT_UNREAD_COUNT } from "../../constants/notifications";
import { NotificationBell } from "../ui/NotificationBell";
import { authService } from "../../services/auth";
import logo from "../../assets/images/Logo.png";

const navItems = [
  { label: "Dashboard", href: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: "Organizations", href: ROUTES.ADMIN_ORGANIZATIONS, icon: Building2 },
  { label: "Applications", href: ROUTES.ADMIN_APPLICATIONS, icon: ClipboardList },
  { label: "Consumer Reports", href: ROUTES.ADMIN_CONSUMER_REPORTS, icon: FileWarning },
  { label: "Promotion & Tips", href: ROUTES.ADMIN_PROMOTION_TIPS, icon: Megaphone },
  { label: "Notification", href: ROUTES.ADMIN_NOTIFICATIONS, icon: Bell },
];

function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    setIsOpen(false);
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <div className="md:hidden bg-background relative z-40">
      <div className="flex items-center justify-between px-5 py-4">
        <img src={logo} alt="TrustEats" className="h-7 w-auto" />
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="text-gray-700"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <nav
          className="absolute top-full left-0 right-0 bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-3 py-3"
          aria-label="Admin navigation"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                      className={[
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                        isActive ? "bg-primary text-white" : "text-gray-700",
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
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700"
          >
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </nav>
      )}
    </div>
  );
}

export default AdminMobileNav;

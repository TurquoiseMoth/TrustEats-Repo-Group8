import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
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

function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden bg-[#eef4fc] relative z-40">
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
                      isActive ? "bg-[#2F6844] text-white" : "text-gray-700",
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
      )}
    </div>
  );
}

export default AdminMobileNav;
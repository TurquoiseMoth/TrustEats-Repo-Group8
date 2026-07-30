import { Link, useLocation } from "react-router";
import { Home, Scan, History, User } from "lucide-react";
import { ROUTES } from "../../constants";

const navItems = [
  { label: "Home", href: ROUTES.DASHBOARD, icon: Home },
  { label: "Scan", href: ROUTES.SCAN, icon: Scan },
  { label: "History", href: ROUTES.HISTORY, icon: History },
  { label: "Profile", href: ROUTES.PROFILE, icon: User },
];

function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 z-40"
      aria-label="Primary navigation"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            to={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium",
              isActive ? "text-primary" : "text-gray-400",
            ].join(" ")}
          >
            <Icon size={22} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
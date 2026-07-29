import { Link, useLocation } from "react-router";
import { Home, QrCode, Package, User } from "lucide-react";
import { ROUTES } from "../../constants";

const navItems = [
  { label: "Home", href: ROUTES.HOME, icon: Home },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode },
  { label: "Product", href: ROUTES.PRODUCT_LIST, icon: Package },
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
              isActive ? "text-[#2F6844]" : "text-gray-400",
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
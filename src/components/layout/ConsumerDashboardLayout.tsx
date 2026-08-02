import { Link, Outlet, useLocation } from "react-router";
import { Home, Scan, History, User, Bell } from "lucide-react";
import { ROUTES } from "../../constants";
import BottomNav from "./BottomNav";
import logo from "../../assets/Logo.png";

const navItems = [
  { label: "Home", href: ROUTES.DASHBOARD, icon: Home },
  { label: "Scan", href: ROUTES.SCAN, icon: Scan },
  { label: "History", href: ROUTES.HISTORY, icon: History },
  { label: "Profile", href: ROUTES.PROFILE, icon: User },
];

function ConsumerDashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] font-[system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Oxygen,Ubuntu,Cantarell,sans-serif]">
      <div className="relative flex min-h-screen w-full flex-col bg-[#f4f8fa] pb-16 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] md:max-w-7xl md:pb-0 md:shadow-none">
        {/* Desktop top bar */}
        <header className="hidden items-center justify-between border-b border-gray-100 bg-white px-10 py-4 md:flex">
          <Link to={ROUTES.HOME} className="flex shrink-0 items-center gap-2.5">
            <img src={logo} alt="TrustEats home" className="h-8 w-auto" />
          </Link>

          <nav className="flex items-center gap-1 rounded-full bg-[#f0f8ff] px-1.5 py-1" aria-label="Dashboard navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to={ROUTES.NOTIFICATIONS}
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Bell size={20} aria-hidden="true" />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
}

export default ConsumerDashboardLayout;

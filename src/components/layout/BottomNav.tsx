import { NavLink } from "react-router";
import { Home, ScanLine, Clock, User } from "lucide-react";

const tabs = [
  { label: "Home", to: "/", icon: Home },
  { label: "Scan", to: "/scan", icon: ScanLine },
  { label: "History", to: "/history", icon: Clock },
  { label: "Profile", to: "/profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <div className="flex items-center justify-around h-14">
        {tabs.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className="flex flex-col items-center justify-center gap-0.5 w-full h-full text-xs font-medium transition-colors"
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={isActive ? "text-[#3F7A46]" : "text-gray-400"}
                />
                <span className={isActive ? "text-[#3F7A46]" : "text-gray-400"}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

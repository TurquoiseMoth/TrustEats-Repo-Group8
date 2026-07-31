import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ROUTES } from "../../constants";
import logo from "../../assets/Logo.png";

const navItems = [
  { label: "Home", href: ROUTES.HOME },
  { label: "About", href: "/#about" },
  { label: "Why Us", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
];

const consumerLinks = [
  { label: "Scan", href: ROUTES.SCAN },
  { label: "History", href: ROUTES.HISTORY },
  { label: "Profile", href: ROUTES.PROFILE },
  { label: "Notifications", href: ROUTES.NOTIFICATIONS },
];

const manufacturerLinks = [
  { label: "Manufacturer Login", href: ROUTES.MANUFACTURER_LOGIN },
  { label: "Manufacturer Sign Up", href: ROUTES.MANUFACTURER_SIGNUP },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-background backdrop-blur-md shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        {/* Left: Logo */}
        <Link to={ROUTES.HOME} className="flex shrink-0 items-center gap-2.5">
          <img src={logo} alt="TrustEats home" className="h-9 w-auto" />
        </Link>

        {/* Center: Nav Pill */}
        <div className="hidden md:flex items-center gap-1 rounded-full bg-secondary px-1.5 py-1">
          {navItems.map((item) => {
            const isActive = item.href === ROUTES.HOME && pathname === "/";
            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-white/85 hover:bg-white/15 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Auth links */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-primary px-1.5 py-1">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary/5"
          >
            Log In
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center text-text-main md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-gray-100 bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            <Link
              to={ROUTES.LOGIN}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>

            <p className="mt-3 mb-1 px-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Consumer
            </p>
            {consumerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <p className="mt-3 mb-1 px-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Manufacturer
            </p>
            {manufacturerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

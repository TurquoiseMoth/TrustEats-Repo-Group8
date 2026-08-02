import { Menu, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
  const navigate = useNavigate();

  // Smooth-scroll to an in-page section (e.g. "/#about"). If we're on another
  // route, navigate home first, then scroll once the page has rendered.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      const scrollToSection = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      if (pathname === "/") {
        scrollToSection();
      } else {
        navigate(ROUTES.HOME);
        setTimeout(scrollToSection, 180);
      }
    } else if (href === ROUTES.HOME && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
                onClick={(e) => handleNavClick(e, item.href)}
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
        <div className="hidden md:flex items-center gap-1 rounded-[1.25rem] border border-[#3c7443] px-2 py-1">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-lg bg-[#f0f8ff] px-4 py-1.5 text-sm font-medium text-[#3c7443] transition-colors hover:bg-[#3c7443] hover:text-white"
          >
            Log In
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className="rounded-lg border border-[#3c7443] bg-[#f0f8ff] px-4 py-1.5 text-sm font-semibold text-[#3c7443] transition-colors hover:bg-[#3c7443] hover:text-white"
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
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            <Link
              to={ROUTES.LOGIN}
              className="rounded-lg border border-[#3c7443] bg-[#f0f8ff] px-4 py-2.5 text-sm font-medium text-[#3c7443] transition-colors hover:bg-[#3c7443] hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="rounded-lg border border-[#3c7443] bg-[#f0f8ff] px-4 py-2.5 text-center text-sm font-semibold text-[#3c7443] transition-colors hover:bg-[#3c7443] hover:text-white"
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

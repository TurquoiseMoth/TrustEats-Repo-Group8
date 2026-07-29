import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../constants";
import { Button } from "../ui";

/* 
 * Nav links include all user-facing pages in the app.
 * Parameterised routes (e.g. /verify/:code) are excluded since they
 * require dynamic data and aren't meaningful as static nav targets.
 */
const navLinks = [
  { label: "Consumer Home", href: ROUTES.HOME },
  { label: "Consumer Scan", href: ROUTES.SCAN },
  { label: "Consumer History", href: ROUTES.HISTORY },
  { label: "Consumer Profile", href: ROUTES.PROFILE },
  { label: "Consumer Notifications", href: ROUTES.NOTIFICATIONS },
  { label: "Consumer Dashboard", href: ROUTES.DASHBOARD },
  { label: "Consumer Forgot Password", href: ROUTES.FORGOT_PASSWORD },
  { label: "Manufacturer Dashboard", href: ROUTES.MANUFACTURER_DASHBOARD },
  { label: "Manufacturer Organizations", href: ROUTES.MANUFACTURER_ORGANIZATIONS },
  { label: "Manufacturer Applications", href: ROUTES.MANUFACTURER_APPLICATIONS },
  { label: "Manufacturer Consumer Reports", href: ROUTES.MANUFACTURER_CONSUMER_REPORTS },
  { label: "Manufacturer Promotion & Tips", href: ROUTES.MANUFACTURER_PROMOTION_TIPS },
  { label: "Manufacturer Notifications", href: ROUTES.MANUFACTURER_NOTIFICATIONS },
  { label: "Manufacturer QR Code", href: ROUTES.QR_CODE },
  { label: "Manufacturer Product List", href: ROUTES.PRODUCT_LIST },
  { label: "Manufacturer Product Upload", href: ROUTES.PRODUCT_UPLOAD },
  { label: "Manufacturer Login", href: ROUTES.MANUFACTURER_LOGIN },
  { label: "Manufacturer Sign Up", href: ROUTES.MANUFACTURER_SIGNUP },
  { label: "Admin Login", href: ROUTES.ADMIN_LOGIN },
  { label: "Admin Dashboard", href: ROUTES.ADMIN_DASHBOARD },
  { label: "Admin Organizations", href: ROUTES.ADMIN_ORGANIZATIONS },
  { label: "Admin Applications", href: ROUTES.ADMIN_APPLICATIONS },
  { label: "Admin Consumer Reports", href: ROUTES.ADMIN_CONSUMER_REPORTS },
  { label: "Admin Promotion Tips", href: ROUTES.ADMIN_PROMOTION_TIPS },
  { label: "Admin Notifications", href: ROUTES.ADMIN_NOTIFICATIONS },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-brand-nav w-full p-nav relative z-50">
      <div className="flex items-center justify-between h-12">
        <p className="text-white font-bold text-xl">TrustEats Logo</p>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-white/90 text-sm font-medium transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-2 rounded-full bg-white/15 px-2 py-1">
          <Button className="cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium text-white hover:bg-white/10">
            <Link to={ROUTES.LOGIN}>Log In</Link>
          </Button>
          <Button className="cursor-pointer rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-brand-nav hover:bg-white/90">
            <Link to={ROUTES.REGISTER}>Sign Up</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

       {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 bg-[#2E6B3E] w-full p-4 flex flex-col gap-4 shadow-lg">
          <Link to={ROUTES.HOME} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer Home</Link>
          <Link to={ROUTES.SCAN} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer Scan</Link>
          <Link to={ROUTES.HISTORY} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer History</Link>
          <Link to={ROUTES.PROFILE} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer Profile</Link>
          <Link to={ROUTES.NOTIFICATIONS} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer Notifications</Link>
          <Link to={ROUTES.DASHBOARD} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer Dashboard</Link>
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Consumer Forgot Password</Link>
          <Link to={ROUTES.MANUFACTURER_DASHBOARD} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Manufacturer Dashboard</Link>
          <Link to={ROUTES.QR_CODE} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Manufacturer QR Code</Link>
          <Link to={ROUTES.PRODUCT_LIST} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Manufacturer Product List</Link>
          <Link to={ROUTES.PRODUCT_UPLOAD} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Manufacturer Product Upload</Link>
          <Link to={ROUTES.MANUFACTURER_LOGIN} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Manufacturer Login</Link>
          <Link to={ROUTES.MANUFACTURER_SIGNUP} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Manufacturer Sign Up</Link>
          <Link to={ROUTES.ADMIN_LOGIN} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Login</Link>
          <Link to={ROUTES.ADMIN_DASHBOARD} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
          <Link to={ROUTES.ADMIN_ORGANIZATIONS} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Organizations</Link>
          <Link to={ROUTES.ADMIN_APPLICATIONS} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Applications</Link>
          <Link to={ROUTES.ADMIN_CONSUMER_REPORTS} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Consumer Reports</Link>
          <Link to={ROUTES.ADMIN_PROMOTION_TIPS} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Promotion Tips</Link>
          <Link to={ROUTES.ADMIN_NOTIFICATIONS} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Admin Notifications</Link>
          <Link to={ROUTES.REGISTER} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          <Link to={ROUTES.LOGIN} className="text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Log In</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
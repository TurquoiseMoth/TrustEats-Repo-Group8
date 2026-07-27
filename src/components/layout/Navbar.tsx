import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../constants";
import { Button } from "../ui";

const navLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "History", href: ROUTES.HISTORY },
  { label: "Profile", href: ROUTES.PROFILE },
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
          <Link to={ROUTES.HOME} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to={ROUTES.HISTORY} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>History</Link>
          <Link to={ROUTES.PROFILE} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <Link to={ROUTES.REGISTER} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          <Link to={ROUTES.LOGIN} className="text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Log In</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
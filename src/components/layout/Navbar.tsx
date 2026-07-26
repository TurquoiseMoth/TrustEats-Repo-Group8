import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui";

/* 
 * Nav links include all user-facing pages in the app.
 * Parameterised routes (e.g. /verify/:code) are excluded since they
 * require dynamic data and aren't meaningful as static nav targets.
 */
const navLinks = [
    { label: "Home", href: "/" },
    { label: "Scan", href: "/scan" },
    { label: "History", href: "/history" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/analytics" },
    { label: "Profile", href: "/profile" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-brand-nav w-full relative z-50 px-4 md:px-8">
            {/* ── Top bar (always h-12) ─────────────────── */}
            <div className="mx-auto flex h-12 max-w-7xl items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1">
                    <img
                        src="/assets/trusteats-logo.png"
                        alt="TrustEats"
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Centered nav links - desktop only */}
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

                {/* Right side: Auth buttons (desktop) / Hamburger (mobile) */}
                <div className="flex items-center gap-3">
                    {/* Desktop auth buttons in pill container */}
                    <div className="hidden md:flex items-center gap-2 rounded-full bg-white/15 px-2 py-1">
                        <Button className="cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                            <Link to="/login">Log In</Link>
                        </Button>
                        <Button className="cursor-pointer rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-brand-nav transition-colors hover:bg-white/90">
                            <Link to="/register">Sign Up</Link>
                        </Button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="text-white md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu dropdown (overlays page content) ── */}
            {isMenuOpen && (
                <div className="absolute left-0 right-0 top-12 z-50 flex flex-col gap-2 bg-brand-nav px-6 py-4 shadow-lg md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="text-white/90 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-2 flex flex-col gap-2 border-t border-white/20 pt-3">
                        <Button className="cursor-pointer rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                        </Button>
                        <Button className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-nav">
                            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
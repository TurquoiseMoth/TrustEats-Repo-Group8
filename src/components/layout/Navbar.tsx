import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Why Us", href: "/why-us" },
    { label: "FAQ", href: "/faq" },
    { label: "History", href: "/history" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-brand-nav w-full h-12 px-4 md:px-8">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
                {/* Logo */}
                <p className="text-white font-bold text-xl">TrustEats Logo</p>

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

            {/* Mobile menu dropdown */}
            {isMenuOpen && (
                <div className="flex flex-col gap-2 px-2 py-4 md:hidden">
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
                            <Link to="/login">Log In</Link>
                        </Button>
                        <Button className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-nav">
                            <Link to="/register">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
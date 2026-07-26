import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../constants";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-brand-nav w-full p-nav relative z-50">
            <div className="flex items-center justify-between h-12">
                <p className="text-white font-bold text-xl">TrustEats Logo</p>
                <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-full left-0 bg-[#2E6B3E] w-full p-4 flex flex-col gap-4 shadow-lg">
                    <Link to={ROUTES.HOME} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to={ROUTES.REGISTER} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    <Link to={ROUTES.LOGIN} className="text-white font-medium text-lg border-b border-white/20 pb-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
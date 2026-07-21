import { Menu, X } from "lucide-react";
import { useState } from "react";
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-brand-nav w-full h-12 p-nav ">
            <div className="flex items-center justify-between">
                <p className="text-white font-bold text-xl">TrustEats Logo</p>
                <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            {isMenuOpen && (
                <div className="bg-green-400 w-full p-4">
                    {/* Your mobile menu links */}
                </div>
            )}
        </nav>
    )
}

export default Navbar
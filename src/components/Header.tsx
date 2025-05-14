import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { logoutUser } from "../services/authService";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogout = async () => {
        // Clear cookies
        await logoutUser();
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        }
        localStorage.clear();
        
        navigate("/login");
    };

    return (
        <header className="w-[100vw] bg-white text-white p-4 flex justify-between items-center shadow-md border-b border-gray-200">
            <div className="text-xl font-bold">
                <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
            </div>
            <button onClick={toggleMenu} className="md:hidden text-black">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav
                className={`absolute top-24 right-0 z-100 bg-white text-black md:w-fit w-full shadow-lg p-4 space-y-2 md:static md:block md:bg-transparent md:text-white md:shadow-none md:p-0 md:space-y-0 md:flex md:items-center transition-all duration-300 ease-in-out transform
                    ${ menuOpen ? "block" : "hidden" }`}
            >
                <Link to="/" className="block md:mx-4 w-full hover:underline text-black text-center md:w-fit w-full" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link to="/profile" className="block md:mx-4 w-full hover:underline text-black text-center md:w-fit w-full" onClick={() => setMenuOpen(false)}>
                    My Profile
                </Link>
                <Link to="/profile" className="block md:mx-4 w-full hover:underline text-black text-center md:w-fit w-full" onClick={() => setMenuOpen(false)}>
                    Edit Profile
                </Link>
                <button
                    onClick={handleLogout}
                    className="block md:mx-4 hover:underline text-black text-center md:w-fit w-full"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}

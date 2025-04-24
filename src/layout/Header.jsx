import { useEffect, useState } from "react";
import Containers from "../components/Containers";
import clsx from "clsx";

const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#notes", label: "Notes" },
];

const Header = () => {
    const [hash, setHash] = useState(window.location.hash)

    useEffect(() => {
        const updateHash = () => setHash(window.location.hash)
        window.addEventListener("hashchange", updateHash)
        return () => window.removeEventListener("hashchange", updateHash)
    }, [])

    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <Containers className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-bold font-mono text-white">Fuji.dev</a>
        <nav>
            <ul className="flex gap-6 text-sm text-gray-300">
                {navItems.map((item) => (
                <li key={item.href} className="list-none">
                    <a
                    href={item.href}
                    className={clsx(
                        "hover:text-white transition-colors font-mono",
                        hash === item.href && "font-bold text-white"
                    )}
                    >
                    {item.label}
                    </a>
                </li>
                ))}
            </ul>
            </nav>
        </Containers>
        </header>
    );
};

export default Header;

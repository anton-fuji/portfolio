import Containers from "../components/Containers";

const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#notes", label: "Notes" },
];

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <Containers className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-bold text-white">fujiji.dev</a>
            <nav>
            <ul className="flex gap-6 text-sm text-gray-300">
                {navItems.map((item) => (
                <li key={item.href} className="list-none">
                    <a href={item.href} className="hover:text-white transition-colors">
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

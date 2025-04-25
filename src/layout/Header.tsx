import {Moon, Sun} from 'lucide-react'
import Containers from '../components/Containers';
import { useDarkMode } from '../hooks/useDarkMode';

interface navItem {
    name: string;
    href: string;
}

const navItems: navItem[] = [
    { name: 'About', href: '/'},
    { name: 'Project', href: '/projects'},
    { name: 'Notes', href: '/notes'},
]

const Header: React.FC = () => {
const { isDarkMode, toggleDarkMode } = useDarkMode();

return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <Containers className="flex items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
            Fuji
        </a>
        <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
            <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
                {link.name}
            </a>
        ))}
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            aria-label="Dark Mode"
        >
            {isDarkMode ? (
                <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            )}
            </button>
        </nav>
        </Containers>
    </header>
);
}

export default Header;
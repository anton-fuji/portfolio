import React from "react";
import { PERSONAL_INFO } from "../mydata/data";

const Header: React.FC = () =>{
    const navLinks = [
        {name: "Home", href: '/'},
        {name: "About", href: '/about'},
        {name: "Project", href: '/project'},
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900/20">
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <a href="/" className="text-2xl font-semibold text-white">
                    {PERSONAL_INFO.name}
                </a>

                <nav className="flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    )
};

export default Header;



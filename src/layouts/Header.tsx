import { usePageContext } from 'vike-react/usePageContext';
import { PERSONAL_INFO } from '../mydata/data';

const navLinks = [
        {name: "Home", href: '/'},
        {name: "Articles", href: '/articles'},
        {name: "Projects", href: '/projects'},
]

export default function Header() {
    const pageContext = usePageContext();
    const { urlPathname } = pageContext;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b dark:border-gray-800 dark:bg-gray-900/20 py-6">
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <a href="/" className="text-2xl font-semibold text-white">
                    {PERSONAL_INFO.name}
                </a>

                <nav className="flex items-center space-x-8">
                    {navLinks.map(( {name, href} ) => {
                        const isActive = 
                            href === '/'
                                ? urlPathname === '/'
                                : urlPathname.startsWith(href)
                        return (
                            <a key={name} href={href} className={`font-sans text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 hover:scale-105 focus:scale-105
                                ${isActive ? 'font-bold text-white underline underline-offset-4' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                                {name}
                            </a>
                        )
                        
                    })}
                </nav>
            </div>
        </header>
    )
}

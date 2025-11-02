import { usePageContext } from "vike-react/usePageContext";
import { PERSONAL_INFO } from "../mydata/data";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/articles" },
  { name: "Projects", href: "/projects" },
  { name: "Certs", href: "/certifications" },
];

export default function Header() {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 py-4 md:py-6 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "border-b border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-12">
          <a
            href="/"
            className="text-xl md:text-2xl font-semibold text-white z-50 relative"
          >
            {PERSONAL_INFO.name}
          </a>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map(({ name, href }) => {
              const isActive =
                href === "/"
                  ? urlPathname === "/"
                  : urlPathname.startsWith(href);
              return (
                <a
                  key={name}
                  href={href}
                  className={`relative font-sans transition-all duration-300 hover:scale-105 group ${
                    isActive ? "font-bold text-white" : "text-gray-400"
                  }`}
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="md:hidden z-60 relative text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-400 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-blue-700/5 backdrop-blur-xl" />
        <nav className="relative h-full flex flex-col items-center justify-center space-y-12 px-8">
          {navLinks.map(({ name, href }) => {
            const isActive =
              href === "/" ? urlPathname === "/" : urlPathname.startsWith(href);
            return (
              <a
                key={name}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-sans transition-all duration-200 ${
                  isActive
                    ? "font-bold text-white scale-105"
                    : "text-slate-700 hover:text-white hover:scale-100"
                }`}
              >
                {name}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}

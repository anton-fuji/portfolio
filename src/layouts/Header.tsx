import { usePageContext } from "vike-react/usePageContext";
import { PERSONAL_INFO } from "../mydata/data";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/articles" },
  { name: "Projects", href: "/projects" },
  { name: "Certs", href: "/certifications"}
];

export default function Header() {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 30)

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setIsVisible(false);
    }  else {
      setIsVisible(true)
    }

    setLastScrollY(currentScrollY);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 py-6 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "border-b border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        <a href="/" className="text-2xl font-semibold text-white">
          {PERSONAL_INFO.name}
        </a>

        <nav className="flex items-center space-x-8">
          {navLinks.map(({ name, href }) => {
            const isActive =
              href === "/" ? urlPathname === "/" : urlPathname.startsWith(href);
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
      </div>
    </header>
  );
}

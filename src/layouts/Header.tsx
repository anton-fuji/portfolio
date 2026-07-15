import { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Languages, Menu, X } from "lucide-react";
import { useTranslation } from "../i18n";
import { PERSONAL_INFO } from "../mydata/data";

const navLinks = [
  { key: "home", href: "/" },
  { key: "articles", href: "/articles" },
  { key: "projects", href: "/projects" },
  { key: "certs", href: "/certifications" },
] as const;

function LanguageToggle() {
  const { language, toggleLanguage, t } = useTranslation();
  const nextLanguage = language === "ja" ? "EN" : "JA";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.languageToggleLabel}
      title={t.languageToggleLabel}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 text-xs font-semibold text-white/78 transition hover:border-cyan-200/35 hover:bg-cyan-300/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span>{nextLanguage}</span>
    </button>
  );
}

export default function Header() {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const { t } = useTranslation();
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
        className={`fixed top-0 right-0 left-0 z-50 py-4 transition-all duration-500 ease-out md:py-6 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "border-white/10 border-b bg-black/40 shadow-2xl backdrop-blur-2xl"
            : "border-transparent border-b bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-12">
          <a
            href="/"
            className="relative z-50 text-xl font-semibold text-white md:text-2xl"
          >
            {PERSONAL_INFO.url}
          </a>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map(({ key, href }) => {
                const isActive =
                  href === "/"
                    ? urlPathname === "/"
                    : urlPathname.startsWith(href);
                return (
                  <a
                    key={key}
                    href={href}
                    className={`group relative font-sans transition-all duration-300 hover:scale-105 ${
                      isActive ? "font-bold text-white" : "text-gray-400"
                    }`}
                  >
                    {t.nav[key]}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              })}
            </nav>
            <LanguageToggle />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="relative z-60 p-2 text-white transition-colors hover:text-gray-300 md:hidden"
            aria-label={isMobileMenuOpen ? t.menu.close : t.menu.open}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-all duration-400 md:hidden ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-blue-700/5 backdrop-blur-xl" />
        <nav className="relative flex h-full flex-col items-center justify-center space-y-10 px-8">
          {navLinks.map(({ key, href }) => {
            const isActive =
              href === "/" ? urlPathname === "/" : urlPathname.startsWith(href);
            return (
              <a
                key={key}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-sans text-3xl transition-all duration-200 ${
                  isActive
                    ? "scale-105 font-bold text-white"
                    : "text-slate-700 hover:scale-100 hover:text-white"
                }`}
              >
                {t.nav[key]}
              </a>
            );
          })}
          <div className="pt-2">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </>
  );
}

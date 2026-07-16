import { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Languages } from "lucide-react";
import LineSidebar from "../components/LineSidebar";
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
  const activeNavIndex = navLinks.findIndex(({ href }) =>
    href === "/" ? urlPathname === "/" : urlPathname.startsWith(href),
  );
  const mobileNavItems = navLinks.map(({ key }) => t.nav[key]);

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
    if (!isMobileMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
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

          <div className="desktop-header-nav items-center gap-4">
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
            <div className="lg:ml-5">
              <LanguageToggle />
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className={`mobile-line-menu-button relative z-[60] ${
              isMobileMenuOpen ? "is-open" : ""
            }`}
            aria-label={isMobileMenuOpen ? t.menu.close : t.menu.open}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-line-sidebar"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-line-overlay fixed inset-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label={t.menu.close}
          className="mobile-line-backdrop absolute inset-0"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <aside
          id="mobile-line-sidebar"
          className={`mobile-line-sidebar absolute top-0 right-0 h-full w-[min(360px,92vw)] ${
            isMobileMenuOpen ? "is-open" : ""
          }`}
        >
          <div className="flex h-full flex-col px-6 pt-26 pb-8">
            <LineSidebar
              items={mobileNavItems}
              defaultActive={activeNavIndex >= 0 ? activeNavIndex : null}
              accentColor="#8fb4ff"
              textColor="rgba(203, 213, 225, 0.72)"
              markerColor="rgba(100, 116, 139, 0.5)"
              markerLength={72}
              markerGap={12}
              itemGap={28}
              fontSize={1.3}
              maxShift={18}
              proximityRadius={104}
              className="mobile-line-sidebar-nav flex-1 items-center"
              onItemClick={(index) => {
                const href = navLinks[index]?.href;
                if (!href) {
                  return;
                }
                setIsMobileMenuOpen(false);
                if (href !== urlPathname) {
                  window.location.href = href;
                }
              }}
            />

            <div className="border-white/10 border-t pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-slate-400/58 uppercase">
                  Language
                </span>
                <LanguageToggle />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

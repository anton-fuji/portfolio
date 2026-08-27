import { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import LineSidebar from "../components/LineSidebar";
import { useTranslation } from "../i18n";
import { PERSONAL_INFO } from "../mydata/data";

type NavLink = {
  key: "home" | "articles" | "blog" | "projects" | "certs";
  href: string;
  external?: boolean;
};

const navLinks: readonly NavLink[] = [
  { key: "home", href: "/" },
  { key: "articles", href: "/articles" },
  { key: "blog", href: "https://fuji-blog.netlify.app/", external: true },
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
      data-language={language}
      aria-label={`${t.languageToggleLabel}: ${language.toUpperCase()}`}
      title={t.languageToggleLabel}
      className="language-toggle"
    >
      <span className="language-toggle__label">lang</span>
      <span className="language-toggle__value">{language.toUpperCase()}</span>
      <span aria-hidden="true" className="language-toggle__next">
        -&gt; {nextLanguage}
      </span>
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
        className={`fixed top-0 right-0 left-0 py-4 transition-all duration-500 ease-out md:py-6 ${
          isMobileMenuOpen ? "z-70" : "z-50"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"} ${
          isScrolled
            ? "border-white/10 border-b bg-black/40 shadow-2xl backdrop-blur-2xl"
            : "border-transparent border-b bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-12">
          <a href="/" className="relative z-50 text-xl font-semibold text-white md:text-2xl">
            {PERSONAL_INFO.url}
          </a>

          <div className="desktop-header-nav items-center gap-5">
            <nav className="flex items-center gap-5 lg:gap-7">
              {navLinks.map(({ key, href, external }) => {
                const isActive = href === "/" ? urlPathname === "/" : urlPathname.startsWith(href);
                return (
                  <a
                    key={key}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`group inline-flex items-center gap-1 font-mono text-[0.78rem] tracking-[0.08em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                      isActive
                        ? "text-cyan-200 hover:text-cyan-100"
                        : "text-slate-300/82 hover:text-cyan-100"
                    }`}
                  >
                    {isActive && (
                      <span className="text-cyan-200" aria-hidden="true">
                        &gt;
                      </span>
                    )}
                    {t.nav[key]}
                    {external && (
                      <span
                        className="text-[0.7rem] text-current opacity-65 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    )}
                    {isActive && (
                      <span className="h-3 w-px animate-pulse bg-cyan-100" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
            </nav>
            <div className="border-white/10 border-l pl-4">
              <LanguageToggle />
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className={`mobile-line-menu-button relative z-60 ${isMobileMenuOpen ? "is-open" : ""}`}
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
          isMobileMenuOpen
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
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
              itemHrefs={navLinks.map(({ href }) => href)}
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
                const link = navLinks[index];
                if (!link) {
                  return;
                }
                setIsMobileMenuOpen(false);
                if (link.external) {
                  window.open(link.href, "_blank", "noopener,noreferrer");
                } else if (link.href !== urlPathname) {
                  window.location.href = link.href;
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

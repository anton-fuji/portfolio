import { Github } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import gopherGif from "../assets/gopher.gif";
import { useTranslation } from "../i18n";
import { getSocialUrl, PERSONAL_INFO } from "../mydata/data";

const githubUrl = getSocialUrl("GitHub");
const startYear = 2025;
const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);
  const [isGopherPeeking, setIsGopherPeeking] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGopherPeeking(entry?.isIntersecting ?? false);
      },
      { threshold: 0.6 },
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 bg-black/50 py-8 text-gray-400">
      <div
        aria-hidden="true"
        className="group/gopher absolute right-6 bottom-full h-16 w-16 overflow-hidden md:right-12"
      >
        <img
          src={gopherGif}
          alt=""
          className={`h-16 w-16 [image-rendering:pixelated] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/gopher:translate-y-0 motion-reduce:transition-none ${
            isGopherPeeking ? "translate-y-[38%]" : "translate-y-full"
          }`}
        />
      </div>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p>
            &copy; {startYear}
            {currentYear > startYear ? `–${currentYear}` : ""} {PERSONAL_INFO.name}
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Github size={20} className="mr-2" />
            <span>{t.footer.github}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

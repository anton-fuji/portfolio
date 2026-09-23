import { Github } from "lucide-react";
import type React from "react";

import { useTranslation } from "../i18n";
import { getSocialUrl, PERSONAL_INFO } from "../mydata/data";

const githubUrl = getSocialUrl("GitHub");
const startYear = 2025;
const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 bg-black/50 py-8 text-gray-400">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-gray-600 dark:text-gray-400">
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

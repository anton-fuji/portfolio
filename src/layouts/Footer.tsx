import type React from "react";
import { getSocialUrl, PERSONAL_INFO } from "../mydata/data";
import { Github } from "lucide-react";
import { useTranslation } from "../i18n";

const githubUrl = getSocialUrl("GitHub");

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 bg-black/50 py-8 text-gray-400">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; 2025 {PERSONAL_INFO.name}
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
      </div>
    </footer>
  );
};

export default Footer;

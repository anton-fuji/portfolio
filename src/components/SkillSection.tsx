import type { FC } from "react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiClaude,
  SiDocker,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiLinux,
  SiNeovim,
  SiNixos,
  SiPostgresql,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTerraform,
  SiTurso,
  SiTypescript,
  SiVite,
} from "react-icons/si";

import { useTranslation } from "../i18n";
import { CERTIFICATIONS } from "../mydata/certifications";
import { SKILL_LAYERS } from "../mydata/data";
import type { TechName } from "../types";

const techIcons = {
  Go: SiGo,
  Rust: SiRust,
  Nix: SiNixos,
  Linux: SiLinux,
  Neovim: SiNeovim,
  "Claude Code": SiClaude,
  Codex: RiOpenaiFill,
  PostgreSQL: SiPostgresql,
  GCP: SiGooglecloud,
  AWS: FaAws,
  Turso: SiTurso,
  Terraform: SiTerraform,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Vite: SiVite,
} satisfies Record<TechName, IconType>;

const googleCloudBadges = CERTIFICATIONS.filter(
  (cert) => cert.organization === "Google Cloud" && cert.imageUrl,
);

const SkillSection: FC = () => {
  const { t, text } = useTranslation();

  return (
    <section aria-labelledby="skills-title" className="px-4 sm:px-8 lg:px-10">
      <h2
        id="skills-title"
        className="text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-[-0.04em] text-face"
      >
        {t.home.stackTitle}
      </h2>

      <dl className="mt-10 border-t border-face/12">
        {SKILL_LAYERS.map((layer) => (
          <div
            key={layer.name}
            className="grid gap-3 border-b border-face/12 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center sm:gap-8"
          >
            <dt className="text-sm font-medium text-face/45">{layer.name}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {layer.skills.map((tech) => {
                  const TechIcon = techIcons[tech];
                  return (
                    <li
                      key={tech}
                      className="inline-flex items-center gap-2.5 text-lg font-normal tracking-[-0.01em] text-face sm:text-xl"
                    >
                      <TechIcon className="h-5 w-5 shrink-0 text-face/60" aria-hidden="true" />
                      {tech}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <a
        href="/certifications"
        aria-label={t.home.certsTitle}
        className="group mt-10 flex w-fit rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
      >
        <span className="flex items-center gap-5">
          <span className="flex -space-x-3">
            {googleCloudBadges.map((cert) => (
              <img
                key={cert.date}
                src={cert.imageUrl}
                alt={text(cert.name)}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full bg-ink object-contain ring-4 ring-ink sm:h-14 sm:w-14"
              />
            ))}
          </span>
          <span className="text-base font-semibold tracking-[-0.01em] text-face transition-colors group-hover:text-blush">
            {t.home.certsTitle}
          </span>
        </span>
      </a>
    </section>
  );
};

export default SkillSection;

import { useEffect, useState, type FC } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaAws } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiLinux,
  SiNeovim,
  SiNixos,
  SiNote,
  SiPostgresql,
  SiQiita,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVite,
  SiVim,
  SiZenn,
} from "react-icons/si";
import { ENGINEERING_SURFACES } from "../mydata/data";
import { useTranslation } from "../i18n";
import type { TechName } from "../types";
import { twMerge } from "tailwind-merge";

const techIcons = {
  Go: SiGo,
  Rust: SiRust,
  Nix: SiNixos,
  Linux: SiLinux,
  Vim: SiVim,
  Neovim: SiNeovim,
  PostgreSQL: SiPostgresql,
  GCP: SiGooglecloud,
  AWS: FaAws,
  Terraform: SiTerraform,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Vite: SiVite,
  Zenn: SiZenn,
  Qiita: SiQiita,
  Note: SiNote,
} satisfies Record<TechName, IconType>;

const timelineCycleMs = 28000;

const SkillSection: FC = () => {
  const { t, text } = useTranslation();
  const [globeSurfaceIndex, setGlobeSurfaceIndex] = useState(0);
  const [hoveredSurfaceIndex, setHoveredSurfaceIndex] = useState<number | null>(
    null,
  );
  const activeSurfaceIndex = hoveredSurfaceIndex ?? globeSurfaceIndex;

  useEffect(() => {
    const startedAt = window.performance.now();
    const segmentMs = timelineCycleMs / ENGINEERING_SURFACES.length;

    const intervalId = window.setInterval(() => {
      const elapsed = (window.performance.now() - startedAt) % timelineCycleMs;
      const nextIndex = Math.min(
        ENGINEERING_SURFACES.length - 1,
        Math.floor(elapsed / segmentMs),
      );
      setGlobeSurfaceIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    }, 200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 px-1 sm:px-2 lg:px-0">
          <p className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-sky-100/45">
            <span className="h-px w-8 bg-gradient-to-r from-cyan-200/55 to-transparent" />
            <span>~/stack</span>
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] text-white sm:text-5xl lg:text-6xl">
                {t.home.stackTitle}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/74 sm:text-lg">
                {t.home.stackSummary}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48">
                {t.home.stackNote}
              </p>
            </div>

            <a
              href="/projects"
              className="group relative inline-flex h-12 w-full items-center justify-between overflow-hidden rounded-md border border-blue-300/12 bg-white/[0.025] px-4 text-sm font-semibold text-sky-50/80 transition hover:border-cyan-200/28 hover:bg-cyan-300/[0.06] hover:text-white lg:justify-self-end"
            >
              <span className="pointer-events-none absolute inset-y-3 left-0 w-px bg-gradient-to-b from-cyan-200/0 via-cyan-200/70 to-cyan-200/0 opacity-70 transition group-hover:opacity-100" />
              <span className="relative">{t.home.stackCta}</span>
              <span className="relative grid h-7 w-7 place-items-center rounded-full border border-cyan-200/14 bg-cyan-300/[0.055] text-cyan-100/78 transition group-hover:border-cyan-200/35 group-hover:bg-cyan-300/[0.12] group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-md border border-blue-300/8 bg-[#020711]/36 text-white shadow-[0_20px_70px_-66px_rgba(56,189,248,0.45)] ring-1 ring-white/[0.015] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.032)_1px,transparent_1px)] bg-[size:48px_48px] opacity-14" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent" />

        <div className="relative px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute top-10 bottom-10 left-7 w-px bg-blue-300/8 sm:left-10 lg:left-12">
            <div
              className="skill-timeline-fill absolute top-0 left-0 w-px"
            />
            <div
              className="skill-timeline-gradient absolute -left-px w-[3px]"
            />
          </div>

          <div className="grid pl-8 sm:pl-10">
            {ENGINEERING_SURFACES.map((surface, index) => {
              const isActive = activeSurfaceIndex === index;

              return (
                <article
                  key={surface.id}
                  aria-label={text(surface.title)}
                  onMouseEnter={() => setHoveredSurfaceIndex(index)}
                  onMouseLeave={() => setHoveredSurfaceIndex(null)}
                  onFocusCapture={() => setHoveredSurfaceIndex(index)}
                  onBlurCapture={(event) => {
                    const nextFocusedElement = event.relatedTarget;
                    if (
                      !(
                        nextFocusedElement instanceof Node &&
                        event.currentTarget.contains(nextFocusedElement)
                      )
                    ) {
                      setHoveredSurfaceIndex(null);
                    }
                  }}
                  className={twMerge(
                    "group relative overflow-hidden border-blue-300/8 border-b px-2 py-6 transition duration-500 last:border-b-0 hover:bg-cyan-300/[0.025] sm:px-4 lg:px-5",
                    isActive && "bg-cyan-300/[0.035]",
                  )}
                >
                  <div
                    className={twMerge(
                      "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(125,211,252,0.055),transparent_44%)] opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100",
                      isActive && "opacity-100",
                    )}
                  />

                  <div className="relative grid gap-4 lg:grid-cols-[9.5rem_minmax(0,1fr)]">
                    <div className="flex items-center justify-between gap-3 lg:block">
                      <p
                        className={twMerge(
                          "font-mono text-[0.68rem] text-sky-100/32 transition group-hover:text-cyan-100/62 lg:block",
                          isActive && "text-cyan-100/62",
                        )}
                      >
                        {surface.verb}
                      </p>
                    </div>

                    <div>
                      <div
                        className={twMerge(
                          "mb-4 h-px w-14 bg-gradient-to-r opacity-45 transition group-hover:w-20 group-hover:opacity-80",
                          surface.accent,
                          isActive && "w-20 opacity-80",
                        )}
                      />
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                        <div>
                          <h3
                            className={twMerge(
                              "text-2xl font-semibold leading-tight text-white/70 transition group-hover:text-white/92",
                              isActive && "text-white/92",
                            )}
                          >
                            {text(surface.title)}
                          </h3>

                          <div
                            className={twMerge(
                              "mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-72 group-hover:opacity-100 group-focus-within:mt-4 group-focus-within:max-h-72 group-focus-within:opacity-100",
                              isActive && "mt-4 max-h-72 opacity-100",
                            )}
                          >
                            <p className="max-w-2xl text-sm leading-6 text-white/58">
                              {text(surface.description)}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] text-sky-100/48">
                              <span className="text-cyan-100/62">
                                {surface.id === "technical-writing"
                                  ? "platforms:"
                                  : "stack:"}
                              </span>
                              {surface.stack.map((tech) => {
                                const TechIcon = techIcons[tech];
                                return (
                                  <span
                                    key={tech}
                                    className="inline-flex items-center gap-1.5"
                                  >
                                    <TechIcon className="h-3.5 w-3.5 shrink-0 text-sky-100/52" />
                                    <span>{tech}</span>
                                  </span>
                                );
                              })}
                            </div>

                            <div className="mt-5 grid gap-2">
                              {surface.signals.slice(0, 3).map((signal) => (
                                <div
                                  key={text(signal)}
                                  className="flex items-start gap-2 text-xs leading-5 text-white/48"
                                >
                                  <span
                                    className={twMerge(
                                      "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r",
                                      surface.accent,
                                    )}
                                  />
                                  <span>{text(signal)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={twMerge(
                          "mt-0 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-5 group-hover:max-h-24 group-hover:opacity-100 group-focus-within:mt-5 group-focus-within:max-h-24 group-focus-within:opacity-100",
                          isActive && "mt-5 max-h-24 opacity-100",
                        )}
                      >
                        {surface.proofs.map((proof) =>
                          proof.href ? (
                            <a
                              key={text(proof.label)}
                              href={proof.href}
                              className="inline-flex items-center gap-1.5 rounded-md border border-blue-300/15 bg-blue-400/[0.08] px-3 py-1.5 text-xs font-semibold text-sky-100/76 transition hover:border-cyan-200/30 hover:bg-blue-400/[0.14] hover:text-white"
                            >
                              <span>{text(proof.label)}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <span
                              key={text(proof.label)}
                              className="inline-flex rounded-md border border-blue-300/10 px-3 py-1.5 text-xs font-medium text-sky-100/45"
                            >
                              {text(proof.label)}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default SkillSection;

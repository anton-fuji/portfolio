import type { FC } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaAws } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiLinux,
  SiNeovim,
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
  SiZig,
} from "react-icons/si";
import { ENGINEERING_SURFACES } from "../mydata/data";
import type { TechName } from "../types";
import { twMerge } from "tailwind-merge";

const techIcons = {
  Go: SiGo,
  Rust: SiRust,
  Zig: SiZig,
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
  Vike: SiVite,
  Zenn: SiZenn,
  Qiita: SiQiita,
} satisfies Record<TechName, IconType>;

const featuredStack = [
  "Go",
  "TypeScript",
  "Terraform",
  "Docker",
  "GCP",
  "AWS",
  "PostgreSQL",
  "Neovim",
] satisfies TechName[];

const SkillSection: FC = () => (
  <section className="px-6 py-20 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase text-sky-200/70">
            ~/stack
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            My Tech Stack
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-blue-300/15 bg-[#020711]/80 shadow-2xl shadow-blue-950/25 ring-1 ring-white/[0.025] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-300/15 to-transparent" />

        <div className="relative grid gap-5 border-b border-blue-300/15 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium text-white/86">
              Mostly backend, infra, PostgreSQL, and terminal-heavy workflows.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/52">
              Frontend when needed. Notes when something hurts enough to
              remember.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-2 lg:w-[22rem]">
            {featuredStack.map((tech) => {
              const Icon = techIcons[tech];
              return (
                <div
                  key={tech}
                  className="flex aspect-square items-center justify-center rounded-lg border border-blue-300/15 bg-blue-950/25 text-sky-100/82 shadow-inner shadow-sky-100/5"
                  title={tech}
                >
                  <Icon className="h-5 w-5" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-8 bottom-8 left-[1.5rem] w-px bg-gradient-to-b from-cyan-200/0 via-cyan-200/25 to-cyan-200/0 sm:left-[7.25rem]" />

        {ENGINEERING_SURFACES.map((surface) => {
          return (
            <article
              key={surface.id}
              className="group relative grid gap-5 border-t border-blue-300/12 px-5 py-6 first:border-t-0 sm:grid-cols-[7rem_1fr] sm:px-6 lg:grid-cols-[8rem_minmax(0,1fr)_18rem]"
            >
              <div>
                <span className="block font-mono text-[0.68rem] leading-5 text-sky-100/58 sm:max-w-[6.5rem]">
                  {surface.verb}
                </span>
              </div>

              <div>
                <div
                  className={twMerge(
                    "mb-4 h-px w-20 bg-gradient-to-r",
                    surface.accent,
                  )}
                />
                <h3 className="text-2xl font-semibold text-white">
                  {surface.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/64">
                  {surface.description}
                </p>

                <div className="mt-5 grid gap-2">
                  {surface.signals.map((signal) => (
                    <div
                      key={signal}
                      className="flex items-start gap-2 text-sm text-white/58"
                    >
                      <span
                        className={twMerge(
                          "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r",
                          surface.accent,
                        )}
                      />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-start-2 lg:col-start-auto">
                <div className="grid grid-cols-2 gap-2">
                  {surface.stack.map((tech) => {
                    const TechIcon = techIcons[tech];
                    return (
                      <div
                        key={tech}
                        className="flex min-h-10 items-center gap-2 rounded-lg border border-blue-300/12 bg-blue-950/20 px-3 text-xs font-medium text-sky-50/76"
                      >
                        <TechIcon className="h-4 w-4 shrink-0 text-sky-100/82" />
                        <span className="truncate">{tech}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {surface.proofs.map((proof) =>
                    proof.href ? (
                      <a
                        key={proof.label}
                        href={proof.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/15 px-3 py-1.5 text-xs font-medium text-sky-100/72 transition hover:border-cyan-200/30 hover:bg-blue-400/[0.08] hover:text-white"
                      >
                        <span>{proof.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span
                        key={proof.label}
                        className="inline-flex rounded-full border border-blue-300/10 bg-blue-950/15 px-3 py-1.5 text-xs font-medium text-sky-100/45"
                      >
                        {proof.label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </article>
          );
        })}
        </div>
      </div>
    </div>
  </section>
);

export default SkillSection;

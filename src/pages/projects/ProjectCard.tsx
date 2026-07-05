import type { FC } from "react";
import {
  ArrowUpRight,
  Github,
  Package,
  TerminalSquare,
  Users,
} from "lucide-react";
import type { Project } from "./Projects";

export type ProjectCardProps = {
  project: Project;
  accent: string;
  index: number;
};

const getRepoPath = (url: string) => {
  try {
    const { pathname } = new URL(url);
    return pathname.replace(/^\/|\/$/g, "");
  } catch {
    return url;
  }
};

const getKindIcon = (kind: Project["kind"]) => {
  if (kind === "Team Project") return <Users className="h-3.5 w-3.5" />;
  if (kind === "CLI Tool") return <TerminalSquare className="h-3.5 w-3.5" />;
  return <Package className="h-3.5 w-3.5" />;
};

const ProjectCard: FC<ProjectCardProps> = ({ project, accent, index }) => {
  const repoPath = getRepoPath(project.githuburl);
  const pid = 1001 + index;

  return (
    <a
      href={project.githuburl}
      rel="noopener noreferrer"
      target="_blank"
      className="group relative grid gap-3 bg-white/[0.012] px-4 py-4 font-mono text-xs transition-colors hover:bg-sky-300/[0.065] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 sm:grid-cols-[4.5rem_minmax(0,1.35fr)_8.5rem_minmax(0,1fr)_2rem] sm:items-center"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/[0.035] via-transparent to-sky-300/[0.03] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className={`absolute inset-y-3 left-0 w-px bg-linear-to-b ${accent} opacity-0 transition-opacity group-hover:opacity-100`}
      />

      <div className="flex items-center gap-2 text-sky-300/80">
        <span>{pid}</span>
        <span className="text-slate-600">run</span>
      </div>

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <Github className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-sky-200" />
          <span className="truncate text-sm font-semibold text-white">
            {project.name}
          </span>
        </div>
        <p className="mt-1 truncate text-slate-500">{repoPath}</p>
        <p className="mt-2 text-[11px] leading-5 text-slate-400 sm:hidden">
          {project.description}
        </p>
      </div>

      <div className="relative inline-flex w-fit items-center gap-1.5 rounded border border-sky-300/14 bg-sky-300/[0.055] px-2 py-1 text-[11px] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
        {getKindIcon(project.kind)}
        <span>{project.kind}</span>
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-slate-400">{project.description}</p>
        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-sky-200/55">
          {project.tags.map((tag) => (
            <span key={tag}>--{tag}</span>
          ))}
        </div>
      </div>

      <ArrowUpRight className="hidden h-4 w-4 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-200 sm:block" />
    </a>
  );
};

export default ProjectCard;

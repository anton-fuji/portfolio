import type { FC } from "react";
import {
  ArrowUpRight,
  Github,
  Package,
  TerminalSquare,
  Users,
} from "lucide-react";
import { useTranslation } from "../../i18n";
import type { Project } from "./Projects";

export type ProjectProcessRowProps = {
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

const getCommandName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getKindIcon = (kind: Project["kind"]) => {
  if (kind === "Team Project") return <Users className="h-3.5 w-3.5" />;
  if (kind === "CLI Tool") return <TerminalSquare className="h-3.5 w-3.5" />;
  return <Package className="h-3.5 w-3.5" />;
};

const ProjectProcessRow: FC<ProjectProcessRowProps> = ({
  project,
  accent,
  index,
}) => {
  const repoPath = getRepoPath(project.githuburl);
  const pid = 1001 + index;
  const state = project.status ?? "active";
  const commandName = getCommandName(project.name);
  const { t, text } = useTranslation();

  return (
    <a
      href={project.githuburl}
      rel="noopener noreferrer"
      target="_blank"
      className="project-process-row group relative grid gap-2 px-4 py-3 font-mono text-xs transition-colors hover:bg-sky-300/6.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 sm:grid-cols-[4.2rem_5.7rem_minmax(0,1.08fr)_8.4rem_minmax(0,1fr)_2rem] sm:items-center"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/[0.035] via-transparent to-sky-300/3 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className={`absolute inset-y-3 left-0 w-px bg-linear-to-b ${accent} opacity-0 transition-opacity group-hover:opacity-100`}
      />

      <span className="project-process-pid">{pid}</span>
      <span className="project-process-state">{state}</span>

      <div className="project-process-command min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <Github className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-sky-200" />
          <span className="truncate text-sm font-semibold text-white">
            ./run {commandName}
          </span>
        </div>
        <p className="project-process-repo mt-1 truncate">{repoPath}</p>
      </div>

      <div className="project-process-kind relative inline-flex w-fit items-center gap-1.5 text-[11px] text-slate-300">
        {getKindIcon(project.kind)}
        <span>{t.projects.kinds[project.kind]}</span>
      </div>

      <div className="project-process-output min-w-0">
        <p className="truncate text-slate-400">{text(project.description)}</p>
        <div className="project-process-tags mt-1 hidden flex-wrap gap-x-2 gap-y-1 text-[10px] sm:flex">
          {project.tags.map((tag) => (
            <span key={tag}>--{tag}</span>
          ))}
        </div>
      </div>

      <ArrowUpRight className="hidden h-4 w-4 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-200 sm:block" />
    </a>
  );
};

export default ProjectProcessRow;

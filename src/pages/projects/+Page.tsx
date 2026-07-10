import BackgroundGlobe from "../../components/BackgroundGlobe";
import ProjectCard from "./ProjectCard";
import projectGroups from "./Projects";

export { Page };

function Page() {
  const projectOffsets = new Map<string, number>();
  let projectOffset = 0;

  for (const group of projectGroups) {
    projectOffsets.set(group.slug, projectOffset);
    projectOffset += group.projects.length;
  }

  return (
    <>
      <BackgroundGlobe />
      <div className="px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-14">
          <header className="relative overflow-hidden rounded-lg border border-sky-300/16 bg-black/42 shadow-[0_0_46px_-26px_rgba(56,189,248,0.78)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_32%,transparent_72%)]" />
            <div className="pointer-events-none absolute inset-px rounded-lg border border-white/[0.035]" />
            <div className="relative flex items-center gap-2 border-sky-300/10 border-b bg-[linear-gradient(90deg,rgba(2,6,23,0.84),rgba(15,23,42,0.76),rgba(2,6,23,0.82))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300/80" />
              <span className="ml-3 truncate bg-linear-to-r from-slate-500 via-sky-500/58 to-slate-400 bg-clip-text font-mono text-xs font-medium text-transparent drop-shadow-[0_0_8px_rgba(2,6,23,0.85)]">
                /var/log/fuji/projects.log
              </span>
            </div>

            <div className="relative px-4 py-6 font-mono text-[12px] leading-6 text-slate-300 sm:px-6 sm:py-8 sm:text-sm">
              <div className="mb-6">
                <p
                  className="project-terminal-row"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="text-sky-300">(*'-') &gt;</span>{" "}
                  <span
                    className="project-terminal-command text-slate-100"
                    style={{ animationDelay: "0.46s" }}
                  >
                    whoami
                  </span>
                </p>
                <p
                  className="project-terminal-row pl-4 text-slate-400"
                  style={{ animationDelay: "1.32s" }}
                >
                  fuji
                </p>
              </div>

              <div className="mb-6">
                <p
                  className="project-terminal-row"
                  style={{ animationDelay: "1.72s" }}
                >
                  <span className="text-sky-300">(*'-') &gt;</span>{" "}
                  <span
                    className="project-terminal-command text-slate-100"
                    style={{ animationDelay: "1.98s" }}
                  >
                    which editor
                  </span>
                </p>
                <p
                  className="project-terminal-row pl-4 text-slate-400"
                  style={{ animationDelay: "2.92s" }}
                >
                  /usr/bin/nvim
                </p>
              </div>

              <div className="mb-6 overflow-x-auto">
                <p
                  className="project-terminal-row"
                  style={{ animationDelay: "3.32s" }}
                >
                  <span className="text-rose-300">(*;-;) &gt;</span>{" "}
                  <span
                    className="project-terminal-command text-slate-100"
                    style={{ animationDelay: "3.58s" }}
                  >
                    ps aux | grep projects
                  </span>
                </p>
                <pre className="mt-2 min-w-150 text-slate-400">
                  <span
                    className="project-terminal-row block"
                    style={{ animationDelay: "4.72s" }}
                  >
                    USER   PID    %CPU  %MEM  COMMAND
                  </span>
                  <span
                    className="project-terminal-row block"
                    style={{ animationDelay: "4.94s" }}
                  >
                    fuji   1001   12.4   0.3   go          CLI tools and backend
                    services
                  </span>
                  <span
                    className="project-terminal-row block"
                    style={{ animationDelay: "5.16s" }}
                  >
                    fuji   1002    9.1   0.2   typescript  portfolio and static
                    frontend
                  </span>
                  <span
                    className="project-terminal-row block"
                    style={{ animationDelay: "5.38s" }}
                  >
                    fuji   1003    7.7   0.1   lua         neovim configuration
                  </span>
                  <span
                    className="project-terminal-row block"
                    style={{ animationDelay: "5.6s" }}
                  >
                    fuji   1004   18.3   0.4   zig         small experiments
                    near the metal
                  </span>
                  <span
                    className="project-terminal-row block"
                    style={{ animationDelay: "5.82s" }}
                  >
                    fuji   1005    4.8   0.1   team-dev    hackathon prototypes
                  </span>
                </pre>
              </div>

              <div className="mb-6">
                <p
                  className="project-terminal-error project-terminal-row text-rose-300"
                  style={{ animationDelay: "6.34s" }}
                >
                  [1] Segmentation fault (core dumped) ps aux | grep projects
                </p>
                <p
                  className="project-terminal-row"
                  style={{ animationDelay: "6.84s" }}
                >
                  <span className="text-rose-300">(*;-;) &gt;</span>{" "}
                  <span
                    className="project-terminal-command text-slate-100"
                    style={{ animationDelay: "7.1s" }}
                  >
                    echo $?
                  </span>
                </p>
                <p
                  className="project-terminal-error project-terminal-row pl-4 text-rose-200"
                  style={{ animationDelay: "7.86s" }}
                >
                  139
                </p>
              </div>

              <div>
                <p
                  className="project-terminal-row"
                  style={{ animationDelay: "8.28s" }}
                >
                  <span className="text-sky-300">(*'-') &gt;</span>{" "}
                  <span
                    className="project-terminal-command text-slate-100"
                    style={{ animationDelay: "8.54s" }}
                  >
                    cat /var/log/fuji.log | tail -n 3
                  </span>
                </p>
                <div className="mt-2 space-y-1 pl-4">
                  <p
                    className="project-terminal-row"
                    style={{ animationDelay: "9.82s" }}
                  >
                    <span className="text-amber-200">[WARN]</span>{" "}
                    <span className="text-slate-400">
                      too many interests loaded into memory
                    </span>
                  </p>
                  <p
                    className="project-terminal-error project-terminal-row"
                    style={{ animationDelay: "10.12s" }}
                  >
                    <span className="text-rose-300">[ERROR]</span>{" "}
                    <span className="text-slate-400">
                      stack overflow: side_projects exceeded ulimit
                    </span>
                  </p>
                  <p
                    className="project-terminal-row"
                    style={{ animationDelay: "10.42s" }}
                  >
                    <span className="text-sky-300">[INFO]</span>{" "}
                    <span className="text-slate-400">
                      core dumped to: github.com/anton-fuji
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </header>

          <nav aria-label="Project categories" className="flex flex-wrap gap-2">
            {projectGroups.map((group) => (
              <a
                key={group.name}
                href={`#${group.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:border-sky-300/30 hover:bg-sky-300/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
              >
                <span className="text-white/90 [&_svg]:h-4 [&_svg]:w-4">
                  {group.icon}
                </span>
                <span>{group.name}</span>
              </a>
            ))}
          </nav>

          {projectGroups.map((group) => (
            <section
              key={group.name}
              id={group.slug}
              className="relative scroll-mt-24 overflow-hidden rounded-lg border border-sky-300/14 bg-black/22 font-mono shadow-[0_0_38px_-28px_rgba(56,189,248,0.82)] backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.062),transparent_38%)]" />
              <div className="pointer-events-none absolute inset-px rounded-lg border border-white/[0.03]" />
              <div className="relative flex items-center justify-between gap-3 border-sky-300/10 border-b bg-[linear-gradient(90deg,rgba(2,6,23,0.78),rgba(15,23,42,0.68),rgba(2,6,23,0.74))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.022)]">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded bg-linear-to-br ${group.accent} text-black shadow-[0_0_24px_-12px_rgba(125,211,252,0.72)] [&_svg]:h-5 [&_svg]:w-5`}
                  >
                    {group.icon}
                  </span>
                  <h2 className="truncate text-sm font-semibold text-white sm:text-base">
                    {group.name}
                  </h2>
                </div>
                <span className="hidden bg-linear-to-r from-slate-600 via-sky-500/45 to-slate-500 bg-clip-text text-xs font-medium text-transparent drop-shadow-[0_0_8px_rgba(2,6,23,0.78)] sm:block">
                  ~/projects/{group.slug}
                </span>
              </div>

              <div className="relative px-4 py-4">
                <p className="text-xs text-sky-300">
                  (*'-') &gt;{" "}
                  <span className="text-slate-200">
                    ps aux | grep {group.slug}
                  </span>
                </p>

                <div className="mt-4 overflow-hidden rounded border border-sky-300/12 bg-black/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-lg">
                  <div className="hidden grid-cols-[4.5rem_minmax(0,1.35fr)_8.5rem_minmax(0,1fr)_2rem] border-sky-300/10 border-b bg-white/[0.035] px-4 py-2 text-[10px] tracking-[0.16em] text-slate-600 uppercase sm:grid">
                    <span>PID</span>
                    <span>Repo</span>
                    <span>Type</span>
                    <span>Output</span>
                    <span />
                  </div>
                  <div className="divide-y divide-sky-300/8">
                    {group.projects.map((proj, projectIndex) => (
                      <ProjectCard
                        key={proj.githuburl}
                        project={proj}
                        accent={group.accent}
                        index={
                          (projectOffsets.get(group.slug) ?? 0) + projectIndex
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

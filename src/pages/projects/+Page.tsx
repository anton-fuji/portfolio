import { useState } from "react";
import { useData } from "vike-react/useData";

import BackgroundGlobe from "../../components/BackgroundGlobe";
import { useTranslation } from "../../i18n";
import type { Data } from "./+data";
import GitHubContributions from "./GitHubContributions";
import ProjectProcessRow from "./ProjectProcessRow";
import projectGroups from "./Projects";

export { Page };

const projectTabFiles: Record<string, string> = {
  go: "go.mod",
  lua: "init.lua",
  zig: "build.zig",
  typescript: "portfolio.tsx",
  astro: "astro.config.mjs",
  "hackathon-projects": "team.md",
};

function Page() {
  const initialContributions = useData<Data>();
  const [selectedGroupSlug, setSelectedGroupSlug] = useState<string>("all");
  const { t } = useTranslation();
  const projectOffsets = new Map<string, number>();
  let projectOffset = 0;

  for (const group of projectGroups) {
    projectOffsets.set(group.slug, projectOffset);
    projectOffset += group.projects.length;
  }
  const totalProjectCount = projectGroups.reduce(
    (count, group) => count + group.projects.length,
    0,
  );
  const visibleGroups =
    selectedGroupSlug === "all"
      ? projectGroups
      : projectGroups.filter((group) => group.slug === selectedGroupSlug);
  const selectedGroup = projectGroups.find((group) => group.slug === selectedGroupSlug);
  const selectedProjectCount =
    selectedGroupSlug === "all" ? totalProjectCount : (selectedGroup?.projects.length ?? 0);
  const selectedScope =
    selectedGroupSlug === "all" ? "workspace" : (selectedGroup?.name ?? selectedGroupSlug);
  const selectGroup = (slug: string) => {
    setSelectedGroupSlug((currentSlug) => (currentSlug === slug ? "all" : slug));
  };

  return (
    <>
      <BackgroundGlobe />
      <div className="px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-14">
          <GitHubContributions initialData={initialContributions} />

          <div className="project-editor-workspace">
            <section aria-label={t.projects.categories} className="project-editor-tabs-shell">
              <div className="project-editor-tabs-titlebar">
                <div aria-hidden className="project-editor-tabs-controls">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="project-editor-tabs-title">~/projects/filter</span>
              </div>

              <ul className="project-editor-tabs">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedGroupSlug("all")}
                    aria-pressed={selectedGroupSlug === "all"}
                    className="project-editor-tab"
                    data-active={selectedGroupSlug === "all"}
                  >
                    <span className="project-editor-tab__icon">＊</span>
                    <span className="project-editor-tab__name">projects.code-workspace</span>
                    <span className="project-editor-tab__count">{totalProjectCount}</span>
                    <span className="project-editor-tab__close" aria-hidden>
                      ×
                    </span>
                  </button>
                </li>
                {projectGroups.map((group) => (
                  <li key={group.name}>
                    <button
                      type="button"
                      onClick={() => selectGroup(group.slug)}
                      aria-pressed={selectedGroupSlug === group.slug}
                      className="project-editor-tab"
                      data-active={selectedGroupSlug === group.slug}
                    >
                      <span className="project-editor-tab__icon">{group.icon}</span>
                      <span className="project-editor-tab__name">
                        {projectTabFiles[group.slug] ?? `${group.slug}.md`}
                      </span>
                      <span className="project-editor-tab__count">{group.projects.length}</span>
                      <span className="project-editor-tab__close" aria-hidden>
                        ×
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="project-editor-tabs-status">
                <span>scope: {selectedScope}</span>
                <span>{selectedProjectCount} repos</span>
                <span className="hidden sm:inline">filter: live</span>
              </div>
            </section>

            <div className="project-editor-content">
              {visibleGroups.map((group) => (
                <section
                  key={group.name}
                  id={group.slug}
                  className="project-editor-file-panel relative scroll-mt-24 overflow-hidden font-mono"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.062),transparent_38%)]" />
                  <div className="pointer-events-none absolute inset-px rounded-lg border border-white/3" />
                  <div className="relative flex items-center justify-between gap-3 border-sky-300/10 border-b bg-[linear-gradient(90deg,rgba(2,6,23,0.78),rgba(15,23,42,0.68),rgba(2,6,23,0.74))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.022)]">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="project-section-icon">{group.icon}</span>
                      <h2 className="truncate font-mono text-sm font-semibold text-white sm:text-base">
                        {group.name}
                      </h2>
                    </div>
                    <span className="hidden bg-linear-to-r from-slate-600 via-sky-500/45 to-slate-500 bg-clip-text text-xs font-medium text-transparent drop-shadow-[0_0_8px_rgba(2,6,23,0.78)] sm:block">
                      ~/projects/{group.slug}
                    </span>
                  </div>

                  <div className="project-editor-file-body">
                    <div className="project-file-list">
                      <div className="project-file-list__header hidden sm:grid">
                        <span>PID</span>
                        <span>State</span>
                        <span>{t.projects.table.name}</span>
                        <span>{t.projects.table.type}</span>
                        <span>{t.projects.table.output}</span>
                        <span />
                      </div>
                      <div className="project-file-list__rows">
                        {group.projects.map((proj, projectIndex) => (
                          <ProjectProcessRow
                            key={proj.githuburl}
                            project={proj}
                            accent={group.accent}
                            index={(projectOffsets.get(group.slug) ?? 0) + projectIndex}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

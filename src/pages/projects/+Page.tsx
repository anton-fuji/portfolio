import { useState } from "react";
import { useData } from "vike-react/useData";

import BackgroundGlobe from "../../components/BackgroundGlobe";
import { useTranslation } from "../../i18n";
import type { Data } from "./+data";
import GitHubContributions from "./contributions/GitHubContributions";
import ProjectProcessRow from "./ProjectProcessRow";
import projectGroups from "./Projects";

export { Page };

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
            <section aria-label={t.projects.categories}>
              <ul className="project-editor-tabs font-geist">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedGroupSlug("all")}
                    aria-pressed={selectedGroupSlug === "all"}
                    className="project-editor-tab"
                    data-active={selectedGroupSlug === "all"}
                  >
                    <span>All</span>
                    <span className="project-editor-tab__count">{totalProjectCount}</span>
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
                      <span>{group.name}</span>
                      <span className="project-editor-tab__count">{group.projects.length}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <div className="project-editor-content">
              {visibleGroups.map((group) => (
                <section
                  key={group.name}
                  id={group.slug}
                  className="project-editor-file-panel relative scroll-mt-24 overflow-hidden font-mono"
                >
                  <div className="flex items-center gap-3 px-4 py-2">
                    <span className="project-section-icon">{group.icon}</span>
                    <h2 className="truncate font-mono text-sm font-semibold text-face sm:text-base">
                      {group.name}
                    </h2>
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

import { LuExternalLink } from "react-icons/lu";
import { useData } from "vike-react/useData";
import { twMerge } from "tailwind-merge";
import BackgroundGlobe from "../../components/BackgroundGlobe";
import { useTranslation } from "../../i18n";
import type { Data } from "./+data";
import ArticleCard from "./ArticleCard";
import { PLATFORM_THEMES } from "./articleTheme";

export { Page };

function Page() {
  const articles = useData<Data>();
  const { t } = useTranslation();

  return (
    <>
      <BackgroundGlobe />
      <div className="space-y-16 py-20">
        {PLATFORM_THEMES.map((theme) => {
          const items = articles.filter((a) => a.platform === theme.key);
          const { Icon } = theme;

          return (
            <section key={theme.key}>
              <div className="container mx-auto mb-6 px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-white" />
                    <h2 className={`text-3xl font-bold ${theme.title}`}>
                      {theme.label}
                    </h2>
                  </div>

                  <a
                    href={theme.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={twMerge(
                      "group inline-flex w-fit items-center gap-1.5 rounded-full border bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-white/72 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                      theme.profileLink,
                    )}
                  >
                    <span>
                      {theme.key} {t.articles.profileLink}
                    </span>
                    <LuExternalLink
                      size={14}
                      className="opacity-60 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </div>
              </div>

              <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {items.map((article) => (
                    <ArticleCard
                      key={article.url}
                      article={article}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

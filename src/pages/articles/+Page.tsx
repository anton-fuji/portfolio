import { FaLink } from "react-icons/fa6";
import { useData } from "vike-react/useData";
import BackgroundGlobe from "../../components/BackgroundGlobe";
import type { Data } from "./+data";
import ArticleCard from "./ArticleCard";
import { PLATFORM_THEMES } from "./articleTheme";

export { Page };

function Page() {
  const articles = useData<Data>();

  return (
    <>
      <BackgroundGlobe />
      <div className="space-y-16 py-20">
        {PLATFORM_THEMES.map((theme) => {
          const items = articles.filter((a) => a.platform === theme.key);
          const { Icon } = theme;

          return (
            <section key={theme.key}>
              <div className="mb-6 flex items-center gap-2 px-15">
                <Icon className="h-6 w-6 text-white" />
                <h2 className={`text-3xl font-bold ${theme.title}`}>
                  {theme.label}
                </h2>
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

                <div className="mt-8 flex justify-center">
                  <a
                    href={theme.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-2 font-medium text-white shadow-md transition-colors hover:shadow-lg ${theme.button}`}
                  >
                    <FaLink size={15} className="animate-pulse" />
                    <span>View more on {theme.key}</span>
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
import { useData } from "vike-react/useData";

import BackgroundGlobe from "../../components/BackgroundGlobe";
import type { Data } from "./+data";
import { PLATFORM_THEMES } from "./articleTheme";

export { Page };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

function Page() {
  const articles = useData<Data>();

  return (
    <>
      <BackgroundGlobe />
      <div className="mx-auto w-full max-w-6xl px-4 py-16 font-geist sm:px-8 lg:px-10 lg:py-24">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.045em] text-face">
          Articles
        </h1>

        <div className="mt-14 flex flex-col gap-16 lg:mt-20 lg:gap-20">
          {PLATFORM_THEMES.map(({ key, Icon }) => {
            const items = articles.filter((article) => article.platform === key);

            return (
              <section key={key} aria-labelledby={`articles-${key}`}>
                <div>
                  <h2
                    id={`articles-${key}`}
                    className="inline-flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] text-face"
                  >
                    <Icon className="h-6 w-6 text-face/70 [&_path]:fill-current" />
                    {key}
                  </h2>
                </div>

                <ul className="mt-6 border-t border-face/12">
                  {items.map((article) => (
                    <li key={article.url} className="border-b border-face/12">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group block py-5 ${focusRing}`}
                      >
                        <span className="text-base leading-relaxed text-face/80 transition-colors group-hover:text-face sm:text-lg">
                          {article.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

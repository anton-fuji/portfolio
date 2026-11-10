import { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import gopherGif from "../../assets/gopher.gif";
import { useTranslation } from "../../i18n";

export { Page };

const burrows = [
  { path: "~/", href: "/", key: "home" },
  { path: "~/articles", href: "/articles", key: "articles" },
  { path: "~/projects", href: "/projects", key: "projects" },
] as const;

function Page() {
  const { is404 } = usePageContext();
  const { t } = useTranslation();
  const [path, setPath] = useState("");
  const [left, right] = is404 ? ["4", "4"] : ["5", "0"];

  // The prerendered 404.html is served for any missing URL, so read the real path on the client.
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="not-found px-6 pt-28 pb-20">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div className="space-y-3">
          {is404 && path && (
            <p className="font-mono text-sm text-rose-300/75">
              <code>{path}</code>
            </p>
          )}
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            {is404 ? t.notFound.title : t.notFound.errorTitle}
          </h1>
          <p className="mx-auto max-w-md leading-7 text-slate-300/70">
            {is404 ? t.notFound.body : t.notFound.errorBody}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="not-found__scene mt-12 flex items-end justify-center font-mono font-bold text-slate-100/90"
        >
          <span className="not-found__digit">{left}</span>
          <span className="not-found__burrow group/gopher">
            <span className="not-found__gopher">
              <img
                src={gopherGif}
                alt=""
                className="h-full w-full translate-y-[18%] transition-transform duration-300 ease-out [image-rendering:pixelated] group-hover/gopher:translate-y-[4%] motion-reduce:transition-none"
              />
            </span>
          </span>
          <span className="not-found__digit">{right}</span>
        </div>

        <div className="not-found__ground w-full" />

        <nav aria-label={t.notFound.home} className="not-found__tunnels w-full max-w-lg">
          <ul className="grid grid-cols-3">
            {burrows.map(({ path: burrowPath, href, key }) => (
              <li key={href} className="not-found__branch">
                <a
                  href={href}
                  className="group inline-flex flex-col items-center gap-1 rounded-sm px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"
                >
                  <span className="font-mono text-sm text-indigo-100/80 transition-colors group-hover:text-white sm:text-base">
                    {burrowPath}
                  </span>
                  <span className="text-xs text-slate-400/70">{t.nav[key]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

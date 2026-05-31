import type { FC } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import GlareHover from "../../components/GlareHover";
import SpotlightCard from "../../components/SpotlightCard";
import type { PlatformTheme } from "./articleTheme";
import type { Article } from "./articles";

export type ArticleCardProps = {
  article: Article;
  theme: PlatformTheme;
};

/** Format an ISO-ish date to "YYYY.MM.DD" deterministically (no timezone drift). */
function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const m = iso.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}.${m[2]}.${m[3]}` : null;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, theme }) => {
  const date = formatDate(article.publishedAt);
  const tags = article.tags?.slice(0, 3) ?? [];

  return (
    <GlareHover
      className="h-full rounded-lg"
      glareColor={theme.glare}
      glareOpacity={0.35}
      glareSize={250}
    >
      <SpotlightCard
        spotlightColor={theme.spotlight}
        className={twMerge(
          "flex h-full flex-col gap-3 transition-shadow duration-300",
          theme.border,
          theme.hoverGlow,
        )}
      >
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-white transition-colors hover:text-gray-300"
        >
          {article.emoji ? (
            <span aria-hidden className="text-2xl leading-none">
              {article.emoji}
            </span>
          ) : null}
          <h3 className="text-lg font-medium">{article.title}</h3>
          <LuExternalLink
            size={18}
            className="mt-1 ml-auto shrink-0 opacity-60"
          />
        </a>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-600/40 px-2 py-0.5 text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center gap-4 text-xs text-gray-500">
          {date ? <span>{date}</span> : null}
          {typeof article.likes === "number" ? (
            <span className="inline-flex items-center gap-1">
              <FaRegHeart size={11} />
              {article.likes}
            </span>
          ) : null}
        </div>
      </SpotlightCard>
    </GlareHover>
  );
};

export default ArticleCard;
import { PLATFORM } from "./Platform";

export type ArticlePlatform = "Zenn" | "Qiita";

export type Article = {
  platform: ArticlePlatform;
  title: string;
  url: string;
  emoji?: string;
  likes?: number;
  /** ISO-ish date string (e.g. "2024-01-31T...") */
  publishedAt?: string;
  tags?: string[];
};

type ArticleSource = { platform: ArticlePlatform; handle: string };

/** Public account handles per platform. */
const SOURCES: ArticleSource[] = [
  { platform: "Zenn", handle: "fuuji" },
  { platform: "Qiita", handle: "fujifuji1414" },
];

const PER_PLATFORM = 6;
const REQUEST_TIMEOUT_MS = 8000;

/** Built from the existing hand-written list; used when an API is unreachable. */
const STATIC_FALLBACK: Article[] = PLATFORM.map((p) =>
  p.Zenn
    ? { platform: "Zenn", title: p.Zenn, url: p.url }
    : { platform: "Qiita", title: p.Qiita ?? "", url: p.url },
);

async function getJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// --- Zenn (unofficial endpoint) ---
type ZennArticle = {
  title?: string;
  slug?: string;
  path?: string;
  emoji?: string;
  liked_count?: number;
  published_at?: string;
};

async function fetchZenn(handle: string): Promise<Article[]> {
  const json = await getJson(
    `https://zenn.dev/api/articles?username=${encodeURIComponent(handle)}&order=latest`,
  );
  const list = (json as { articles?: ZennArticle[] })?.articles;
  if (!Array.isArray(list)) return [];
  return list
    .filter((a): a is ZennArticle => typeof a?.title === "string")
    .map((a) => ({
      platform: "Zenn" as const,
      title: a.title as string,
      url: a.path
        ? `https://zenn.dev${a.path}`
        : `https://zenn.dev/${handle}/articles/${a.slug ?? ""}`,
      emoji: a.emoji,
      likes: typeof a.liked_count === "number" ? a.liked_count : undefined,
      publishedAt: a.published_at,
    }));
}

// --- Qiita (official API v2) ---
type QiitaItem = {
  title?: string;
  url?: string;
  likes_count?: number;
  created_at?: string;
  tags?: { name?: string }[];
};

async function fetchQiita(handle: string): Promise<Article[]> {
  const json = await getJson(
    `https://qiita.com/api/v2/users/${encodeURIComponent(handle)}/items?per_page=20`,
  );
  if (!Array.isArray(json)) return [];
  return (json as QiitaItem[])
    .filter((i) => typeof i?.title === "string" && typeof i?.url === "string")
    .map((i) => ({
      platform: "Qiita" as const,
      title: i.title as string,
      url: i.url as string,
      likes: typeof i.likes_count === "number" ? i.likes_count : undefined,
      publishedAt: i.created_at,
      tags: Array.isArray(i.tags)
        ? i.tags.map((t) => t?.name).filter((n): n is string => Boolean(n))
        : undefined,
    }));
}

function fetchByPlatform(source: ArticleSource): Promise<Article[]> {
  return source.platform === "Zenn"
    ? fetchZenn(source.handle)
    : fetchQiita(source.handle);
}

function byDateDesc(a: Article, b: Article): number {
  return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
}

/**
 * Fetch the latest articles for every source. Runs at build time (prerender).
 * If a request fails or returns nothing, that platform falls back to the
 * static list, so a flaky/blocked API can never break the build or empty
 * the page.
 */
export async function getArticles(): Promise<Article[]> {
  const grouped = await Promise.all(
    SOURCES.map(async (source) => {
      try {
        const live = await fetchByPlatform(source);
        if (live.length > 0) {
          return live.sort(byDateDesc).slice(0, PER_PLATFORM);
        }
      } catch {
        // fall through to the static list below
      }
      return STATIC_FALLBACK.filter(
        (a) => a.platform === source.platform,
      ).slice(0, PER_PLATFORM);
    }),
  );
  return grouped.flat();
}
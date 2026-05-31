import { getArticles } from "./articles";

export type Data = Awaited<ReturnType<typeof getArticles>>;

export async function data(): Promise<Data> {
  return getArticles();
}
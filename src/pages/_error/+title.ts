import type { PageContext } from "vike/types";

export const title = (pageContext: PageContext) =>
  pageContext.is404 ? "Not Found | Kazuki Fujimoto" : "Error | Kazuki Fujimoto";

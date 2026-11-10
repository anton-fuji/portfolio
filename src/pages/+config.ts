import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

import Layout from "../layouts/Layout";

export default {
  Layout,
  title: "Portfolio | Kazuki Fujimoto",
  description:
    "大阪のソフトウェアエンジニア Kazuki Fujimoto のポートフォリオ。Go / Rust / TypeScript、バックエンドとインフラ、技術記事、資格をまとめています。",
  image: "https://fuuji.site/og-image.png",
  lang: "ja",

  favicon: "/favicon.ico",
  extends: vikeReact,
  prerender: true,
} satisfies Config;

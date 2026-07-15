import type { EngineeringSurface, SocialLink } from "../types";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/anton-fuji",
    icon: "Github",
  },
  {
    name: "X",
    url: "https://x.com/sXq7XBrxuB87199",
    icon: "X",
  },
  {
    name: "Zenn",
    url: "https://zenn.dev/fuuji",
    icon: "Zenn",
  },
  {
    name: "Qiita",
    url: "https://qiita.com/fujifuji1414",
    icon: "Qiita",
  },
  {
    name: "Note",
    url: "https://note.com/mochi_mochi777",
    icon: "Note",
  },
];

export const getSocialUrl = (name: SocialLink["name"]): string => {
  const socialLink = SOCIAL_LINKS.find((link) => link.name === name);
  if (!socialLink) {
    throw new Error(`Social link not found: ${name}`);
  }
  return socialLink.url;
};

export const PERSONAL_INFO = {
  name: "Kazuki Fujimoto",
  title: {
    ja: "My Portfolio",
    en: "My Portfolio",
  },
  description: {
    ja: "20歳 | Software Engineer\n好きなもの: Go / Rust / TypeScript / Neovim / WezTerm",
    en: "20 y/o | Software Engineer\nLikes: Go / Rust / TypeScript / Neovim / WezTerm",
  },
  location: "Osaka, Japan",
  url: "fuuji.site",
  email: "test",
  profileImage: ".public/fuji-icon.jpg",
};

export const ENGINEERING_SURFACES: EngineeringSurface[] = [
  {
    id: "cli-systems",
    verb: "$ cat ~/dev/cli.md",
    title: {
      ja: "小さな CLI で作業を軽くする",
      en: "Building CLIs for Fun",
    },
    description: {
      ja: "日々の作業で少し面倒に感じることを、ターミナル上でさっと片付けられる道具にするのが好きです。エディタやシェルも含めて、自分の手になじむ開発環境を育てています。",
      en: "I like building small terminal tools for jobs that are too specific for a dashboard. Vim, Neovim, and CLI-heavy workflows are where I feel most at home.",
    },
    stack: ["Go", "Rust", "Nix", "Linux", "Vim", "Neovim"],
    signals: [
      {
        ja: "techfeed で Qiita / Zenn の投稿を README に自動反映",
        en: "techfeed pulls Qiita / Zenn posts into a README",
      },
      {
        ja: "gitviz でコミット履歴をターミナル上に可視化",
        en: "gitviz turns commit history into a terminal view",
      },
      {
        ja: "dibo / ztree では用途を絞った CLI の使い心地を調整",
        en: "dibo / ztree are small CLIs where I tune the details",
      },
      {
        ja: "Neovim やターミナルの体験も日々改善中",
        en: "Neovim and terminal UX are a big part of how I work",
      },
    ],
    proofs: [
      {
        label: { ja: "CLI プロジェクト", en: "CLI projects" },
        href: "/projects#Go",
      },
      { label: { ja: "Go の記事", en: "Go writeups" } },
    ],
    accent: "from-cyan-300 to-blue-400",
  },
  {
    id: "cloud-delivery",
    verb: "$ cat ~/infra/cloud.md",
    title: {
      ja: "運用まで見据えて設計する",
      en: "Shipping things to the cloud",
    },
    description: {
      ja: "アプリを作って終わりにせず、どこで動かすか、どう安全に更新するか、データをどう扱うかまで含めて考えるのが好きです。",
      en: 'I try not to stop at "works on my machine." I care about where it runs, how it gets deployed, and how the data layer behaves in real use.',
    },
    stack: [
      "GCP",
      "AWS",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "PostgreSQL",
    ],
    signals: [
      {
        ja: "AWS / GCP のリソースを Terraform で構成",
        en: "Terraform for AWS / GCP resources",
      },
      {
        ja: "GitHub Actions でビルドからデプロイまで自動化",
        en: "GitHub Actions for build and deploy",
      },
      {
        ja: "実務では PostgreSQL を中心にデータ層も担当",
        en: "PostgreSQL in day-to-day professional work",
      },
      {
        ja: "Docker イメージを 70% 軽量化",
        en: "Reduced Docker image size by 70%",
      },
    ],
    proofs: [
      {
        label: { ja: "Google Cloud 資格", en: "Google Cloud certs" },
        href: "/certifications",
      },
      { label: { ja: "インフラ記事", en: "Infra writeups" } },
    ],
    accent: "from-sky-300 to-blue-500",
  },
  {
    id: "product-frontend",
    verb: "$ cat ~/web/frontend.md",
    title: {
      ja: "得意ではないけど、フロントも好き",
      en: "Frontend When Needed",
    },
    description: {
      ja: "まだ得意分野と言えるほどではありませんが、React や TypeScript で画面を作るのは好きです。作ったものがちゃんと伝わる UI になるよう、少しずつ試しています。",
      en: "Frontend is not my main lane, but I can put together React and TypeScript surfaces when I need to make my work presentable.",
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    signals: [
      {
        ja: "Vite ベースの構成で静的サイトを構築",
        en: "Static site setup built on Vite",
      },
      {
        ja: "このポートフォリオで UI 表現やアニメーションを試しています",
        en: "This portfolio as a small frontend playground",
      },
    ],
    proofs: [
      { label: { ja: "ポートフォリオのソース", en: "portfolio source" } },
      { label: { ja: "ハッカソン作品", en: "hackathon products" } },
    ],
    accent: "from-blue-300 to-indigo-400",
  },
  {
    id: "technical-writing",
    verb: "$ cat ~/notes/rough-edges.md",
    title: {
      ja: "詰まったことを記事に残す",
      en: "Notes from the Debug Log",
    },
    description: {
      ja: "Docker、Go、Terraform などで調べたことや失敗したことは、あとで見返せるように記事へまとめています。自分の理解を整理しつつ、同じところで困った人の助けにもなればいいなと思っています。",
      en: "When I get stuck around Docker, Go, or Terraform, I turn the notes into articles so the next pass is faster.",
    },
    stack: ["Zenn", "Qiita", "Note"],
    signals: [
      {
        ja: "GoでUNIXコマンドを作りながら、I/O処理を理解する",
        en: "Understanding I/O by building UNIX commands in Go",
      },
      {
        ja: "ソケット通信を一緒に理解しよう!!",
        en: "Understanding socket communication together",
      },
      {
        ja: "Dockerイメージの安全性を高める10のセキュリティハック",
        en: "10 security hacks to make Docker images safer",
      },
    ],
    proofs: [
      { label: { ja: "Zenn / Qiita 記事", en: "Zenn / Qiita articles" } },
      { label: { ja: "Zenn プロフィール", en: "Zenn profile" } },
    ],
    accent: "from-indigo-300 to-cyan-400",
  },
];

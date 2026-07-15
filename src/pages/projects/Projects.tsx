import type { ReactNode } from "react";
import type { LocalizedText } from "../../i18n";
import { FaPeopleGroup, FaGolang } from "react-icons/fa6";
import { SiLua } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { SiZig } from "react-icons/si";

export interface ProjectGroup {
  name: string;
  slug: string;
  accent: string;
  icon: ReactNode;
  projects: Project[];
}

export interface Project {
  name: string;
  description: LocalizedText;
  githuburl: string;
  kind: "CLI Tool" | "Web App" | "Environment" | "Portfolio" | "Team Project";
  tags: string[];
}

export const projectGroups: ProjectGroup[] = [
  {
    name: "Go",
    slug: "go",
    accent: "from-cyan-300 via-sky-400 to-blue-500",
    icon: <FaGolang size={30} />,
    projects: [
      {
        name: "Tech Feed",
        description: {
          ja: "QiitaやZennの記事をGitHubのREADMEに自動埋め込みするGo製ツール",
          en: "A Go CLI that automatically embeds Qiita and Zenn articles into a GitHub README.",
        },
        githuburl: "https://github.com/anton-fuji/techfeed",
        kind: "CLI Tool",
        tags: ["Go", "GitHub Actions", "Markdown"],
      },
      {
        name: "mini link",
        description: {
          ja: "FiberでURL Shortener を実装",
          en: "A URL shortener implemented with Fiber.",
        },
        githuburl: "https://github.com/anton-fuji/minilink",
        kind: "Web App",
        tags: ["Go", "Fiber", "URL Shortener"],
      },
      {
        name: "gitviz",
        description: {
          ja: "Gitのコミット履歴をContributionグラフのようにターミナルで視覚化するCLIツール",
          en: "A CLI that visualizes Git commit history in the terminal like a contribution graph.",
        },
        githuburl: "https://github.com/anton-fuji/gitviz",
        kind: "CLI Tool",
        tags: ["Go", "Git", "Terminal UI"],
      },
      {
        name: "dibo",
        description: {
          ja: ".dockerignoreファイルのテンプレートを生成するCLIツール",
          en: "A CLI that generates .dockerignore templates.",
        },
        githuburl: "https://github.com/anton-fuji/dibo",
        kind: "CLI Tool",
        tags: ["Go", "Docker", "Generator"],
      },
    ],
  },
  {
    name: "Lua",
    slug: "lua",
    accent: "from-sky-300 via-blue-500 to-indigo-500",
    icon: <SiLua size={30} />,
    projects: [
      {
        name: "dotfiles",
        description: {
          ja: "Neovim + WezTerm 環境構築",
          en: "Neovim and WezTerm environment setup.",
        },
        githuburl: "https://github.com/anton-fuji/dotfiles",
        kind: "Environment",
        tags: ["Lua", "Neovim", "WezTerm"],
      },
    ],
  },
  {
    name: "Zig",
    slug: "zig",
    accent: "from-blue-200 via-cyan-400 to-sky-600",
    icon: <SiZig size={30} />,
    projects: [
      {
        name: "ztree",
        description: {
          ja: "Zig ディレクトリツリーCLI",
          en: "A directory tree CLI written in Zig.",
        },
        githuburl: "https://github.com/anton-fuji/ztree",
        kind: "CLI Tool",
        tags: ["Zig", "File System", "CLI"],
      },
    ],
  },
  {
    name: "TypeScript",
    slug: "typescript",
    accent: "from-sky-300 via-blue-500 to-cyan-400",
    icon: <BiLogoTypescript size={30} />,
    projects: [
      {
        name: "Portfolio",
        description: {
          ja: "個人のポートフォリオサイト",
          en: "My personal portfolio site.",
        },
        githuburl: "https://github.com/anton-fuji/portfolio",
        kind: "Portfolio",
        tags: ["React", "Vike", "Tailwind CSS"],
      },
    ],
  },
  {
    name: "Hackathon Projects",
    slug: "hackathon-projects",
    accent: "from-indigo-300 via-sky-500 to-cyan-400",
    icon: <FaPeopleGroup size={30} />,
    projects: [
      {
        name: "Tech Hub",
        description: {
          ja: "RareTECH 受講生向けに作成した、記事プラットフォーム",
          en: "An article platform built for RareTECH students.",
        },
        githuburl: "https://github.com/E-Team-Hackathon/TechHub",
        kind: "Team Project",
        tags: ["Team", "Articles", "Community"],
      },
      {
        name: "Chimy",
        description: {
          ja: "小学校向け 連絡帳チャットアプリ",
          en: "A contact-book chat app for elementary schools.",
        },
        githuburl: "https://github.com/2024-Summer-Raretech-Team-F/chatapp",
        kind: "Team Project",
        tags: ["Team", "Chat", "School"],
      },
    ],
  },
];

export default projectGroups;

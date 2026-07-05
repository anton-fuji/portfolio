import type { ReactNode } from "react";
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
  description: string;
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
        description:
          "QiitaやZennの記事をGitHubのREADMEに自動埋め込みするGo製ツール",
        githuburl: "https://github.com/anton-fuji/techfeed",
        kind: "CLI Tool",
        tags: ["Go", "GitHub Actions", "Markdown"],
      },
      {
        name: "mini link",
        description: "FiberでURL Shortener を実装",
        githuburl: "https://github.com/anton-fuji/minilink",
        kind: "Web App",
        tags: ["Go", "Fiber", "URL Shortener"],
      },
      {
        name: "gitviz",
        description:
          "Gitのコミット履歴をContributionグラフのようにターミナルで視覚化するCLIツール",
        githuburl: "https://github.com/anton-fuji/gitviz",
        kind: "CLI Tool",
        tags: ["Go", "Git", "Terminal UI"],
      },
      {
        name: "dibo",
        description:
          ".dockerignoreファイルのテンプレートを生成するCLIツール",
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
        description: "Neovim + WezTerm 環境構築",
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
        description: "Zig ディレクトリツリーCLI",
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
        description: "個人のポートフォリオサイト",
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
        description: "RareTECH 受講生向けに作成した、記事プラットフォーム",
        githuburl: "https://github.com/E-Team-Hackathon/TechHub",
        kind: "Team Project",
        tags: ["Team", "Articles", "Community"],
      },
      {
        name: "Chimy",
        description: "小学校向け 連絡帳チャットアプリ",
        githuburl: "https://github.com/2024-Summer-Raretech-Team-F/chatapp",
        kind: "Team Project",
        tags: ["Team", "Chat", "School"],
      },
    ],
  },
];

export default projectGroups;

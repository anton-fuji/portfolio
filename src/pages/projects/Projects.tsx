import type { ReactNode } from "react";
import { FaPeopleGroup, FaGolang } from "react-icons/fa6";
import { SiLua } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

export interface ProjectGroup {
  name: string;
  icon: ReactNode;
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  githuburl: string;
}

export const projectGroups: ProjectGroup[] = [
  {
    name: "Hackathon Projects",
    icon: <FaPeopleGroup size={30} />,
    projects: [
      {
        name: "Tech Hub",
        description: "RareTECH 受講生向けに作成した、記事プラットフォーム",
        githuburl: "https://github.com/E-Team-Hackathon/TechHub",
      },
      {
        name: "Chimy",
        description: "小学校向け 連絡帳チャットアプリ",
        githuburl: "https://github.com/2024-Summer-Raretech-Team-F/chatapp",
      },
    ],
  },
  {
    name: "Golang",
    icon: <FaGolang size={30} />,
    projects: [
      {
        name: "Tech Feed",
        description:
          "QiitaやZennの記事をGitHubのREADMEに自動埋め込みするGo製ツール",
        githuburl: "https://github.com/anton-fuji/techfeed",
      },
      {
        name: "mini link",
        description: "FiberでURL Shortener を実装",
        githuburl: "https://github.com/anton-fuji/minilink",
      },
    ],
  },
  {
    name: "Lua",
    icon: <SiLua size={30} />,
    projects: [
      {
        name: "dotfiles",
        description: "Neovim + WezTerm 環境構築",
        githuburl: "https://github.com/anton-fuji/dotfiles",
      },
    ],
  },
  {
    name: "TypeScript",
    icon: <BiLogoTypescript size={30} />,
    projects: [
      {
        name: "Portfolio",
        description: "個人のポートフォリオサイト",
        githuburl: "https://github.com/anton-fuji/portfolio",
      },
    ],
  },
];

export default projectGroups;

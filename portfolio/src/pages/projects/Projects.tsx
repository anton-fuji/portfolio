import type { ReactNode } from 'react';
import { IoLogoGithub } from "react-icons/io5"
import { FaPeopleGroup } from "react-icons/fa6";

export interface ProjectGroup {
    name: string;
    icon: ReactNode;
    projects: Project[];
};

export interface Project {
    name: string;
    description: string;
    githuburl: string;
}

export const projectGroups: ProjectGroup[] = [
    {
    name: "Hackathon Projects",
    icon: <FaPeopleGroup  size={30} />,
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
        name: "My Project",
        icon: <IoLogoGithub  size={30} />,
        projects: [
            {
                name: "Tech Feed",
                description: "QiitaやZennの記事をGitHubのREADMEに自動埋め込みするGo製ツール",
                githuburl: "https://github.com/anton-fuji/techfeed",
            },
        ],
        },
]

export default projectGroups;
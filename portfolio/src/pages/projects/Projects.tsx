import type { FC, ReactNode } from 'react';
import { IoLogoGithub } from "react-icons/io5";
import ProjectCard from './ProjectCard';

export type ProjectGroup = {
    name: string;
    icon: ReactNode;
    projects: Project[];
};

export type Project = {
    name: string;
    description: string;
    githuburl: string;
}

const projectGroups: ProjectGroup[] = [
    {
    name: "My Project",
    icon: <IoLogoGithub  size={30}/>,
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
]

const ProjectsPage: FC = () => {
    return (
        <div className="space-y-12 py-20 px-8">
            {projectGroups.map((group) => (
            <section key={group.name} id={group.name}>
                
                <div className="flex flex-wrap gap-2 mb-6">
                <h3 className="inline-flex items-center gap-1 rounded-full border border-gray-700 bg-[#0a0a0a] px-3 py-1 text-white">
                    {group.icon}
                    <span className="font-medium">{group.name}</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
                {group.projects.map((proj) => (
                    <ProjectCard
                    key={proj.githuburl}
                    project={proj.name}
                    description={proj.description}
                    url={proj.githuburl}
                    />
                ))}
                </div>
            </section>
            ))}
        </div>
    );
};

export default ProjectsPage;
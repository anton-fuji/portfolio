import type { SkillCategory } from "../types/index";
import type { SocialLink } from "../types";

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
    url: "https://note.com/easy_dolphin1414",
    icon: "Note",
  },
];

export const PERSONAL_INFO = {
  name: "Kazuki Fujimoto",
  title: "My Portfolio",
  description:
    "20 y/o | Software Engineer\n Go / Rust / TypeScript / Lua / Google Cloud / AWS",
  location: "Okayama, Japan",
  email: "test",
  profileImage: ".public/fuji-icon.jpg",
};

export const SKILLS: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    color: "bg-cyan-400",
    skills: [
      { id: "react", name: "React", level: 40 },
      { id: "typescript", name: "TypeScript", level: 60 },
      { id: "tailwind", name: "Tailwind CSS", level: 30 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    color: "bg-sky-600",
    skills: [
      { id: "go", name: "Go", level: 65 },
      { id: "rust", name: "Rust", level: 50 },
      { id: "python", name: "Python", level: 50 },
      { id: "postgresql", name: "PostgreSQL", level: 50 },
    ],
  },
  {
    id: "infra",
    name: "Infra",
    color: "bg-blue-500",
    skills: [
      { id: "aws", name: "AWS", level: 50 },
      { id: "gcp", name: "Google Cloud", level: 40 },
      { id: "terraform", name: "Terraform", level: 20 },
      { id: "gh-actions", name: "Github Actions", level: 40 },
      { id: "docker", name: "Docker", level: 60 },
    ],
  },
  {
    id: "other",
    name: "Other",
    color: "bg-blue-900",
    skills: [
      { id: "git", name: "Git", level: 70 },
      { id: "linux", name: "Linux", level: 70 },
      { id: "lua", name: "Lua", level: 50 },
      { id: "neovim", name: "Neovim", level: 65 },
    ],
  },
];

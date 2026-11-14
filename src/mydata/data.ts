import type { SkillLayer, SocialLink } from "../types";

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
    ja: "21歳 | Software Engineer\n大阪で SWE してます。バックエンドとインフラをやりつつ、趣味で CLI を作ってます。",
    en: "21 y/o | Software Engineer\nOsaka-based SWE building backend systems, infrastructure, and developer tools.",
  },
  location: "Osaka, Japan",
  url: "fuuji.site",
  email: "test",
  profileImage: ".public/fuji-icon.jpg",
};

export const SKILL_LAYERS: SkillLayer[] = [
  { name: "Languages", skills: ["Go", "Rust", "TypeScript"] },
  { name: "Cloud & Infra", skills: ["GCP", "AWS", "Terraform", "Docker", "GitHub Actions"] },
  { name: "Data", skills: ["PostgreSQL", "Turso"] },
  { name: "Tooling", skills: ["Linux", "Nix", "Neovim", "Claude Code", "Codex"] },
  { name: "Frontend", skills: ["React", "Tailwind CSS", "Vite"] },
];

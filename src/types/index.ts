export type SocialLinkName = "GitHub" | "X" | "Zenn" | "Qiita" | "Note";

export type SocialIconName = "Github" | "X" | "Zenn" | "Qiita" | "Note";

export interface SocialLink {
  name: SocialLinkName;
  url: string;
  icon: SocialIconName;
}

export type TechName =
  | "Go"
  | "Rust"
  | "Nix"
  | "Linux"
  | "Neovim"
  | "Claude Code"
  | "Codex"
  | "PostgreSQL"
  | "GCP"
  | "AWS"
  | "Turso"
  | "Terraform"
  | "Docker"
  | "GitHub Actions"
  | "React"
  | "TypeScript"
  | "Tailwind CSS"
  | "Vite";

export interface SkillLayer {
  name: string;
  skills: TechName[];
}

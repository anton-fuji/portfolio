import type { LocalizedText } from "../i18n";

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
  | "Vim"
  | "Neovim"
  | "PostgreSQL"
  | "GCP"
  | "AWS"
  | "Terraform"
  | "Docker"
  | "GitHub Actions"
  | "React"
  | "TypeScript"
  | "Tailwind CSS"
  | "Vite"
  | "Zenn"
  | "Qiita";

export interface EngineeringProof {
  label: LocalizedText;
  href?: string;
}

export interface EngineeringSurface {
  id: string;
  verb: string;
  title: LocalizedText;
  description: LocalizedText;
  stack: TechName[];
  signals: LocalizedText[];
  proofs: EngineeringProof[];
  accent: string;
}

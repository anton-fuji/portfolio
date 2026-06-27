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
  | "Vike"
  | "Zenn"
  | "Qiita";

export interface EngineeringProof {
  label: string;
  href?: string;
}

export interface EngineeringSurface {
  id: string;
  verb: string;
  title: string;
  description: string;
  stack: TechName[];
  signals: string[];
  proofs: EngineeringProof[];
  accent: string;
}

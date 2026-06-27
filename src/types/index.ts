export type SocialLinkName = "GitHub" | "X" | "Zenn" | "Qiita" | "Note";

export type SocialIconName = "Github" | "X" | "Zenn" | "Qiita" | "Note";

export interface SocialLink {
  name: SocialLinkName;
  url: string;
  icon: SocialIconName;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

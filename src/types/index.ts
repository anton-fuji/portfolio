export interface SocialLink {
  name: string;
  url: string;
  icon: string;
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

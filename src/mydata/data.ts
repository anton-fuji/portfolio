import type { EngineeringSurface, SocialLink } from "../types";

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
  title: "My Portfolio",
  description:
    "20 y/o | Software Engineer\n Likes: Go / Rust / TypeScript / Neovim / WezTerm" ,
  location: "Osaka, Japan",
  url: "fuuji.site",
  email: "test",
  profileImage: ".public/fuji-icon.jpg",
};

export const ENGINEERING_SURFACES: EngineeringSurface[] = [
  {
    id: "cli-systems",
    verb: "$ cat ~/dev/cli.md",
    title: "Building CLIs for Fun",
    description:
      "I like building small terminal tools for jobs that are too specific for a dashboard. Vim, Neovim, and CLI-heavy workflows are where I feel most at home.",
    stack: ["Go", "Rust", "Zig", "Linux", "Vim", "Neovim"],
    signals: [
      "techfeed pulls Qiita / Zenn posts into a README",
      "gitviz turns commit history into a terminal view",
      "dibo / ztree are small CLIs where I tune the details",
      "Neovim and terminal UX are a big part of how I work",
    ],
    proofs: [
      { label: "CLI projects", href: "/projects#Go" },
      { label: "Go writeups" },
    ],
    accent: "from-cyan-300 to-blue-400",
  },
  {
    id: "cloud-delivery",
    verb: "$ cat ~/infra/cloud.md",
    title: "Shipping things to the cloud",
    description:
      "I try not to stop at \"works on my machine.\" I care about where it runs, how it gets deployed, and how the data layer behaves in real use.",
    stack: [
      "GCP",
      "AWS",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "PostgreSQL",
    ],
    signals: [
      "Terraform for AWS / GCP resources",
      "GitHub Actions for build and deploy",
      "PostgreSQL in day-to-day professional work",
      "Google Cloud certs to back up the fundamentals",
    ],
    proofs: [
      { label: "Google Cloud certs", href: "/certifications" },
      { label: "Infra writeups" },
    ],
    accent: "from-sky-300 to-blue-500",
  },
  {
    id: "product-frontend",
    verb: "$ cat ~/web/frontend.md",
    title: "Frontend When Needed",
    description:
      "Frontend is not my main lane, but I can put together React and TypeScript surfaces when I need to make my work presentable.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vike"],
    signals: [
      "Static prerendering with Vike",
      "This portfolio as a small frontend playground",
    ],
    proofs: [
      { label: "portfolio source" },
      { label: "hackathon products" },
    ],
    accent: "from-blue-300 to-indigo-400",
  },
  {
    id: "technical-writing",
    verb: "$ cat ~/notes/rough-edges.md",
    title: "Notes from the Debug Log",
    description:
      "When I get stuck around Docker, Go, or Terraform, I turn the notes into articles so the next pass is faster.",
    stack: ["Zenn", "Qiita", "Docker", "Go", "Terraform"],
    signals: [
      "Docker image and security notes",
      "Go posts that build UNIX commands and OAuth flows",
      "Terraform notes that include the reasoning, not just the steps",
    ],
    proofs: [
      { label: "Zenn / Qiita articles" },
      { label: "Zenn profile" },
    ],
    accent: "from-indigo-300 to-cyan-400",
  },
];

import type { ElementType } from "react";
import { SiQiita } from "react-icons/si";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import { getSocialUrl } from "../../mydata/data";
import type { Platform } from "./Platform";

type IconType = ElementType<{ className?: string }>;

export type PlatformTheme = {
  /** Which key on a Platform item holds this platform's title */
  key: Exclude<keyof Platform, "url">;
  label: string;
  Icon: IconType;
  profileUrl: string;
  /** Spotlight color (rgba) following the cursor */
  spotlight: string;
  /** Glare sweep color (hex) */
  glare: string;
  /** Tailwind classes for accents (border / hover glow / profile link) */
  border: string;
  hoverGlow: string;
  title: string;
  profileLink: string;
};

export const PLATFORM_THEMES: PlatformTheme[] = [
  {
    key: "Zenn",
    label: "Writing on Zenn",
    Icon: ZennIcon,
    profileUrl: getSocialUrl("Zenn"),
    spotlight: "rgba(62, 168, 255, 0.25)",
    glare: "#3ea8ff",
    border: "border-gray-600/30",
    hoverGlow: "hover:shadow-[0_0_24px_-4px_rgba(62,168,255,0.6)]",
    title: "text-white",
    profileLink:
      "border-cyan-300/20 hover:border-cyan-300/50 hover:bg-cyan-300/10",
  },
  {
    key: "Qiita",
    label: "Notes on Qiita",
    Icon: SiQiita,
    profileUrl: getSocialUrl("Qiita"),
    spotlight: "rgba(101, 193, 0, 0.25)",
    glare: "#65c500",
    border: "border-gray-600/30",
    hoverGlow: "hover:shadow-[0_0_24px_-4px_rgba(101,193,0,0.6)]",
    title: "text-white",
    profileLink:
      "border-lime-300/20 hover:border-lime-300/50 hover:bg-lime-300/10",
  },
];

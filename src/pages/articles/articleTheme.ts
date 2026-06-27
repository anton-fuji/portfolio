import type { FC, SVGProps } from "react";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import QiitaIcon from "../../assets/icons/socials/qiita.svg?react";
import { getSocialUrl } from "../../mydata/data";
import type { Platform } from "./Platform";

type IconType = FC<SVGProps<SVGSVGElement>>;

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
  /** Tailwind classes for accents (border / hover glow / button) */
  border: string;
  hoverGlow: string;
  title: string;
  button: string;
};

export const PLATFORM_THEMES: PlatformTheme[] = [
  {
    key: "Zenn",
    label: "Zenn Articles",
    Icon: ZennIcon,
    profileUrl: getSocialUrl("Zenn"),
    spotlight: "rgba(62, 168, 255, 0.25)",
    glare: "#3ea8ff",
    border: "border-gray-600/30",
    hoverGlow: "hover:shadow-[0_0_24px_-4px_rgba(62,168,255,0.6)]",
    title: "text-white",
    button: "bg-gray-600/80 hover:bg-gray-700",
  },
  {
    key: "Qiita",
    label: "Qiita Articles",
    Icon: QiitaIcon,
    profileUrl: getSocialUrl("Qiita"),
    spotlight: "rgba(101, 193, 0, 0.25)",
    glare: "#65c500",
    border: "border-gray-600/30",
    hoverGlow: "hover:shadow-[0_0_24px_-4px_rgba(101,193,0,0.6)]",
    title: "text-white",
    button: "bg-gray-600/80 hover:bg-gray-700",
  },
];

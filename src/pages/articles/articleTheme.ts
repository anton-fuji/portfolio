import type { ElementType } from "react";
import { SiQiita } from "react-icons/si";

import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import type { ArticlePlatform } from "./articles";

type IconType = ElementType<{ className?: string }>;

export type PlatformTheme = {
  key: ArticlePlatform;
  Icon: IconType;
};

export const PLATFORM_THEMES: PlatformTheme[] = [
  { key: "Zenn", Icon: ZennIcon },
  { key: "Qiita", Icon: SiQiita },
];

import type { FC, SVGProps } from "react";
import GithubIcon from "../../assets/icons/socials/github.svg?react";
import XIcon from "../../assets/icons/socials/x.svg?react";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import QiitaIcon from "../../assets/icons/socials/qiita.svg?react";
import NoteIcon from "../../assets/icons/socials/note.svg?react";
import { SOCIAL_LINKS } from "../../mydata/data";
import type { SocialIconName } from "../../types";

const socialIconProps = {
  className: "h-5 w-5",
};

type SocialIcon = FC<SVGProps<SVGSVGElement>>;

const socialIcons = {
  Github: GithubIcon,
  X: XIcon,
  Zenn: ZennIcon,
  Qiita: QiitaIcon,
  Note: NoteIcon,
} satisfies Record<SocialIconName, SocialIcon>;

const Socials: FC = () => {
  return (
    <ul className="mt-3 flex gap-3">
      {SOCIAL_LINKS.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.url}>
            <a
              href={social.url}
              title={social.name}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white [&_path]:fill-current"
            >
              <Icon {...socialIconProps} />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Socials;

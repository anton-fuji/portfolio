import type { FC } from "react";
import GithubIcon from "../../assets/icons/socials/github.svg?react";
import XIcon from "../../assets/icons/socials/x.svg?react";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import QiitaIcon from "../../assets/icons/socials/qiita.svg?react";
import NoteIcon from "../../assets/icons/socials/note.svg?react";

const socialIconProps = {
  className: "h-5 w-5",
};

const socials = [
  {
    name: "GitHub",
    icon: <GithubIcon {...socialIconProps} />,
    href: "https://github.com/anton-fuji",
  },
  {
    name: "X",
    icon: <XIcon {...socialIconProps} />,
    href: "https://x.com/sXq7XBrxuB87199",
  },
  {
    name: "Zenn",
    icon: <ZennIcon {...socialIconProps} />,
    href: "https://zenn.dev/fuuji",
  },
  {
    name: "Qiita",
    icon: <QiitaIcon {...socialIconProps} />,
    href: "https://qiita.com/fujifuji1414",
  },
  {
    name: "Note",
    icon: <NoteIcon {...socialIconProps} />,
    href: "https://note.com/mochi_mochi777",
  },
];

const Socials: FC = () => {
  return (
    <ul className="mt-3 flex gap-3">
      {socials.map((social) => (
        <li key={social.href}>
          <a
            href={social.href}
            title={social.name}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white [&_path]:fill-current"
          >
            {social.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;

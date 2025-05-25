import type { FC } from "react";
import GithubIcon from "../../assets/icons/socials/github.svg?react";
import XIcon from "../../assets/icons/socials/x.svg?react";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import NoteIcon from "../../assets/icons/socials/note.svg?react";

const socialIconProps = {
  className: "text-white w-9 h-10 hover:opacity-80 transition",
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
    name: "Note",
    icon: <NoteIcon {...socialIconProps} />,
    href: "https://note.com/easy_dolphin1414",
  },
];

const Socials: FC = () => {
  return (
    <ul className="flex gap-4 mt-1">
      {socials.map((social) => (
        <li key={social.href}>
          <a
            href={social.href}
            title={social.name}
            target="_blank"
            rel="noreferrer noopener"
          >
            {social.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;

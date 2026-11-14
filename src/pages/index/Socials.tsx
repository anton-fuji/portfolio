import { QrCode, X } from "lucide-react";
import { useEffect, useId, useState, type ElementType, type FC } from "react";
import { SiNote, SiQiita } from "react-icons/si";

import portfolioQr from "../../assets/cat-qr.png";
import GithubIcon from "../../assets/icons/socials/github.svg?react";
import XIcon from "../../assets/icons/socials/x.svg?react";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import { useTranslation } from "../../i18n";
import { SOCIAL_LINKS } from "../../mydata/data";
import type { SocialIconName } from "../../types";

const socialIconProps = {
  className: "h-4 w-4",
};

const pillClassName =
  "inline-flex h-11 items-center gap-2 rounded-full border border-face/16 px-4 text-sm font-bold text-face/82 transition-colors hover:border-face hover:bg-face hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink [&_path]:fill-current";

type SocialIcon = ElementType<{ className?: string }>;

const socialIcons = {
  Github: GithubIcon,
  X: XIcon,
  Zenn: ZennIcon,
  Qiita: SiQiita,
  Note: SiNote,
} satisfies Record<SocialIconName, SocialIcon>;

const Socials: FC = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const titleId = useId();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isQrOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsQrOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQrOpen]);

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {SOCIAL_LINKS.map((social) => {
          const Icon = socialIcons[social.icon];
          return (
            <li key={social.url}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className={pillClassName}
              >
                <Icon {...socialIconProps} />
                <span>{social.name}</span>
              </a>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isQrOpen}
            onClick={() => setIsQrOpen(true)}
            className={pillClassName}
          >
            <QrCode className="h-4 w-4" aria-hidden="true" />
            <span>QR</span>
          </button>
        </li>
      </ul>

      {isQrOpen && (
        <dialog
          open
          aria-labelledby={titleId}
          onCancel={() => setIsQrOpen(false)}
          className="fixed inset-0 z-[80] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-transparent px-4 py-8 text-left"
        >
          <button
            type="button"
            aria-label={t.menu.close}
            onClick={() => setIsQrOpen(false)}
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-face/12 bg-ink p-6 text-face">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={titleId} className="text-lg font-bold">
                {t.home.qrTitle}
              </h2>
              <button
                type="button"
                aria-label={t.menu.close}
                onClick={() => setIsQrOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-face/16 text-face/70 transition-colors hover:bg-face hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-[1.5rem] bg-face p-4">
              <img
                src={portfolioQr}
                alt={t.home.qrAlt}
                className="mx-auto aspect-square w-full max-w-[280px]"
              />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Socials;

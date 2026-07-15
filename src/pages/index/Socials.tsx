import { QrCode, X } from "lucide-react";
import { useEffect, useId, useState, type ElementType, type FC } from "react";
import portfolioQr from "../../assets/cat-qr.png";
import GithubIcon from "../../assets/icons/socials/github.svg?react";
import XIcon from "../../assets/icons/socials/x.svg?react";
import ZennIcon from "../../assets/icons/socials/zenn.svg?react";
import { useTranslation } from "../../i18n";
import { SOCIAL_LINKS } from "../../mydata/data";
import type { SocialIconName } from "../../types";
import { SiNote, SiQiita } from "react-icons/si";

const socialIconProps = {
  className: "h-5 w-5",
};

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
      <div className="mt-3 flex flex-col items-center gap-3 lg:items-start">
        <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
          {SOCIAL_LINKS.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.url} className="group/social h-11 w-11">
                <a
                  href={social.url}
                  title={social.name}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-300/[0.05] text-cyan-50/78 opacity-100 transition group-hover/social:-translate-y-0.5 group-hover/social:border-cyan-200/40 group-hover/social:bg-cyan-300/[0.12] group-hover/social:text-white hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 [&_path]:fill-current"
                >
                  <Icon {...socialIconProps} />
                </a>
              </li>
            );
          })}
          <li className="group/social h-11 w-11">
            <button
              type="button"
              title={t.home.qrTitle}
              aria-haspopup="dialog"
              aria-expanded={isQrOpen}
              onClick={() => setIsQrOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-300/[0.05] text-cyan-50/78 transition group-hover/social:-translate-y-0.5 group-hover/social:border-cyan-200/40 group-hover/social:bg-cyan-300/[0.12] group-hover/social:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <QrCode className="h-5 w-5" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </div>

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
            className="absolute inset-0 bg-slate-950/78 backdrop-blur-xl"
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-white/10 bg-[#07151d]/95 p-5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={titleId} className="text-lg font-semibold">
                {t.home.qrTitle}
              </h2>
              <button
                type="button"
                aria-label={t.menu.close}
                onClick={() => setIsQrOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-lg bg-white p-3">
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

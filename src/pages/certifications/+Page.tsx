import BackgroundGlobe from "../../components/BackgroundGlobe";
import { useTranslation } from "../../i18n";
import { CERTIFICATIONS } from "../../mydata/certifications";

export { Page };

const englishMonthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatCertificationDate = (date: string, language: "ja" | "en") => {
  const match = date.match(/^(\d{4})-(\d{2})$/);
  if (!match) return date;

  const year = match[1];
  const month = Number(match[2]);
  if (month < 1 || month > 12) return date;

  if (language === "ja") {
    return `${year}年${month}月`;
  }

  return `${englishMonthLabels[month - 1]} ${year}`;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

function Page() {
  const { language, t, text } = useTranslation();
  const categories = Array.from(new Set(CERTIFICATIONS.map((cert) => cert.category)));

  return (
    <>
      <BackgroundGlobe />
      <div className="mx-auto w-full max-w-6xl px-4 py-16 font-geist sm:px-8 lg:px-10 lg:py-24">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.045em] text-face">
          {t.certifications.title}
        </h1>

        <div className="mt-14 flex flex-col gap-16 lg:mt-20 lg:gap-20">
          {categories.map((category) => {
            const certs = CERTIFICATIONS.filter((cert) => cert.category === category).sort((a, b) =>
              b.date.localeCompare(a.date),
            );

            return (
              <section key={category} aria-labelledby={`certs-${category}`}>
                <h2
                  id={`certs-${category}`}
                  className="text-2xl font-semibold tracking-[-0.03em] text-face"
                >
                  {category}
                </h2>

                <ul className="mt-6 border-t border-face/12">
                  {certs.map((cert) => {
                    const name = text(cert.name);
                    const row = (
                      <>
                        {cert.imageUrl ? (
                          <img
                            src={cert.imageUrl}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="h-12 w-12 shrink-0 object-contain"
                          />
                        ) : null}
                        <span className="min-w-0 flex-1 text-base leading-snug text-face/85 sm:text-lg">
                          {name}
                        </span>
                        <time
                          dateTime={cert.date}
                          className="shrink-0 text-sm tabular-nums text-face/45"
                        >
                          {formatCertificationDate(cert.date, language)}
                        </time>
                      </>
                    );

                    return (
                      <li key={`${name}-${cert.date}`} className="border-b border-face/12">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 py-4 transition-colors hover:[&>span]:text-face sm:gap-5 ${focusRing}`}
                          >
                            {row}
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 py-4 sm:gap-5">{row}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

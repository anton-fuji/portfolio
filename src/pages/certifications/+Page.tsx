import BackgroundGlobe from "../../components/BackgroundGlobe";
import GlareHover from "../../components/GlareHover";
import SpotlightCard from "../../components/SpotlightCard";
import { CERTIFICATIONS } from "../../mydata/certifications";

export { Page };

function Page() {
  const categories = Array.from(new Set(CERTIFICATIONS.map((c) => c.category)));

  const getCertificationsByCategory = (category: string) => {
    return CERTIFICATIONS.filter((c) => c.category === category);
  };

  return (
    <>
      <BackgroundGlobe />
      <div className="px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <header>
            <p className="mb-4 text-xs font-medium tracking-[0.28em] text-gray-500 uppercase">
              Credentials
            </p>
            <h1 className="text-4xl font-medium tracking-normal text-white sm:text-5xl">
              Certifications
            </h1>
          </header>

          {categories.map((category) => {
            const certs = getCertificationsByCategory(category);
            return (
              <section key={category} className="space-y-6">
                <div className="border-white/10 border-b pb-3">
                  <h2 className="text-sm font-medium tracking-[0.2em] text-gray-300 uppercase">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {certs.map((cert) => (
                    <GlareHover
                      key={cert.name}
                      className="h-full rounded-lg"
                      glareColor="#3ea8ff"
                      glareOpacity={0.22}
                      glareSize={240}
                    >
                      <SpotlightCard
                        spotlightColor="rgba(62, 168, 255, 0.18)"
                        className="group flex h-full min-h-[260px] flex-col gap-5 border-gray-600/30 p-5 transition-shadow duration-300 hover:shadow-[0_0_24px_-8px_rgba(62,168,255,0.55)]"
                      >
                        <div className="relative flex h-28 items-center justify-center">
                          <span className="absolute inset-x-8 top-1/2 h-16 -translate-y-1/2 rounded-full bg-sky-300/6 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                          {cert.imageUrl ? (
                            <img
                              src={cert.imageUrl}
                              alt={cert.name}
                              className="relative max-h-28 max-w-44 object-contain opacity-90 grayscale-[18%] transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                            />
                          ) : (
                            <div className="relative grid h-22 w-40 place-items-center border border-white/15 bg-black/35 shadow-[inset_0_0_24px_rgba(255,255,255,0.035)]">
                              <span className="absolute top-3 left-3 h-px w-7 bg-white/25" />
                              <span className="absolute right-3 bottom-3 h-px w-7 bg-white/25" />
                              <div className="text-center">
                                <p className="text-[10px] font-medium tracking-[0.28em] text-gray-500">
                                  FE CERTIFIED
                                </p>
                                <p className="mt-1.5 text-4xl font-medium tracking-[0.16em] text-white">
                                  IPA
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex grow flex-col text-center">
                          {cert.credentialUrl ? (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white transition-colors hover:text-gray-300"
                            >
                              <h3 className="text-[17px] leading-snug font-medium">
                                {cert.name}
                              </h3>
                            </a>
                          ) : (
                            <h3 className="text-[17px] leading-snug font-medium">
                              {cert.name}
                            </h3>
                          )}

                          <div className="mt-auto flex items-center justify-between border-white/10 border-t pt-4">
                            <span className="text-[10px] font-medium tracking-[0.22em] text-gray-600 uppercase">
                              Issued
                            </span>
                            <span className="text-sm text-gray-300">
                              {cert.date}
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </GlareHover>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

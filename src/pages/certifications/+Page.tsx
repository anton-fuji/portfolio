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
                <div className="border-blue-400/14 border-b pb-3">
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
                        className="group flex h-full min-h-65 flex-col gap-5 border-blue-600/18 bg-black/15 p-5 shadow-xl/5 backdrop-blur-sm transition-shadow duration-300 hover:border-blue-500/25 hover:bg-black/25 hover:shadow-[0_0_24px_-10px_rgba(37,99,235,0.36)]"
                      >
                        <div className="relative flex h-28 items-center justify-center">
                          <span className="absolute inset-x-8 top-1/2 h-16 -translate-y-1/2 rounded-full bg-sky-300/6 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                          {cert.imageUrl ? (
                            <div className="relative grid h-28 w-28 place-items-center">
                              <img
                                src={cert.imageUrl}
                                alt={cert.name}
                                className="h-full w-full object-contain opacity-90 grayscale-18 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                              />
                            </div>
                          ) : (
                            <div className="relative grid h-24 w-44 place-items-center overflow-hidden border border-blue-600/18 bg-[linear-gradient(145deg,rgba(30,64,175,0.08),rgba(15,23,42,0.07)_42%,rgba(0,0,0,0.12)_100%)] shadow-[inset_0_0_0_1px_rgba(37,99,235,0.055),inset_0_0_30px_rgba(37,99,235,0.035)]">
                              <span className="absolute top-3 left-3 h-px w-8 bg-blue-400/24" />
                              <span className="absolute right-3 bottom-3 h-px w-8 bg-blue-400/24" />
                              <span className="absolute top-3 right-3 h-8 w-px bg-blue-600/14" />
                              <span className="absolute bottom-3 left-3 h-8 w-px bg-blue-600/14" />
                              <div className="text-center">
                                <p className="text-[10px] font-medium tracking-[0.28em] text-gray-500">
                                  FE
                                </p>
                                <p
                                  className="mt-1.5 bg-linear-to-br from-white via-sky-100 to-slate-400 bg-clip-text text-[42px] leading-none font-bold tracking-[0.12em] text-transparent"
                                  style={{
                                    fontFamily:
                                      '"VAG Rounded", "Arial Rounded MT Bold", "Arial Rounded MT", "Helvetica Rounded", Arial, sans-serif',
                                  }}
                                >
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

                          <div className="mt-auto border-blue-400/14 border-t pt-4">
                            <p className="text-[11px] font-medium tracking-[0.22em] text-blue-100/45 uppercase">
                              Issued · {cert.date}
                            </p>
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

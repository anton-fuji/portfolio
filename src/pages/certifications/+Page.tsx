import Card from "../../components/Card";
import BackgroundGlobe from "../../components/BackgroundGlobe";
import { FaAward, FaCertificate } from "react-icons/fa6";
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
      <div className="space-y-16 py-20">
        {categories.map((category) => {
          const certs = getCertificationsByCategory(category);
          return (
            <section key={category}>
              <div className="flex items-center gap-2 mb-6 px-15">
                <FaAward className="w-6 h-6 text-white" />
                <h2 className="text-3xl font-bold text-white">
                  Certifications
                </h2>
              </div>
              <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center-safe">
                  {certs.map((cert) => (
                    <Card
                      key={cert.name}
                      className="flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                      <div className="mb-4 flex items-center justify-center min-h-[180px]">
                        <img
                          src={cert.imageUrl}
                          alt={cert.name}
                          className="max-w-[200px] max-h-[180px] object-contain rounded-lg"
                        />
                      </div>

                      <div className="space-y-2 flex-grow">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-400 transition-colors"
                          >
                            <h3 className="text-xl font-medium">{cert.name}</h3>
                          </a>
                        ) : (
                          <h3 className="text-xl font-medium text-white">
                            {cert.name}
                          </h3>
                        )}

                        <p className="text-gray-400 text-sm">
                          {cert.organization}
                        </p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm pt-2">
                          <FaCertificate className="w-4 h-4" />
                          <span>取得日: {cert.date}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

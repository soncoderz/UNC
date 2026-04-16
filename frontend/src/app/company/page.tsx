"use client";

import Button from "@/components/common/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function CompanyPage() {
  const { t } = useLanguage();
  const milestones = [
    { year: "2011", event: t("company.milestone2011") },
    { year: "2014", event: t("company.milestone2014") },
    { year: "2017", event: t("company.milestone2017") },
    { year: "2019", event: t("company.milestone2019") },
    { year: "2022", event: t("company.milestone2022") },
    { year: "2025", event: t("company.milestone2025") },
  ];

  const certifications = [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "IEC 62109-1/2",
    "IEC 62619",
    "UL 1741",
    "CE Mark",
    "TÜV Rheinland",
    "UN 38.3",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            {t("company.heroTitle")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("company.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                {t("company.storyTitle")}
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                {t("company.storyP1")}
              </p>
              <p className="text-gray leading-relaxed mb-6">
                {t("company.storyP2")}
              </p>
              <Button href="/contact" variant="primary">
                {t("company.partnerCta")}
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl h-80 flex items-center justify-center">
              <span className="text-8xl opacity-30">🏭</span>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">{t("company.journeyTitle")}</h2>
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="flex items-center gap-6 group"
              >
                <div className="w-20 text-right">
                  <span className="font-heading font-bold text-xl text-primary">
                    {milestone.year}
                  </span>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                <div className="flex-1 bg-white rounded-xl p-4 border border-gray-light/50 group-hover:shadow-md group-hover:border-primary/30 transition-all">
                  <p className="text-dark font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">{t("company.certificationsTitle")}</h2>
          <p className="section-subtitle">
            {t("company.certificationsSubtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-4 bg-light rounded-xl border border-gray-light/50 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-dark">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Button from "@/components/common/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function SupportPage() {
  const { t } = useLanguage();
  const resources = [
    {
      icon: "📄",
      title: t("support.datasheetsTitle"),
      description: t("support.datasheetsDescription"),
      action: t("support.datasheetsAction"),
    },
    {
      icon: "📘",
      title: t("support.manualsTitle"),
      description: t("support.manualsDescription"),
      action: t("support.manualsAction"),
    },
    {
      icon: "💻",
      title: t("support.softwareTitle"),
      description: t("support.softwareDescription"),
      action: t("support.softwareAction"),
    },
    {
      icon: "🎥",
      title: t("support.videosTitle"),
      description: t("support.videosDescription"),
      action: t("support.videosAction"),
    },
    {
      icon: "❓",
      title: t("support.faqTitle"),
      description: t("support.faqDescription"),
      action: t("support.faqAction"),
    },
    {
      icon: "🎓",
      title: t("support.trainingTitle"),
      description: t("support.trainingDescription"),
      action: t("support.trainingAction"),
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            {t("support.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("support.subtitle")}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group bg-white rounded-2xl border border-gray-light/50 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-primary/20 transition-colors">
                  {resource.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed mb-5">
                  {resource.description}
                </p>
                <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1">
                  {resource.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-dark mb-4">
            {t("support.directTitle")}
          </h2>
          <p className="text-gray mb-8">
            {t("support.directText")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              {t("support.contactTeam")}
            </Button>
            <Button href="tel:+842812345678" variant="outline" size="lg">
              📞 {t("support.callHotline")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

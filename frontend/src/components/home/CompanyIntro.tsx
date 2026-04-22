"use client";

import Button from "@/components/common/Button";
import { useLanguage } from "@/context/LanguageContext";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import FadeIn from "@/components/animations/FadeIn";

/**
 * CompanyIntro - Giới thiệu công ty trên trang chủ
 */
export default function CompanyIntro() {
  const { t } = useLanguage();

  const values = [
    {
      icon: "💡",
      title: "Innovation",
      description:
        "Cutting-edge R&D pushing the boundaries of solar technology with AI-powered MPPT and smart grid integration.",
    },
    {
      icon: "🛡️",
      title: "Quality & Reliability",
      description:
        "Rigorous testing under extreme conditions. TÜV Rheinland, UL, and IEC certified for global deployment.",
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description:
        "Committed to a carbon-neutral future with products that maximize renewable energy harvest.",
    },
    {
      icon: "🤝",
      title: "Customer Focus",
      description:
        "24/7 technical support, comprehensive training programs, and dedicated account management worldwide.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SlideIn direction="up" distance={30} className="text-center mb-16">
          <h2 className="section-title">{t("company.title")}</h2>
          <p className="section-subtitle">
            {t("company.subtitle")}
          </p>
        </SlideIn>

        {/* Values Grid */}
        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {values.map((value) => (
            <div
              key={value.title}
              className="group p-6 rounded-2xl border border-gray-light/50 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                {value.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-dark mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn delay={0.3} className="text-center">
          <Button href="/company" variant="outline">
            {t("common.learnMore")}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

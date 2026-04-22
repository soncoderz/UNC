"use client";

import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import {
  aboutNav,
  companyStats,
  cultureItems,
  innerBanners,
  innerMobileBanners,
} from "@/data/uniconvtor";

const certifications = [
  "ISO9001",
  "ISO14001",
  "CQC",
  "TUV",
  "RoHS",
  "CE",
  "IEC",
  "UN38.3",
];

export default function CompanyPage() {
  const { t } = useLanguage();

  const milestones: [string, string][] = [
    ["2021", t("company.milestone2021")],
    ["2022", t("company.milestone2022")],
    ["2023", t("company.milestone2023")],
    ["2024", t("company.milestone2024")],
    ["2025", t("company.milestone2025")],
  ];

  return (
    <>
      <InnerHero
        title={t("company.title")}
        subtitle={t("company.heroSubtitle")}
        image={innerBanners.about}
        mobileImage={innerMobileBanners.about}
      />
      <InnerNav items={aboutNav} activeHref="/company#intro" />

      <section id="intro" className="clone-about-intro">
        <SectionTitle title={t("company.storyTitle")} />
        <div className="clone-about-main">
          <div className="clone-about-copy">
            <p>{t("company.introP1")}</p>
            <p>{t("company.introP2")}</p>
            <p>{t("company.introP3")}</p>
            <p>{t("company.introP4")}</p>
          </div>
          <div className="clone-about-image">
            <RemoteImage
              src="/static/upload/image/20240718/1721281765694056.png"
              alt="UNC company introduction"
              width={560}
              height={420}
              sizes="(max-width: 900px) 90vw, 560px"
            />
          </div>
        </div>

        <div className="clone-stat-grid clone-about-stats">
          {companyStats.map((stat) => (
            <div key={stat.label} className="clone-stat-card">
              <RemoteImage src={stat.icon} alt="" width={54} height={54} />
              <div>
                <strong>
                  {stat.value}
                  <sup>{stat.suffix}</sup>
                </strong>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="clone-culture">
        <SectionTitle title={t("company.cultureTitle")} />
        <div className="clone-culture-grid">
          {cultureItems.map((item) => (
            <article key={item.title}>
              <RemoteImage src={item.image} alt="" width={76} height={76} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="milestone" className="clone-milestone">
        <SectionTitle title={t("company.journeyTitle")} />
        <div className="clone-milestone-line">
          {milestones.map(([year, text]) => (
            <div key={year}>
              <strong>{year}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="honor" className="clone-honor">
        <SectionTitle
          title={t("company.certificationsTitle")}
          subtitle={t("company.certificationsSubtitle")}
        />
        <div className="clone-honor-grid">
          {certifications.map((certification) => (
            <span key={certification}>{certification}</span>
          ))}
        </div>
      </section>
    </>
  );
}

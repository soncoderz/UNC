"use client";

import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import { innerBanners, rndNav } from "@/data/uniconvtor";

const workshopImages = [
  "/static/upload/image/20240723/1721723513538560.jpg",
  "/static/upload/image/20240723/1721723476312335.jpg",
  "/static/upload/image/20240723/1721723465926138.jpg",
  "/static/upload/image/20240723/1721723296458698.png",
  "/static/upload/image/20240723/1721723249229423.png",
  "/static/upload/image/20240723/1721723196249863.png",
];

export default function RndPage() {
  const { t } = useLanguage();

  const researchStats: [string, string][] = [
    ["2", t("rnd.doctoralDegree")],
    ["17+", t("rnd.masterDegree")],
    ["100+", t("rnd.patent")],
    ["10+", t("rnd.industryExperience")],
    ["5+", t("rnd.standard")],
  ];

  const produceStats: [string, string][] = [
    ["400+", t("rnd.labArea")],
    ["30KW", t("rnd.hybridDev")],
    ["630KW", t("rnd.pcsDev")],
    ["110KW", t("rnd.pvDev")],
  ];

  const qualityItems = [
    { title: t("rnd.qualityRD"), text: t("rnd.qualityRDText") },
    { title: t("rnd.qualityAfterSale"), text: t("rnd.qualityAfterSaleText") },
    { title: t("rnd.qualityInspection"), text: t("rnd.qualityInspectionText") },
    { title: t("rnd.qualityProduction"), text: t("rnd.qualityProductionText") },
  ];

  return (
    <>
      <InnerHero
        title={t("rnd.pageTitle")}
        subtitle={t("rnd.pageSubtitle")}
        image={innerBanners.rnd}
      />
      <InnerNav items={rndNav} activeHref="/rnd#research" />

      <section id="research" className="clone-rnd-research">
        <SectionTitle
          title={t("nav.rndCapabilities")}
          subtitle={t("rnd.researchSubtitle")}
        />
        <p>{t("rnd.researchText")}</p>
        <div className="clone-rnd-ring">
          <div className="clone-rnd-stats">
            {researchStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="clone-rnd-center">
            <RemoteImage
              src="/template/default/esimg/img/research-yuanhuan.png"
              alt="R&D capability ring"
              width={340}
              height={340}
            />
            <RemoteImage
              src="/template/default/esimg/img/research-yuanxin.png"
              alt="R&D capability core"
              width={130}
              height={130}
            />
          </div>
        </div>
      </section>

      <section id="produce" className="clone-rnd-produce">
        <SectionTitle
          title={t("nav.batchProduction")}
          subtitle={t("rnd.produceSubtitle")}
        />
        <p>{t("rnd.produceText")}</p>
        <div className="clone-rnd-produce-grid">
          {produceStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="clone-workshop-grid">
          {workshopImages.map((image) => (
            <RemoteImage
              key={image}
              src={image}
              alt={t("rnd.workshopAlt")}
              width={360}
              height={230}
              sizes="(max-width: 900px) 90vw, 360px"
            />
          ))}
        </div>
      </section>

      <section id="quality" className="clone-rnd-quality">
        <SectionTitle
          title={t("nav.qualityAssurance")}
          subtitle={t("rnd.qualitySubtitle")}
        />
        <p>{t("rnd.qualityText")}</p>
        <RemoteImage
          src="/template/default/esimg/img/research-renzheng.png"
          alt="UNC certifications"
          width={980}
          height={220}
          sizes="90vw"
        />
        <div className="clone-quality-main">
          <div>
            {qualityItems.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <RemoteImage
            src="/template/default/esimg/img/research-pinzhi.png"
            alt="UNC quality assurance"
            width={420}
            height={420}
          />
        </div>
      </section>
    </>
  );
}

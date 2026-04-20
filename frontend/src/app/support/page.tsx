"use client";

import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import {
  afterSaleImages,
  innerBanners,
  innerMobileBanners,
  serviceSystem,
  supportNav,
  supportServices,
} from "@/data/uniconvtor";

const serviceSystemPositions = [
  "left1",
  "left2",
  "right1",
  "right2",
  "bottom",
] as const;

export default function SupportPage() {
  const { t } = useLanguage();

  return (
    <>
      <InnerHero
        title={t("support.pageTitle")}
        subtitle={t("support.pageSubtitle")}
        image={innerBanners.support}
        mobileImage={innerMobileBanners.support}
      />
      <InnerNav items={supportNav} activeHref="/support#technical" />

      <section id="technical" className="clone-support-tech">
        <SectionTitle title={t("nav.technicalSupport")} />
        <div className="clone-support-shape">
          <RemoteImage
            src="/template/default/esimg/img/service-shape-bgs.png"
            alt="Technical support process"
            width={980}
            height={360}
            sizes="90vw"
          />
        </div>
        <p>{t("support.techText1")}</p>
        <h3>{t("support.techServicesTitle")}</h3>
        <div className="clone-support-service-grid">
          {supportServices.map((service) => (
            <article key={service.title}>
              <RemoteImage src={service.image} alt="" width={86} height={86} />
              <h4>{service.title}</h4>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="afterSales" className="clone-support-after">
        <SectionTitle title={t("nav.postSale")} />
        <p>{t("support.afterSalesText")}</p>
        <div className="clone-after-images">
          {afterSaleImages.map((image) => (
            <RemoteImage
              key={image}
              src={image}
              alt={t("nav.postSale")}
              width={360}
              height={230}
              sizes="(max-width: 900px) 90vw, 360px"
            />
          ))}
        </div>

        <div className="clone-service-system">
          <RemoteImage
            src="/template/default/esimg/img/service-tixi-bg.png"
            alt="After-sale service system"
            width={820}
            height={520}
            sizes="(max-width: 900px) 90vw, 820px"
            className="clone-service-system-bg"
          />
          {serviceSystem.map((item, index) => (
            <article
              key={item.title}
              className={`clone-service-system-card is-${serviceSystemPositions[index]}`}
            >
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

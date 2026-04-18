"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { companyStats } from "@/data/uniconvtor";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useLanguage } from "@/context/LanguageContext";

export default function RndSection() {
  const { t } = useLanguage();
  return (
    <section className="main ind-manufacture overflow-hidden" id="rnd">
      <div className="ind-manuContent">
        <SlideIn direction="right" distance={50} className="ind-manuTitle">
          <div className="title1">
            <h3 className="text-4xl">{t("home.rndTitle")}</h3>
            <h6 className="text-base">{t("home.rndSubtitle")}</h6>
          </div>
          <div className="ind-manuText text-base">
            {t("home.rndParagraph1")}<br />
            {t("home.rndParagraph2")}<br />
            {t("home.rndParagraph3")}
          </div>
          <Link href="/rnd" className="btn1 text-base">
            {t("common.more")}
          </Link>
        </SlideIn>

        <SlideIn direction="left" distance={50} className="ind-manuImg">
          <RemoteImage
            src="/static/upload/image/20240715/1721025415175397.png"
            alt="R&D and manufacturing certificates"
            width={620}
            height={440}
            sizes="(max-width: 900px) 90vw, 620px"
          />
        </SlideIn>
      </div>

      <StaggerContainer staggerChildren={0.15} className="ind-manuUl">
        {companyStats.map((stat) => (
          <div key={stat.label} className="ind-manuLi">
            <RemoteImage src={stat.icon} alt="" width={100} height={100} />
            <div>
              <span>{stat.value}</span>
              <i className="text-sm">{stat.label}</i>
            </div>
          </div>
        ))}
      </StaggerContainer>
    </section>
  );
}

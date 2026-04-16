"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { companyStats } from "@/data/uniconvtor";
import { useLanguage } from "@/context/LanguageContext";

export default function RndSection() {
  const { t } = useLanguage();

  return (
    <section className="clone-manufacture" id="rnd">
      <div className="clone-manufacture-main">
        <div className="clone-manufacture-copy">
          <div className="clone-title clone-title-left">
            <h2>{t("home.rndTitle")}</h2>
            <p>{t("home.rndSubtitle")}</p>
          </div>
          <div className="clone-manufacture-text">
            <p>{t("home.rndParagraph1")}</p>
            <p>{t("home.rndParagraph2")}</p>
            <p>{t("home.rndParagraph3")}</p>
          </div>
          <Link href="/rnd" className="btn-orange">
            {t("common.more")}
          </Link>
        </div>

        <div className="clone-manufacture-image">
          <RemoteImage
            src="/static/upload/image/20240715/1721025415175397.png"
            alt="R&D and manufacturing certificates"
            width={620}
            height={440}
            sizes="(max-width: 900px) 90vw, 620px"
          />
        </div>
      </div>

      <div className="clone-stat-grid">
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
  );
}

"use client";

import Link from "next/link";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import {
  innerBanners,
  innerMobileBanners,
  solutions,
  type SolutionSlug,
} from "@/data/uniconvtor";

const solutionTitleKeys: Record<SolutionSlug, string> = {
  household: "nav.solutionHousehold",
  commercial: "nav.solutionCommercial",
  photovoltaic: "nav.solutionPhotovoltaic",
};

const solutionDescriptionKeys: Record<SolutionSlug, string> = {
  household: "home.householdSolutionDescription",
  commercial: "home.commercialSolutionDescription",
  photovoltaic: "home.photovoltaicSolutionDescription",
};

export default function SolutionsPage() {
  const { t } = useLanguage();

  return (
    <div className="clone-solutions-page">
      <InnerHero
        title={t("nav.solutions")}
        subtitle={t("home.solutionsSubtitle")}
        image={innerBanners.solutions}
        mobileImage={innerMobileBanners.solutions}
        className="clone-solutions-hero"
      />

      <section className="clone-case-list clone-solutions-case-list">
        {solutions.map((solution) => (
          <Link href={`/solutions/${solution.slug}`} key={solution.slug} className="clone-case-link">
            <article className="clone-case-item">
              <div className="clone-case-copy">
                <h2>
                  <RemoteImage src={solution.iconHover} alt="" width={42} height={42} />
                  {t(solutionTitleKeys[solution.slug])}
                </h2>
                <p>{t(solutionDescriptionKeys[solution.slug])}</p>
                <span className="clone-case-btn">MORE</span>
              </div>
              <div className="clone-case-image">
                <RemoteImage
                  src={solution.image}
                  alt={solution.title}
                  width={560}
                  height={330}
                  sizes="(max-width: 900px) 90vw, 560px"
                />
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import { asset, solutions } from "@/data/uniconvtor";

export default function SolutionSection() {
  const [activeSolution, setActiveSolution] = useState(0);
  const { t } = useLanguage();
  const active = solutions[activeSolution];

  return (
    <section className="clone-programme" id="solutions">
      <div className="clone-title">
        <h2>{t("home.solutionsTitle")}</h2>
        <p>{t("home.solutionsSubtitle")}</p>
      </div>

      <div className="clone-programme-main">
        <div className="clone-programme-list">
          {solutions.map((solution, index) => (
            <article
              key={solution.slug}
              className={`clone-programme-item ${
                activeSolution === index ? "is-active" : ""
              }`}
              onMouseEnter={() => setActiveSolution(index)}
            >
              <div className="clone-programme-heading">
                <RemoteImage src={solution.icon} alt="" width={48} height={48} />
                <h3>{solution.title}</h3>
              </div>
              {activeSolution === index ? (
                <div className="clone-programme-text">
                  <p>{solution.description}</p>
                  <Link href={`/solutions/${solution.slug}`} className="btn-orange">
                    {t("common.more")}
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="clone-programme-media">
          <video
            key={active.video}
            autoPlay
            muted
            loop
            playsInline
            poster={asset(active.poster)}
          >
            <source src={asset(active.video)} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

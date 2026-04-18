"use client";

import Link from "next/link";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import { cloneNews, innerBanners } from "@/data/uniconvtor";

export default function NewsPage() {
  const { t } = useLanguage();

  return (
    <>
      <InnerHero
        title={t("home.corporateNews")}
        subtitle="UNC a new driving force for green energy"
        image={innerBanners.news}
        current={t("home.corporateNews")}
      />

      <section className="clone-news-page">
        <SectionTitle title={t("home.corporateNews")} />
        <div className="clone-news-grid">
          {cloneNews.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`} className="clone-news-card">
              <span className="clone-news-image">
                <RemoteImage
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 31vw"
                />
              </span>
              <span className="clone-news-time">{article.date}</span>
              <strong>{article.title}</strong>
              <em>{article.category}</em>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

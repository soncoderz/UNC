"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneNews, innerBanners, innerMobileBanners } from "@/data/uniconvtor";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsDetailClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const article = cloneNews.find((item) => item.id === id || item.slug === id);

  if (!article) {
    notFound();
  }

  const translatedTitle = t(`newsData.${article.id}.title`) !== `newsData.${article.id}.title` ? t(`newsData.${article.id}.title`) : article.title;
  const translatedExcerpt = t(`newsData.${article.id}.excerpt`) !== `newsData.${article.id}.excerpt` ? t(`newsData.${article.id}.excerpt`) : article.excerpt;
  const translatedContent = t(`newsData.${article.id}.content`) !== `newsData.${article.id}.content` ? t(`newsData.${article.id}.content`) : article.content;
  const translatedCategory = t("home.corporateNews");

  return (
    <>
      <InnerHero
        title={t("home.corporateNews")}
        subtitle={translatedTitle}
        image={innerBanners.news}
        mobileImage={innerMobileBanners.news}
        current={translatedTitle}
      />

      <article className="clone-news-detail">
        <Link href="/news" className="clone-back-link">
          &lt;- {t("home.corporateNews")}
        </Link>
        <h1>{translatedTitle}</h1>
        <div className="clone-news-meta">
          <span>{article.date}</span>
          <span>{translatedCategory}</span>
          <span>{article.author}</span>
        </div>
        <div className="clone-news-detail-image">
          <RemoteImage
            src={article.image}
            alt={translatedTitle}
            width={920}
            height={520}
            sizes="(max-width: 900px) 90vw, 920px"
          />
        </div>
        <p>{translatedExcerpt}</p>
        <p>{translatedContent}</p>
      </article>
    </>
  );
}

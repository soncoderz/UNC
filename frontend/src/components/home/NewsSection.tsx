"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneNews } from "@/data/uniconvtor";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsSection() {
  const { t } = useLanguage();
  const news = cloneNews.slice(0, 6);

  return (
    <section className="clone-news" id="news">
      <div className="clone-title">
        <h2>{t("home.corporateNews")}</h2>
      </div>

      <div className="clone-news-grid">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`} className="clone-news-card">
            <span className="clone-news-image">
              <RemoteImage
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 900px) 100vw, 31vw"
              />
            </span>
            <span className="clone-news-time">{item.date}</span>
            <strong>{item.title}</strong>
            <em>{item.category}</em>
          </Link>
        ))}
      </div>

      <div className="clone-more-row">
        <Link href="/news" className="btn-blue">
          {t("common.more")}
        </Link>
      </div>
    </section>
  );
}

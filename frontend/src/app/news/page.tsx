"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import { formatDate } from "@/utils/formatters";
import type { NewsArticle } from "@/types/api";
import { getNews } from "@/services/api";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await getNews();
        setNews(response.data || []);
      } catch {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    void fetchNews();
  }, []);

  const categoryLabels: Record<string, string> = {
    "product-launch": t("news.productLaunch"),
    certification: t("news.certification"),
    "industry-news": t("news.industryNews"),
    partnership: t("news.partnership"),
    events: t("news.events"),
  };

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            {t("news.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("news.subtitle")}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray">{t("common.loading")}</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-2xl border border-gray-light/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-5xl opacity-30">📰</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="primary" size="sm">
                        {categoryLabels[article.category] || article.category}
                      </Badge>
                      <span className="text-xs text-gray">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/news/${article.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      {t("common.readMore")} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray text-lg">{t("news.noArticles")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

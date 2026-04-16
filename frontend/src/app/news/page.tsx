import Link from "next/link";
import type { Metadata } from "next";
import Badge from "@/components/common/Badge";
import { formatDate } from "@/utils/formatters";
import type { ApiResponse, NewsArticle } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news, product launches, and industry insights from SolarTech Energy.",
};

async function getNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/news`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiResponse<NewsArticle[]>;
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  const categoryLabels: Record<string, string> = {
    "product-launch": "Product Launch",
    certification: "Certification",
    "industry-news": "Industry News",
    partnership: "Partnership",
    events: "Events",
  };

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            News & Updates
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stay informed with the latest product launches, certifications, and
            industry insights.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length > 0 ? (
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
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray text-lg">No news articles available.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { cloneNews, innerBanners } from "@/data/uniconvtor";

export default function NewsPage() {
  return (
    <>
      <InnerHero
        title="Corporate News"
        subtitle="UNC a new driving force for green energy"
        image={innerBanners.news}
        current="Corporate News"
      />

      <section className="clone-news-page">
        <SectionTitle title="Corporate News" />
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

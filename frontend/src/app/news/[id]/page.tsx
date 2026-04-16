import Link from "next/link";
import { notFound } from "next/navigation";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneNews, innerBanners } from "@/data/uniconvtor";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = cloneNews.find((item) => item.id === id || item.slug === id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <InnerHero
        title="Corporate News"
        subtitle={article.title}
        image={innerBanners.news}
        current={article.title}
      />

      <article className="clone-news-detail">
        <Link href="/news" className="clone-back-link">
          &lt;- Corporate News
        </Link>
        <h1>{article.title}</h1>
        <div className="clone-news-meta">
          <span>{article.date}</span>
          <span>{article.category}</span>
          <span>{article.author}</span>
        </div>
        <div className="clone-news-detail-image">
          <RemoteImage
            src={article.image}
            alt={article.title}
            width={920}
            height={520}
            sizes="(max-width: 900px) 90vw, 920px"
          />
        </div>
        <p>{article.excerpt}</p>
        <p>{article.content}</p>
      </article>
    </>
  );
}

export function generateStaticParams() {
  return cloneNews.map((article) => ({ id: article.id }));
}

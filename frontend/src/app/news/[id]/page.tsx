import { cloneNews } from "@/data/uniconvtor";
import NewsDetailClient from "./NewsDetailClient";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  
  return <NewsDetailClient id={id} />;
}

export function generateStaticParams() {
  return cloneNews.map((article) => ({ id: article.id }));
}

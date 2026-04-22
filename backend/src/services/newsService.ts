import { collections, getDb, isMongoConfigured } from "@/lib/mongodb";
import { ensureSeedData, getFallbackNews } from "@/services/seedService";
import type { NewsArticle } from "@/types";

/**
 * News Service - Business logic for news operations
 */

async function getNewsCollection() {
  const db = await getDb();
  return db.collection<NewsArticle>(collections.news);
}

function stripMongoId<T extends { _id?: unknown }>(document: T): Omit<T, "_id"> {
  const { _id, ...rest } = document;
  return rest;
}

async function withNewsSource<T>(operation: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!isMongoConfigured()) {
    return fallback();
  }

  await ensureSeedData();
  return operation();
}

export async function getAllNews(): Promise<NewsArticle[]> {
  return withNewsSource(async () => {
    const collection = await getNewsCollection();
    const news = await collection.find({}).sort({ date: -1 }).toArray();
    return news.map((item) => stripMongoId(item) as NewsArticle);
  }, () => [...getFallbackNews()].sort((a, b) => b.date.localeCompare(a.date)));
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  return withNewsSource(async () => {
    const collection = await getNewsCollection();
    const item = await collection.findOne({ id });
    return item ? (stripMongoId(item) as NewsArticle) : null;
  }, () => getFallbackNews().find((item) => item.id === id) || null);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return withNewsSource(async () => {
    const collection = await getNewsCollection();
    const item = await collection.findOne({ slug });
    return item ? (stripMongoId(item) as NewsArticle) : null;
  }, () => getFallbackNews().find((item) => item.slug === slug) || null);
}

export async function getFeaturedNews(): Promise<NewsArticle[]> {
  return withNewsSource(async () => {
    const collection = await getNewsCollection();
    const news = await collection.find({ isFeatured: true }).sort({ date: -1 }).toArray();
    return news.map((item) => stripMongoId(item) as NewsArticle);
  }, () => getFallbackNews().filter((item) => item.isFeatured));
}

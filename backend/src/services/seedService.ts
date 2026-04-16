import { collections, getDb, isMongoConfigured } from "@/lib/mongodb";
import { companySeed } from "@/data/company";
import newsSeedJson from "@/data/news.json";
import productsSeedJson from "@/data/products.json";
import type { CompanyInfo, NewsArticle, Product } from "@/types";

const productsSeed = productsSeedJson as unknown as Product[];
const newsSeed = newsSeedJson as NewsArticle[];

let seedPromise: Promise<void> | null = null;

async function seedMongoCollections(): Promise<void> {
  const db = await getDb();

  const products = db.collection<Product>(collections.products);
  const news = db.collection<NewsArticle>(collections.news);
  const company = db.collection<CompanyInfo>(collections.company);

  await Promise.all([
    products.createIndex({ id: 1 }, { unique: true }),
    products.createIndex({ category: 1 }),
    news.createIndex({ id: 1 }, { unique: true }),
    news.createIndex({ slug: 1 }, { unique: true }),
    company.createIndex({ id: 1 }, { unique: true }),
  ]);

  if ((await products.estimatedDocumentCount()) === 0) {
    await products.insertMany(productsSeed);
  }

  if ((await news.estimatedDocumentCount()) === 0) {
    await news.insertMany(newsSeed);
  }

  await company.updateOne(
    { id: companySeed.id },
    { $setOnInsert: companySeed },
    { upsert: true }
  );
}

export async function ensureSeedData(): Promise<void> {
  if (!isMongoConfigured() || process.env.AUTO_SEED_MONGODB === "false") {
    return;
  }

  seedPromise ??= seedMongoCollections();
  await seedPromise;
}

export function getFallbackProducts(): Product[] {
  return productsSeed;
}

export function getFallbackNews(): NewsArticle[] {
  return newsSeed;
}

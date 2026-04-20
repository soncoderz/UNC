import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "solartech_energy";

type GlobalWithMongo = typeof globalThis & {
  __solarTechMongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

let clientPromise: Promise<MongoClient> | undefined;

export const collections = {
  products: "products",
  news: "news",
  company: "company",
  contacts: "contacts",
  users: "users",
} as const;

export function isMongoConfigured(): boolean {
  return Boolean(uri);
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (process.env.NODE_ENV === "development") {
    globalWithMongo.__solarTechMongoClientPromise ??= new MongoClient(uri).connect();
    return globalWithMongo.__solarTechMongoClientPromise;
  }

  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

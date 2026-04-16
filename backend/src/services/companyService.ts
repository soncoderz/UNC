import { companySeed } from "@/data/company";
import { collections, getDb, isMongoConfigured } from "@/lib/mongodb";
import { ensureSeedData } from "@/services/seedService";
import type { CompanyInfo } from "@/types";

function stripMongoId<T extends { _id?: unknown }>(document: T): Omit<T, "_id"> {
  const { _id, ...rest } = document;
  return rest;
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (!isMongoConfigured()) {
    return companySeed;
  }

  await ensureSeedData();

  const db = await getDb();
  const company = await db.collection<CompanyInfo>(collections.company).findOne({
    id: companySeed.id,
  });

  return company ? (stripMongoId(company) as CompanyInfo) : companySeed;
}

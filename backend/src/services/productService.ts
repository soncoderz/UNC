import { collections, getDb, isMongoConfigured } from "@/lib/mongodb";
import { ensureSeedData, getFallbackProducts } from "@/services/seedService";
import { escapeRegExp } from "@/utils/helpers";
import type { Product } from "@/types";

/**
 * Product Service - Business logic for product operations
 */

async function getProductsCollection() {
  const db = await getDb();
  return db.collection<Product>(collections.products);
}

function stripMongoId<T extends { _id?: unknown }>(document: T): Omit<T, "_id"> {
  const { _id, ...rest } = document;
  return rest;
}

async function withProductSource<T>(operation: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!isMongoConfigured()) {
    return fallback();
  }

  await ensureSeedData();
  return operation();
}

// Lấy tất cả sản phẩm
export async function getAllProducts(): Promise<Product[]> {
  return withProductSource(async () => {
    const collection = await getProductsCollection();
    const products = await collection.find({}).sort({ id: 1 }).toArray();
    return products.map((product) => stripMongoId(product) as Product);
  }, getFallbackProducts);
}

// Lấy sản phẩm theo ID
export async function getProductById(id: string): Promise<Product | null> {
  return withProductSource(async () => {
    const collection = await getProductsCollection();
    const product = await collection.findOne({ id });
    return product ? (stripMongoId(product) as Product) : null;
  }, () => getFallbackProducts().find((product) => product.id === id) || null);
}

// Lấy sản phẩm theo danh mục
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return withProductSource(async () => {
    const collection = await getProductsCollection();
    const products = await collection
      .find({ category: category as Product["category"] })
      .sort({ id: 1 })
      .toArray();
    return products.map((product) => stripMongoId(product) as Product);
  }, () => getFallbackProducts().filter((product) => product.category === category));
}

// Lấy sản phẩm nổi bật
export async function getFeaturedProducts(): Promise<Product[]> {
  return withProductSource(async () => {
    const collection = await getProductsCollection();
    const products = await collection.find({ isFeatured: true }).sort({ id: 1 }).toArray();
    return products.map((product) => stripMongoId(product) as Product);
  }, () => getFallbackProducts().filter((product) => product.isFeatured));
}

// Tìm kiếm sản phẩm
export async function searchProducts(query: string): Promise<Product[]> {
  const lowerQuery = query.toLowerCase();

  return withProductSource(async () => {
    const collection = await getProductsCollection();
    const regex = new RegExp(escapeRegExp(query), "i");
    const products = await collection
      .find({
        $or: [{ name: regex }, { description: regex }, { category: regex }],
      })
      .sort({ id: 1 })
      .toArray();
    return products.map((product) => stripMongoId(product) as Product);
  }, () =>
    getFallbackProducts().filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    )
  );
}

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

// Tạo sản phẩm mới
export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
  };

  if (isMongoConfigured()) {
    await ensureSeedData();
    const collection = await getProductsCollection();
    await collection.insertOne(newProduct as Product & { _id?: unknown });
  } else {
    const { readFileSync, writeFileSync } = await import("fs");
    const { join } = await import("path");
    const filePath = join(process.cwd(), "src", "data", "products.json");
    const products = JSON.parse(readFileSync(filePath, "utf-8")) as Product[];
    products.push(newProduct);
    writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
  }

  return newProduct;
}

// Cập nhật sản phẩm
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (isMongoConfigured()) {
    await ensureSeedData();
    const collection = await getProductsCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: "after" }
    );
    return result ? (stripMongoId(result) as Product) : null;
  } else {
    const { readFileSync, writeFileSync } = await import("fs");
    const { join } = await import("path");
    const filePath = join(process.cwd(), "src", "data", "products.json");
    const products = JSON.parse(readFileSync(filePath, "utf-8")) as Product[];
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates, id };
    writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
    return products[index];
  }
}

// Xóa sản phẩm
export async function deleteProduct(id: string): Promise<boolean> {
  if (isMongoConfigured()) {
    await ensureSeedData();
    const collection = await getProductsCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  } else {
    const { readFileSync, writeFileSync } = await import("fs");
    const { join } = await import("path");
    const filePath = join(process.cwd(), "src", "data", "products.json");
    const products = JSON.parse(readFileSync(filePath, "utf-8")) as Product[];
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
}


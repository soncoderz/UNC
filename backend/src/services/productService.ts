import { collections, getDb, isMongoConfigured } from "@/lib/mongodb";
import { ensureSeedData, getFallbackProducts } from "@/services/seedService";
import { escapeRegExp, slugify } from "@/utils/helpers";
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

const PRODUCT_CATEGORIES: Product["category"][] = [
  "pv-inverters",
  "energy-storage",
  "hybrid-inverters",
];

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseFeatures(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function parseSpecs(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([key, specValue]) => [key.trim(), String(specValue ?? "").trim()])
      .filter(([key]) => Boolean(key))
  );
}

function parsePrice(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseCategory(value: unknown): Product["category"] {
  return PRODUCT_CATEGORIES.includes(value as Product["category"])
    ? (value as Product["category"])
    : "pv-inverters";
}

function normalizeProductInput(input: Partial<Product>): Omit<Product, "id"> {
  const product = {
    name: toText(input.name),
    category: parseCategory(input.category),
    subcategory: toText(input.subcategory),
    power: toText(input.power),
    description: toText(input.description),
    features: parseFeatures(input.features),
    specs: parseSpecs(input.specs),
    image: toText(input.image) || "/products/default.jpg",
    price: parsePrice(input.price),
    isNew: Boolean(input.isNew),
    isFeatured: Boolean(input.isFeatured),
  };

  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (!product.subcategory) {
    throw new Error("Product subcategory is required");
  }

  if (!product.power) {
    throw new Error("Product power is required");
  }

  if (!product.description) {
    throw new Error("Product description is required");
  }

  return product;
}

function normalizeProductUpdates(input: Partial<Product>): Partial<Product> {
  const updates: Partial<Product> = {};

  if ("name" in input) {
    const name = toText(input.name);
    if (!name) throw new Error("Product name is required");
    updates.name = name;
  }

  if ("category" in input) {
    updates.category = parseCategory(input.category);
  }

  if ("subcategory" in input) {
    const subcategory = toText(input.subcategory);
    if (!subcategory) throw new Error("Product subcategory is required");
    updates.subcategory = subcategory;
  }

  if ("power" in input) {
    const power = toText(input.power);
    if (!power) throw new Error("Product power is required");
    updates.power = power;
  }

  if ("description" in input) {
    const description = toText(input.description);
    if (!description) throw new Error("Product description is required");
    updates.description = description;
  }

  if ("features" in input) {
    updates.features = parseFeatures(input.features);
  }

  if ("specs" in input) {
    updates.specs = parseSpecs(input.specs);
  }

  if ("image" in input) {
    updates.image = toText(input.image) || "/products/default.jpg";
  }

  if ("price" in input) {
    updates.price = parsePrice(input.price);
  }

  if ("isNew" in input) {
    updates.isNew = Boolean(input.isNew);
  }

  if ("isFeatured" in input) {
    updates.isFeatured = Boolean(input.isFeatured);
  }

  return updates;
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
export async function createProduct(product: Partial<Product>): Promise<Product> {
  const normalizedProduct = normalizeProductInput(product);
  const newProduct: Product = {
    ...normalizedProduct,
    id: `${slugify(normalizedProduct.name) || "product"}-${Date.now()}`,
  };

  if (isMongoConfigured()) {
    await ensureSeedData();
    const collection = await getProductsCollection();
    await collection.insertOne(newProduct);
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
  const normalizedUpdates = normalizeProductUpdates(updates);

  if (isMongoConfigured()) {
    await ensureSeedData();
    const collection = await getProductsCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: normalizedUpdates },
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
    products[index] = { ...products[index], ...normalizedUpdates, id };
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


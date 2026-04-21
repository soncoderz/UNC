import { createHash } from "crypto";
import { existsSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";
import { MongoClient } from "mongodb";
import type { UploadApiOptions, UploadApiResponse } from "cloudinary";
import productsSeedJson from "../data/products.json";
import type { Product, User } from "../types";

type ProductSeedMode = "replace" | "upsert";

type CloudinaryClient = {
  uploader: {
    upload: (file: string, options?: UploadApiOptions) => Promise<UploadApiResponse>;
  };
};

const productsSeed = productsSeedJson as unknown as Product[];

function loadEnvFiles() {
  [".env.local", ".env", "../.env.local", "../.env"].forEach((fileName) => {
    const envPath = resolve(process.cwd(), fileName);

    if (existsSync(envPath)) {
      config({ path: envPath, override: false });
    }
  });
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function getSeedMode(): ProductSeedMode {
  const mode = process.env.SEED_PRODUCTS_MODE || "replace";

  if (mode !== "replace" && mode !== "upsert") {
    throw new Error("SEED_PRODUCTS_MODE must be replace or upsert.");
  }

  return mode;
}

function resolveLocalProductImage(image: string): string | null {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return null;
  }

  const publicRoot = process.env.FRONTEND_UNICONVTOR_PUBLIC_DIR
    ? resolve(process.env.FRONTEND_UNICONVTOR_PUBLIC_DIR)
    : resolve(process.cwd(), "..", "frontend", "public", "uniconvtor");
  const normalizedPath = image.replace(/^\/uniconvtor\//, "").replace(/^\//, "");

  return resolve(publicRoot, normalizedPath);
}

async function uploadProductImage(
  product: Product,
  image: string,
  cloudinary: CloudinaryClient,
  folder: string,
  publicId: string
): Promise<string> {
  const imagePath = resolveLocalProductImage(image);

  if (!imagePath) {
    return image;
  }

  if (!existsSync(imagePath)) {
    throw new Error(`Missing product image for ${product.id}: ${imagePath}`);
  }

  const result = await cloudinary.uploader.upload(imagePath, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    transformation: [
      { width: 1200, height: 1200, crop: "limit" },
      { quality: "auto:good" },
    ],
  });

  return result.secure_url;
}

async function buildProductsForDatabase(): Promise<Product[]> {
  const shouldUploadImages = process.env.SEED_UPLOAD_IMAGES !== "false";

  if (!shouldUploadImages) {
    console.log("Skipping Cloudinary upload because SEED_UPLOAD_IMAGES=false.");
    return productsSeed;
  }

  const cloudinaryModule = await import("../lib/cloudinary");

  if (!cloudinaryModule.isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET, or run with SEED_UPLOAD_IMAGES=false."
    );
  }

  const folder = process.env.SEED_CLOUDINARY_FOLDER || "unc/products";
  const products: Product[] = [];

  for (const product of productsSeed) {
    console.log(`Uploading product image: ${product.id}`);
    const uploadedGallery = product.gallery
      ? await Promise.all(
          product.gallery.map((image, index) =>
            uploadProductImage(
              product,
              image,
              cloudinaryModule.default,
              folder,
              `${product.id}-gallery-${index + 1}`
            )
          )
        )
      : undefined;

    products.push({
      ...product,
      image: await uploadProductImage(
        product,
        product.image,
        cloudinaryModule.default,
        folder,
        product.id
      ),
      ...(uploadedGallery ? { gallery: uploadedGallery } : {}),
    });
  }

  return products;
}

async function main() {
  loadEnvFiles();

  const uri = requireEnv("MONGODB_URI");
  const dbName = process.env.MONGODB_DB || "solartech_energy";
  const seedMode = getSeedMode();
  const products = await buildProductsForDatabase();
  const shouldSeedAdmin = process.env.SEED_ADMIN !== "false";

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@unc.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin123";
  const adminName = process.env.SEED_ADMIN_NAME || "Admin UNC";
  const adminId = process.env.SEED_ADMIN_ID || "admin-001";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const productCollection = db.collection<Product>("products");
    const userCollection = db.collection<User>("users");

    await Promise.all([
      productCollection.createIndex({ id: 1 }, { unique: true }),
      productCollection.createIndex({ category: 1 }),
      userCollection.createIndex({ id: 1 }, { unique: true }),
      userCollection.createIndex({ email: 1 }, { unique: true }),
    ]);

    let seededAdminEmail: string | null = null;

    if (shouldSeedAdmin) {
      const existingAdmin = await userCollection.findOne({ email: adminEmail });
      const admin: User = {
        id: existingAdmin?.id || adminId,
        email: adminEmail,
        password: hashPassword(adminPassword),
        name: adminName,
        role: "admin",
        createdAt: existingAdmin?.createdAt || new Date().toISOString(),
      };

      await userCollection.updateOne(
        { email: admin.email },
        {
          $set: {
            password: admin.password,
            name: admin.name,
            role: admin.role,
          },
          $setOnInsert: {
            id: admin.id,
            email: admin.email,
            createdAt: admin.createdAt,
          },
        },
        { upsert: true }
      );

      seededAdminEmail = admin.email;
    }

    if (seedMode === "replace") {
      await productCollection.deleteMany({
        id: { $nin: products.map((product) => product.id) },
      });
    }

    if (products.length > 0) {
      await productCollection.bulkWrite(
        products.map((product) => ({
          replaceOne: {
            filter: { id: product.id },
            replacement: product,
            upsert: true,
          },
        }))
      );
    }

    console.log(
      seededAdminEmail
        ? `Seeded admin: ${seededAdminEmail}`
        : "Skipped admin seed because SEED_ADMIN=false."
    );
    console.log(`Seeded products: ${products.length} (${seedMode} mode)`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

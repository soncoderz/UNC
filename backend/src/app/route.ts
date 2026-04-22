import { NextResponse } from "next/server";

/**
 * GET /api
 * Root API endpoint - Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 200,
    message: "SolarTech Energy API is running",
    version: "1.0.0",
    database: process.env.MONGODB_URI ? "mongodb" : "json-fallback",
    endpoints: {
      products: "/api/products",
      productDetail: "/api/products/:id",
      news: "/api/news",
      newsDetail: "/api/news/:id",
      company: "/api/company",
      contact: "/api/contact (POST)",
    },
    timestamp: new Date().toISOString(),
  });
}

import { NextResponse, type NextRequest } from "next/server";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/productService";
import { formatError, formatResponse } from "@/utils/helpers";
import type { Product } from "@/types";

/**
 * GET /api/products
 * Query params: category, featured, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    let products: Product[];

    if (search) {
      products = await searchProducts(search);
    } else if (category) {
      products = await getProductsByCategory(category);
    } else if (featured === "true") {
      products = await getFeaturedProducts();
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json(formatResponse(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(formatError("Failed to fetch products"), { status: 500 });
  }
}

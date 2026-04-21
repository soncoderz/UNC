import { NextResponse, type NextRequest } from "next/server";
import { connectDatabase } from "@/lib/dbConnection";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import { verifyToken } from "@/services/authService";
import { formatError, formatResponse } from "@/utils/helpers";
import type { Product } from "@/types";

/**
 * Admin auth helper
 */
function getAdminFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") return null;
  return decoded;
}

/**
 * GET /api/products
 * Query params: category, featured, search
 */
export async function GET(request: NextRequest) {
  try {
    await connectDatabase();
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

/**
 * POST /api/products - Create product (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json(formatError("Unauthorized - Admin access required", 403), { status: 403 });
    }

    const body = await request.json();
    const product = await createProduct(body);
    return NextResponse.json(formatResponse(product, "Product created"), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      formatError(error instanceof Error ? error.message : "Failed to create product"),
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products - Update product (admin only)
 * Body must include { id, ...updates }
 */
export async function PUT(request: NextRequest) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json(formatError("Unauthorized - Admin access required", 403), { status: 403 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(formatError("Product ID is required", 400), { status: 400 });
    }

    const product = await updateProduct(id, updates);
    if (!product) {
      return NextResponse.json(formatError("Product not found", 404), { status: 404 });
    }

    return NextResponse.json(formatResponse(product, "Product updated"), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      formatError(error instanceof Error ? error.message : "Failed to update product"),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products - Delete product (admin only)
 * Body: { id }
 */
export async function DELETE(request: NextRequest) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json(formatError("Unauthorized - Admin access required", 403), { status: 403 });
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(formatError("Product ID is required", 400), { status: 400 });
    }

    const deleted = await deleteProduct(body.id);
    if (!deleted) {
      return NextResponse.json(formatError("Product not found", 404), { status: 404 });
    }

    return NextResponse.json(formatResponse(null, "Product deleted"), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(formatError("Failed to delete product"), { status: 500 });
  }
}

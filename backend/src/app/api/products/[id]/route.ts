import { NextResponse, type NextRequest } from "next/server";
import { getProductById } from "@/services/productService";
import { formatError, formatResponse } from "@/utils/helpers";

type ProductRouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/products/[id]
 * Lấy chi tiết sản phẩm theo ID
 */
export async function GET(_request: NextRequest, { params }: ProductRouteContext) {
  try {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json(formatError("Product not found", 404), { status: 404 });
    }

    return NextResponse.json(formatResponse(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(formatError("Failed to fetch product"), { status: 500 });
  }
}

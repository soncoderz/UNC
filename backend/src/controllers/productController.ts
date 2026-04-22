import { NextRequest, NextResponse } from "next/server";
import * as productService from "@/services/productService";
import type { ApiResponse, Product } from "@/types";

/**
 * Product Controller - Xử lý HTTP requests cho products
 */

// GET /api/products - Lấy tất cả sản phẩm hoặc tìm kiếm
export async function getProducts(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let products: Product[];

    if (query) {
      products = await productService.searchProducts(query);
    } else if (category) {
      products = await productService.getProductsByCategory(category);
    } else if (featured === "true") {
      products = await productService.getFeaturedProducts();
    } else {
      products = await productService.getAllProducts();
    }

    const response: ApiResponse<Product[]> = {
      status: 200,
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: "Lỗi server khi lấy danh sách sản phẩm",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/products - Tạo sản phẩm mới
export async function createProduct(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await productService.createProduct(body);

    const response: ApiResponse<Product> = {
      status: 201,
      message: "Tạo sản phẩm thành công",
      data: product,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: error instanceof Error ? error.message : "Lỗi server khi tạo sản phẩm",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

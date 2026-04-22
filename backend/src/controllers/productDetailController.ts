import { NextRequest, NextResponse } from "next/server";
import * as productService from "@/services/productService";
import type { ApiResponse, Product } from "@/types";

/**
 * Product Detail Controller - Xử lý HTTP requests cho product detail
 */

// GET /api/products/:id - Lấy sản phẩm theo ID
export async function getProductById(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await productService.getProductById(params.id);

    if (!product) {
      const response: ApiResponse<null> = {
        status: 404,
        message: "Không tìm thấy sản phẩm",
        data: null,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      status: 200,
      message: "Lấy thông tin sản phẩm thành công",
      data: product,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: "Lỗi server khi lấy thông tin sản phẩm",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// PUT /api/products/:id - Cập nhật sản phẩm
export async function updateProduct(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const product = await productService.updateProduct(params.id, body);

    if (!product) {
      const response: ApiResponse<null> = {
        status: 404,
        message: "Không tìm thấy sản phẩm",
        data: null,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      status: 200,
      message: "Cập nhật sản phẩm thành công",
      data: product,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: error instanceof Error ? error.message : "Lỗi server khi cập nhật sản phẩm",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/products/:id - Xóa sản phẩm
export async function deleteProduct(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await productService.deleteProduct(params.id);

    if (!success) {
      const response: ApiResponse<null> = {
        status: 404,
        message: "Không tìm thấy sản phẩm",
        data: null,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<{ id: string }> = {
      status: 200,
      message: "Xóa sản phẩm thành công",
      data: { id: params.id },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: "Lỗi server khi xóa sản phẩm",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

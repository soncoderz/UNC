import { NextRequest, NextResponse } from "next/server";
import { uploadImage, uploadMultipleImages } from "@/services/uploadService";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import type { ApiResponse } from "@/types";

/**
 * Upload Controller - Xử lý HTTP requests cho upload
 */

// GET /api/upload - Kiểm tra trạng thái cấu hình Cloudinary
export async function checkCloudinaryStatus(request: NextRequest) {
  const configured = isCloudinaryConfigured();
  
  const response: ApiResponse<{ configured: boolean }> = {
    status: 200,
    message: configured 
      ? "Cloudinary đã được cấu hình" 
      : "Cloudinary chưa được cấu hình",
    data: { configured },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 200 });
}

// POST /api/upload - Upload ảnh lên Cloudinary
export async function uploadImages(request: NextRequest) {
  try {
    if (!isCloudinaryConfigured()) {
      const response: ApiResponse<null> = {
        status: 500,
        message: "Cloudinary chưa được cấu hình. Vui lòng kiểm tra biến môi trường.",
        data: null,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 500 });
    }

    const body = await request.json();
    const { file, files, folder = "solartech" } = body;

    // Upload nhiều ảnh
    if (files && Array.isArray(files)) {
      const results = await uploadMultipleImages(files, folder);
      
      const response: ApiResponse<typeof results> = {
        status: 200,
        message: "Upload ảnh thành công",
        data: results,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 200 });
    }

    // Upload một ảnh
    if (file) {
      const result = await uploadImage(file, folder);
      
      const response: ApiResponse<typeof result> = {
        status: 200,
        message: "Upload ảnh thành công",
        data: result,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 200 });
    }

    const response: ApiResponse<null> = {
      status: 400,
      message: "Vui lòng cung cấp file hoặc files để upload",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 400 });
  } catch (error) {
    console.error("Lỗi upload:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: error instanceof Error ? error.message : "Lỗi khi upload ảnh",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

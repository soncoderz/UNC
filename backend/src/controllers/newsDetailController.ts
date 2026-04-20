import { NextRequest, NextResponse } from "next/server";
import * as newsService from "@/services/newsService";
import type { ApiResponse, NewsArticle } from "@/types";

/**
 * News Detail Controller - Xử lý HTTP requests cho news detail
 */

// GET /api/news/:id - Lấy tin tức theo ID
export async function getNewsById(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await newsService.getNewsById(params.id);

    if (!news) {
      const response: ApiResponse<null> = {
        status: 404,
        message: "Không tìm thấy tin tức",
        data: null,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<NewsArticle> = {
      status: 200,
      message: "Lấy thông tin tin tức thành công",
      data: news,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin tin tức:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: "Lỗi server khi lấy thông tin tin tức",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import * as newsService from "@/services/newsService";
import type { ApiResponse, NewsArticle } from "@/types";

/**
 * News Controller - Xử lý HTTP requests cho news
 */

// GET /api/news - Lấy tất cả tin tức
export async function getAllNews(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let news: NewsArticle[];

    if (featured === "true") {
      news = await newsService.getFeaturedNews();
    } else {
      news = await newsService.getAllNews();
    }

    const response: ApiResponse<NewsArticle[]> = {
      status: 200,
      message: "Lấy danh sách tin tức thành công",
      data: news,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tin tức:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: "Lỗi server khi lấy danh sách tin tức",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}

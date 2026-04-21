import { NextResponse, type NextRequest } from "next/server";
import { connectDatabase } from "@/lib/dbConnection";
import { getAllNews, getFeaturedNews } from "@/services/newsService";
import { formatError, formatResponse } from "@/utils/helpers";
import type { NewsArticle } from "@/types";

// Kết nối database khi khởi động được thực hiện trong mỗi handler

/**
 * GET /api/news
 * Query params: featured
 */
export async function GET(request: NextRequest) {
  try {
    await connectDatabase();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let news: NewsArticle[];

    if (featured === "true") {
      news = await getFeaturedNews();
    } else {
      news = await getAllNews();
    }

    return NextResponse.json(formatResponse(news), { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(formatError("Failed to fetch news"), { status: 500 });
  }
}

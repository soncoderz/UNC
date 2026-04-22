import { NextResponse, type NextRequest } from "next/server";
import { getNewsById, getNewsBySlug } from "@/services/newsService";
import { formatError, formatResponse } from "@/utils/helpers";

type NewsRouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/news/[id]
 * Lấy chi tiết tin tức theo ID hoặc slug
 */
export async function GET(_request: NextRequest, { params }: NewsRouteContext) {
  try {
    const { id } = await params;

    // Thử tìm theo ID trước, rồi theo slug
    let newsItem = await getNewsById(id);
    if (!newsItem) {
      newsItem = await getNewsBySlug(id);
    }

    if (!newsItem) {
      return NextResponse.json(formatError("News article not found", 404), { status: 404 });
    }

    return NextResponse.json(formatResponse(newsItem), { status: 200 });
  } catch (error) {
    console.error("Error fetching news article:", error);
    return NextResponse.json(formatError("Failed to fetch news article"), { status: 500 });
  }
}

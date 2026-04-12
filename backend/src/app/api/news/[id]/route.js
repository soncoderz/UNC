import { NextResponse } from 'next/server';
import { getNewsById, getNewsBySlug } from '@/services/newsService';
import { formatResponse, formatError } from '@/utils/helpers';

/**
 * GET /api/news/[id]
 * Lấy chi tiết tin tức theo ID hoặc slug
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Thử tìm theo ID trước, rồi theo slug
    let newsItem = getNewsById(id);
    if (!newsItem) {
      newsItem = getNewsBySlug(id);
    }

    if (!newsItem) {
      return NextResponse.json(formatError('News article not found', 404), { status: 404 });
    }

    return NextResponse.json(formatResponse(newsItem), { status: 200 });
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json(formatError('Failed to fetch news article'), { status: 500 });
  }
}

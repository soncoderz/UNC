import { NextResponse } from 'next/server';
import { getAllNews, getFeaturedNews } from '@/services/newsService';
import { formatResponse, formatError } from '@/utils/helpers';

/**
 * GET /api/news
 * Query params: featured
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let news;

    if (featured === 'true') {
      news = getFeaturedNews();
    } else {
      news = getAllNews();
    }

    return NextResponse.json(formatResponse(news), { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(formatError('Failed to fetch news'), { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getProductById } from '@/services/productService';
import { formatResponse, formatError } from '@/utils/helpers';

/**
 * GET /api/products/[id]
 * Lấy chi tiết sản phẩm theo ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(formatError('Product not found', 404), { status: 404 });
    }

    return NextResponse.json(formatResponse(product), { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(formatError('Failed to fetch product'), { status: 500 });
  }
}

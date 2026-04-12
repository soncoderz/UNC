import { NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory, getFeaturedProducts, searchProducts } from '@/services/productService';
import { formatResponse, formatError } from '@/utils/helpers';

/**
 * GET /api/products
 * Query params: category, featured, search
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    let products;

    if (search) {
      products = searchProducts(search);
    } else if (category) {
      products = getProductsByCategory(category);
    } else if (featured === 'true') {
      products = getFeaturedProducts();
    } else {
      products = getAllProducts();
    }

    return NextResponse.json(formatResponse(products), { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(formatError('Failed to fetch products'), { status: 500 });
  }
}

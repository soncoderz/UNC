import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Product Service - Business logic for product operations
 */

// Đọc dữ liệu sản phẩm từ file JSON
function getProductsData() {
  const filePath = join(process.cwd(), 'src', 'data', 'products.json');
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Lấy tất cả sản phẩm
export function getAllProducts() {
  return getProductsData();
}

// Lấy sản phẩm theo ID
export function getProductById(id) {
  const products = getProductsData();
  return products.find((product) => product.id === id) || null;
}

// Lấy sản phẩm theo danh mục
export function getProductsByCategory(category) {
  const products = getProductsData();
  return products.filter((product) => product.category === category);
}

// Lấy sản phẩm nổi bật
export function getFeaturedProducts() {
  const products = getProductsData();
  return products.filter((product) => product.isFeatured);
}

// Tìm kiếm sản phẩm
export function searchProducts(query) {
  const products = getProductsData();
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
}

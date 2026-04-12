/**
 * API Service - Cấu hình giao tiếp với backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Fetcher function cho API calls
 */
async function fetcher(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

// ========== Products API ==========
export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const query = searchParams ? `?${searchParams}` : "";
  return fetcher(`/api/products${query}`);
}

export async function getProductById(id) {
  return fetcher(`/api/products/${id}`);
}

export async function getFeaturedProducts() {
  return fetcher("/api/products?featured=true");
}

// ========== News API ==========
export async function getNews(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const query = searchParams ? `?${searchParams}` : "";
  return fetcher(`/api/news${query}`);
}

export async function getNewsById(id) {
  return fetcher(`/api/news/${id}`);
}

// ========== Company API ==========
export async function getCompanyInfo() {
  return fetcher("/api/company");
}

// ========== Contact API ==========
export async function submitContact(data) {
  return fetcher("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getNews,
  getNewsById,
  getCompanyInfo,
  submitContact,
};

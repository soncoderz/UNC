import type {
  ApiResponse,
  CompanyInfo,
  ContactFormData,
  ContactSubmission,
  NewsArticle,
  Product,
} from "@/types/api";

/**
 * API Service - Cấu hình giao tiếp với backend
 */

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function buildQuery(params: QueryParams = {}): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/**
 * Fetcher function cho API calls
 */
async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as Partial<ApiResponse<null>>;
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
}

// ========== Products API ==========
export async function getProducts(params: QueryParams = {}) {
  return fetcher<Product[]>(`/api/products${buildQuery(params)}`);
}

export async function getProductById(id: string) {
  return fetcher<Product>(`/api/products/${id}`);
}

export async function getFeaturedProducts() {
  return fetcher<Product[]>("/api/products?featured=true");
}

// ========== News API ==========
export async function getNews(params: QueryParams = {}) {
  return fetcher<NewsArticle[]>(`/api/news${buildQuery(params)}`);
}

export async function getNewsById(id: string) {
  return fetcher<NewsArticle>(`/api/news/${id}`);
}

// ========== Company API ==========
export async function getCompanyInfo() {
  return fetcher<CompanyInfo>("/api/company");
}

// ========== Contact API ==========
export async function submitContact(data: ContactFormData) {
  return fetcher<ContactSubmission>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

const api = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getNews,
  getNewsById,
  getCompanyInfo,
  submitContact,
};

export default api;

import type {
  ApiResponse,
  AuthResponse,
  CompanyInfo,
  ContactFormData,
  ContactSubmission,
  NewsArticle,
  Product,
  SafeUser,
} from "@/types/api";

/**
 * API Service - Cấu hình giao tiếp với backend
 */

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

  let response: Response;

  try {
    response = await fetch(url, config);
  } catch {
    throw new Error(
      `Cannot connect to API server at ${API_BASE_URL}. Make sure the backend is running on port 5000.`
    );
  }

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

// ========== Auth API ==========
export async function loginUser(email: string, password: string) {
  return fetcher<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(email: string, password: string, name: string) {
  return fetcher<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function getCurrentUser(token: string) {
  return fetcher<SafeUser>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ========== Admin Product CRUD ==========
function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function createProductAdmin(token: string, product: Record<string, unknown>) {
  return fetcher<Product>("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: authHeaders(token),
  });
}

export async function updateProductAdmin(token: string, id: string, updates: Record<string, unknown>) {
  return fetcher<Product>("/api/products", {
    method: "PUT",
    body: JSON.stringify({ id, ...updates }),
    headers: authHeaders(token),
  });
}

export async function deleteProductAdmin(token: string, id: string) {
  return fetcher<null>("/api/products", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: authHeaders(token),
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
  loginUser,
  registerUser,
  getCurrentUser,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
};

export default api;

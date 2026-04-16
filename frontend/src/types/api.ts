export type ProductCategory = "pv-inverters" | "energy-storage" | "hybrid-inverters";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  power: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
  price: number | null;
  isNew: boolean;
  isFeatured: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  isFeatured: boolean;
}

export interface CompanyInfo {
  id: string;
  name: string;
  slogan: string;
  description: string;
  founded: number;
  headquarters: string;
  employees: string;
  globalPresence: string;
  totalCapacity: string;
  certifications: string[];
  values: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  socialMedia: Record<string, string>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  createdAt: string;
  status: "pending" | "handled";
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

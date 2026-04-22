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
  gallery?: string[];
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

export interface CompanyValue {
  title: string;
  description: string;
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
  values: CompanyValue[];
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  socialMedia: Record<string, string>;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactSubmission extends Required<ContactInput> {
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

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type SafeUser = Omit<User, "password">;

export interface AuthResponse {
  user: SafeUser;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

import type { ApiResponse } from "@/types";

// Format response thống nhất
export function formatResponse<T>(
  data: T,
  message = "Success",
  status = 200
): ApiResponse<T> {
  return {
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

// Format error response
export function formatError(message = "Internal Server Error", status = 500): ApiResponse<null> {
  return {
    status,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  };
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Slugify string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

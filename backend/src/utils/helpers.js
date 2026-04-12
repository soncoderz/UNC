/**
 * Utility helper functions
 */

// Format response thống nhất
export function formatResponse(data, message = 'Success', status = 200) {
  return {
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

// Format error response
export function formatError(message = 'Internal Server Error', status = 500) {
  return {
    status,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  };
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Slugify string
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

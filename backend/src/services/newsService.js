import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * News Service - Business logic for news operations
 */

function getNewsData() {
  const filePath = join(process.cwd(), 'src', 'data', 'news.json');
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function getAllNews() {
  return getNewsData();
}

export function getNewsById(id) {
  const news = getNewsData();
  return news.find((item) => item.id === id) || null;
}

export function getNewsBySlug(slug) {
  const news = getNewsData();
  return news.find((item) => item.slug === slug) || null;
}

export function getFeaturedNews() {
  const news = getNewsData();
  return news.filter((item) => item.isFeatured);
}

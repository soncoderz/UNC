"use client";

import { PRODUCT_CATEGORIES } from "@/constants/navigation";

/**
 * ProductFilter - Bộ lọc danh mục sản phẩm
 */
export default function ProductFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          !activeCategory
            ? "bg-primary text-white shadow-lg shadow-primary/25"
            : "bg-white text-gray border border-gray-light hover:border-primary hover:text-primary"
        }`}
      >
        All Products
      </button>

      {PRODUCT_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            activeCategory === category.id
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-white text-gray border border-gray-light hover:border-primary hover:text-primary"
          }`}
        >
          <span>{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}

"use client";

import { PRODUCT_CATEGORIES } from "@/constants/navigation";
import type { ProductCategory } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

interface ProductFilterProps {
  activeCategory: ProductCategory | null;
  onCategoryChange: (category: ProductCategory | null) => void;
}

/**
 * ProductFilter - Bộ lọc danh mục sản phẩm
 */
export default function ProductFilter({
  activeCategory,
  onCategoryChange,
}: ProductFilterProps) {
  const { t } = useLanguage();
  const categoryLabels: Record<ProductCategory, string> = {
    "pv-inverters": t("products.pvInverters"),
    "energy-storage": t("products.energyStorage"),
    "hybrid-inverters": t("products.hybridInverters"),
  };

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
        {t("products.allProducts")}
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
          {categoryLabels[category.id]}
        </button>
      ))}
    </div>
  );
}

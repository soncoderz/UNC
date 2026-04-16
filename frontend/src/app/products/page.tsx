"use client";

import { Suspense, useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/constants/navigation";
import { getProducts } from "@/services/api";
import type { Product, ProductCategory } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

function isProductCategory(value: string | null): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category.id === value);
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  useEffect(() => {
    const category = searchParams.get("category");
    setActiveCategory(isProductCategory(category) ? category : null);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await getProducts(activeCategory ? { category: activeCategory } : {});
        setProducts(response.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            {t("products.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter + Products */}
      <section className="py-12 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="mb-10">
            <ProductFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray">{t("products.loading")}</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray text-lg">
                {t("products.noProducts")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <Suspense
      fallback={
        <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray">{t("products.loading")}</p>
          </div>
        </section>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

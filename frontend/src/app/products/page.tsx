"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCT_CATEGORIES } from "@/constants/navigation";
import { cloneProducts, innerBanners, productNav } from "@/data/uniconvtor";
import { getProducts } from "@/services/api";
import type { Product, ProductCategory } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

function isProductCategory(value: string | null): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category.id === value);
}

function hasCloneImages(products: Product[]) {
  return products.every((product) => product.image.startsWith("/static/upload/"));
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>(cloneProducts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    setActiveCategory(isProductCategory(category) ? category : null);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await getProducts(activeCategory ? { category: activeCategory } : {});
        const apiProducts = response.data || [];
        setProducts(apiProducts.length > 0 && hasCloneImages(apiProducts) ? apiProducts : cloneProducts);
      } catch {
        setProducts(cloneProducts);
      } finally {
        setLoading(false);
      }
    }

    void fetchProducts();
  }, [activeCategory]);

  const visibleProducts = useMemo(
    () =>
      activeCategory
        ? products.filter((product) => product.category === activeCategory)
        : products,
    [activeCategory, products]
  );

  return (
    <>
      <InnerHero
        title="Product Center"
        subtitle="Safe, reliable, efficient, one-stop energy solution"
        image={innerBanners.products}
      />
      <InnerNav
        items={productNav}
        activeHref={
          activeCategory ? `/products?category=${activeCategory}` : undefined
        }
      />

      <section className="clone-product-list">
        {loading ? (
          <div className="clone-loading">Loading products...</div>
        ) : (
          <div className="clone-product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
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
          <p className="text-gray">{t("products.loading")}</p>
        </section>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

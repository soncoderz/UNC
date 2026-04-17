"use client";

import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/common/Button";
import type { Product } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import FadeIn from "@/components/animations/FadeIn";

interface FeaturedProductsProps {
  products?: Product[];
}

/**
 * FeaturedProducts - Sản phẩm nổi bật trên trang chủ
 */
export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SlideIn direction="up" distance={30} className="text-center mb-16">
          <h2 className="section-title">{t("products.title")}</h2>
          <p className="section-subtitle">
            {t("products.subtitle")}
          </p>
        </SlideIn>

        {/* Products Grid */}
        {products.length > 0 ? (
          <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray">{t("products.loading")}</p>
          </div>
        )}

        {/* CTA */}
        <FadeIn delay={0.2} className="text-center">
          <Button href="/products" variant="primary" size="lg">
            {t("products.allProducts")}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

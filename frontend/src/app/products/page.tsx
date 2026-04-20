"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import ProductCard from "@/components/products/ProductCard";
import BigMessageForm from "@/components/uniconvtor/BigMessageForm";
import { PRODUCT_CATEGORIES } from "@/constants/navigation";
import { cloneProducts, innerBanners, innerMobileBanners, productNav } from "@/data/uniconvtor";
import { getProducts } from "@/services/api";
import type { Product, ProductCategory } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

const PRODUCTS_PER_PAGE = 12;

function isProductCategory(value: string | null): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category.id === value);
}

function hasCloneImages(products: Product[]) {
  return products.every((product) => product.image.startsWith("/static/upload/"));
}

function ProductsContent() {
  const { t } = useLanguage();
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

  const requestedPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE));
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(Math.trunc(requestedPage), totalPages)
      : 1;
  const pagedProducts = visibleProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  function buildPageHref(page: number) {
    const params = new URLSearchParams();

    if (activeCategory) {
      params.set("category", activeCategory);
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  }

  return (
    <>
      <InnerHero
        title={t("nav.productsCenter")}
        subtitle={t("home.recommendedSubtitle")}
        image={innerBanners.products}
        mobileImage={innerMobileBanners.products}
      />
      <InnerNav
        items={productNav}
        activeHref={
          activeCategory ? `/products?category=${activeCategory}` : undefined
        }
      />

      <section className="clone-product-list">
        {loading ? (
          <div className="clone-loading">{t("products.loading")}</div>
        ) : visibleProducts.length === 0 ? (
          <div className="clone-loading">{t("products.noProducts")}</div>
        ) : (
          <>
            <div className="clone-product-grid">
              {pagedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 ? (
              <nav className="clone-pages-nav-box" aria-label="Product pagination">
                <Link href={buildPageHref(1)} className="clone-pages-nav-home">
                  Home
                </Link>
                <Link
                  href={buildPageHref(Math.max(1, currentPage - 1))}
                  className={`clone-pages-nav-small ${
                    currentPage === 1 ? "is-disabled" : ""
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  &lt;
                </Link>
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <Link
                      key={page}
                      href={buildPageHref(page)}
                      className={`clone-page-num ${
                        page === currentPage ? "is-current" : ""
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}
                <Link
                  href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                  className={`clone-pages-nav-small ${
                    currentPage === totalPages ? "is-disabled" : ""
                  }`}
                  aria-disabled={currentPage === totalPages}
                >
                  &gt;
                </Link>
                <Link href={buildPageHref(totalPages)} className="clone-pages-nav-home">
                  End
                </Link>
              </nav>
            ) : null}
          </>
        )}
      </section>

      <BigMessageForm />
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

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductSpecs from "@/components/products/ProductSpecs";
import Button from "@/components/common/Button";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneProducts, innerBanners } from "@/data/uniconvtor";
import { getProductById } from "@/services/api";
import type { Product } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(
    cloneProducts.find((item) => item.id === params.id) || null
  );
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchProduct() {
      const fallback = cloneProducts.find((item) => item.id === params.id) || null;

      try {
        setLoading(true);
        const response = await getProductById(params.id);
        const apiProduct = response.data || null;
        setProduct(
          apiProduct?.image.startsWith("/static/upload/") ? apiProduct : fallback
        );
      } catch {
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    }

    void fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <p className="text-gray">{t("products.loading")}</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-dark mb-4">
            {t("products.detailNotFound")}
          </h1>
          <Button href="/products" variant="primary">
            {t("products.backToProducts")}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="clone-product-detail-hero">
        <RemoteImage
          src={innerBanners.products}
          alt="Product Center"
          fill
          priority
          sizes="100vw"
        />
        <div>
          <Button href="/products" variant="ghost" className="text-white/80 hover:text-white">
            &lt;- {t("products.backToProducts")}
          </Button>
          <h1>{product.name}</h1>
          <p>{product.subcategory}</p>
        </div>
      </section>

      <section className="clone-product-detail">
        <div className="clone-product-detail-image">
          <RemoteImage
            src={product.image}
            alt={product.name}
            width={560}
            height={460}
            sizes="(max-width: 900px) 90vw, 560px"
          />
        </div>

        <div className="clone-product-detail-copy">
          <span className="clone-product-power">{product.power}</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <ul>
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="clone-product-actions">
            <Button href="/contact" variant="primary" size="lg">
              {t("products.requestQuote")}
            </Button>
            <Button href="/support#download" variant="outline" size="lg">
              {t("products.downloadDatasheet")}
            </Button>
          </div>
        </div>
      </section>

      <section className="clone-product-specs">
        <ProductSpecs specs={product.specs} />
      </section>
    </>
  );
}

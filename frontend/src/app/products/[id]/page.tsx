"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductSpecs from "@/components/products/ProductSpecs";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { getProductById } from "@/services/api";
import type { Product } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await getProductById(params.id);
        setProduct(response.data || null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    void fetchProduct();
  }, [params.id]);

  const categoryLabels: Record<Product["category"], string> = {
    "pv-inverters": t("products.pvInverters"),
    "energy-storage": t("products.energyStorage"),
    "hybrid-inverters": t("products.hybridInverters"),
  };

  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray">{t("products.loading")}</p>
        </div>
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
      <section className="pt-28 pb-8 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button href="/products" variant="ghost" className="text-white/70 hover:text-white mb-4">
            ← {t("products.backToProducts")}
          </Button>
        </div>
      </section>

      <section className="pb-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl border border-gray-light/50 p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-4 opacity-40">
                  {product.category === "pv-inverters" && "⚡"}
                  {product.category === "energy-storage" && "🔋"}
                  {product.category === "hybrid-inverters" && "🔄"}
                </div>
                <p className="text-sm text-gray">{t("products.productImage")}</p>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isNew && <Badge variant="new">{t("common.new")}</Badge>}
                <Badge variant="primary">{categoryLabels[product.category]}</Badge>
                <Badge variant="default">{product.power}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-gray text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="font-heading font-semibold text-lg text-dark mb-3">
                  {t("products.keyFeatures")}
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">
                        ✓
                      </span>
                      <span className="text-dark-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  {t("products.requestQuote")}
                </Button>
                <Button href="/support" variant="outline" size="lg">
                  {t("products.downloadDatasheet")}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </section>
    </>
  );
}

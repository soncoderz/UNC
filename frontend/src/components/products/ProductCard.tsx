"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import type { Product } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/products/${product.id}`} className="clone-product-card">
      <h3>{product.name}</h3>
      <div className="clone-product-tags">
        {product.subcategory
          .split("|")
          .map((label) => label.trim())
          .filter(Boolean)
          .map((label) => (
            <span key={label}>{label}</span>
          ))}
      </div>
      <span className="clone-product-image">
        <RemoteImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 80vw, 320px"
        />
      </span>
      <span className="clone-product-more">{t("common.more")}</span>
    </Link>
  );
}

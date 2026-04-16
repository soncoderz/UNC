"use client";

import { useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { recommendedProductGroups } from "@/data/uniconvtor";
import { useLanguage } from "@/context/LanguageContext";

export default function RecommendedProducts() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const { t } = useLanguage();

  const activeGroup = recommendedProductGroups[activeGroupIndex];
  const activeProduct = activeGroup.products[activeProductIndex] || activeGroup.products[0];

  function selectGroup(index: number) {
    setActiveGroupIndex(index);
    setActiveProductIndex(0);
  }

  if (!activeProduct) {
    return null;
  }

  return (
    <section className="clone-recommend">
      <div className="clone-recommend-head">
        <div className="clone-title clone-title-left">
          <h2>Recommended Products</h2>
          <p>Safe, reliable, efficient, one-stop energy solution</p>
        </div>

        <div className="clone-recommend-tabs">
          {recommendedProductGroups.map((group, index) => (
            <button
              key={group.title}
              type="button"
              onClick={() => selectGroup(index)}
              className={`clone-recommend-tab ${
                activeGroupIndex === index ? "is-active" : ""
              }`}
            >
              <RemoteImage
                src={activeGroupIndex === index ? group.activeIcon : group.icon}
                alt=""
                width={32}
                height={32}
              />
              <span>{group.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="clone-recommend-body">
        <div className="clone-recommend-copy">
          <h3>{activeProduct.name}</h3>
          <p className="clone-recommend-subtitle">{activeProduct.subcategory}</p>
          <span className="clone-recommend-line" />
          <p>{activeProduct.description}</p>
          <Link href={`/products/${activeProduct.id}`} className="btn-orange">
            {t("common.more")}
          </Link>
        </div>

        <div className="clone-recommend-image">
          <RemoteImage
            src={activeProduct.image}
            alt={activeProduct.name}
            width={520}
            height={420}
            sizes="(max-width: 900px) 80vw, 520px"
          />
        </div>
      </div>

      <div className="clone-recommend-dots">
        {activeGroup.products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            aria-label={product.name}
            onClick={() => setActiveProductIndex(index)}
            className={activeProductIndex === index ? "is-active" : ""}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { recommendedProductGroups } from "@/data/uniconvtor";
import { getProducts } from "@/services/api";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

export default function RecommendedProducts() {
  const { t } = useLanguage();
  const [groups, setGroups] = useState(recommendedProductGroups);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const response = await getProducts({ featured: true });
        const apiProducts = response.data || [];

        if (cancelled || apiProducts.length === 0) {
          return;
        }

        const nextGroups = recommendedProductGroups
          .map((group) => {
            const category = group.products[0]?.category;

            return {
              ...group,
              products: category
                ? apiProducts.filter((product) => product.category === category)
                : group.products,
            };
          })
          .filter((group) => group.products.length > 0);

        if (nextGroups.length > 0) {
          setGroups(nextGroups);
          setActiveGroupIndex(0);
          setActiveProductIndex(0);
        }
      } catch {
        setGroups(recommendedProductGroups);
      }
    }

    void fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeGroup = groups[activeGroupIndex] || groups[0];
  const activeProduct = activeGroup?.products[activeProductIndex] || activeGroup?.products[0];

  function selectGroup(index: number) {
    setActiveGroupIndex(index);
    setActiveProductIndex(0);
  }

  if (!activeProduct) {
    return null;
  }

  return (
    <section className="ind-recommen">
      <div className="ind-recommenTitle main">
        <SlideIn direction="left" distance={40} className="title1">
          <h3 className="text-4xl">{t("home.recommendedProducts")}</h3>
          <h6 className="text-base">{t("home.recommendedSubtitle")}</h6>
        </SlideIn>

        <StaggerContainer staggerChildren={0.1} className="ind-recommenTitleUl">
          {groups.map((group, index) => (
            <li
              key={group.title}
              className={`ind-reTitleLi ${
                activeGroupIndex === index ? "ind-reTitleLiActive" : ""
              }`}
              onMouseEnter={() => selectGroup(index)}
              onClick={() => selectGroup(index)}
            >
              <RemoteImage className="ind-reImgA" src={group.icon} alt="" width={60} height={60} />
              <RemoteImage
                className="ind-reImgB"
                src={group.activeIcon}
                alt=""
                width={60}
                height={60}
              />
              <p className="text-base nameCleanup">
                {group.title === "Photovoltaic System" ? t("products.pvInverters") :
                 group.title === "Industrial and Commercial Energy Storage" ? t("products.energyStorage") :
                 group.title === "Household Energy Storage" ? t("products.hybridInverters") :
                 group.title}
              </p>
            </li>
          ))}
        </StaggerContainer>
      </div>

      <FadeIn delay={0.2} duration={0.6} className="ind-reContent">
        <div className="ind-reContentLi ind-reContentLiActive">
          <div className="swiper-recommen">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="ind-reLeft">
                  <h4 className="text-2xl">{activeProduct.name}</h4>
                  <h6 className="text-base">{activeProduct.subcategory}</h6>
                  <span className="ind-reLine" />
                  <p className="text-base">{activeProduct.description}</p>
                  <Link href={`/products/${activeProduct.id}`} className="btn1 text-base">
                    {t("common.more")}
                  </Link>
                </div>

                <RemoteImage
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  width={500}
                  height={500}
                  sizes="(max-width: 900px) 80vw, 26vw"
                  className="xpz"
                />
              </div>
            </div>

            <div className="swiper-pagination pagination-recommen">
              {activeGroup.products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={product.name}
                  onClick={() => setActiveProductIndex(index)}
                  className={`swiper-pagination-bullet ${
                    activeProductIndex === index ? "swiper-pagination-bullet-active" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

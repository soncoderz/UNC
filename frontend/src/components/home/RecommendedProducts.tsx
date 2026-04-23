"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { recommendedProductGroups } from "@/data/uniconvtor";
import { getProducts } from "@/services/api";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const PRODUCT_ROTATION_INTERVAL = 7600;

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
  const activeProductCount = activeGroup?.products.length || 0;

  useEffect(() => {
    if (activeProductCount <= 1) return;

    const timer = window.setInterval(() => {
      setActiveProductIndex((current) => (current + 1) % activeProductCount);
    }, PRODUCT_ROTATION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [activeGroupIndex, activeProductCount]);

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
            <button
              type="button"
              key={group.title}
              className={`ind-reTitleLi ${
                activeGroupIndex === index ? "ind-reTitleLiActive" : ""
              }`}
              onMouseEnter={() => selectGroup(index)}
              onClick={() => selectGroup(index)}
              aria-pressed={activeGroupIndex === index}
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
            </button>
          ))}
        </StaggerContainer>
      </div>

      <FadeIn delay={0.2} duration={0.6} className="ind-reContent">
        <div className="ind-reContentLi ind-reContentLiActive">
          <div className="swiper-recommen">
            <div className="swiper-wrapper">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeProduct.id}
                  className="swiper-slide"
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="ind-reLeft">
                    <h4 className="text-2xl">{t(`productsData.${activeProduct.id}.name`) !== `productsData.${activeProduct.id}.name` ? t(`productsData.${activeProduct.id}.name`) : activeProduct.name}</h4>
                    <h6 className="text-base">{t(`productsData.${activeProduct.id}.subcategory`) !== `productsData.${activeProduct.id}.subcategory` ? t(`productsData.${activeProduct.id}.subcategory`) : activeProduct.subcategory}</h6>
                    <span className="ind-reLine" />
                    <p className="text-base">{t(`productsData.${activeProduct.id}.description`) !== `productsData.${activeProduct.id}.description` ? t(`productsData.${activeProduct.id}.description`) : activeProduct.description}</p>
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
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="swiper-pagination pagination-recommen">
              {activeGroup.products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={product.name}
                  aria-pressed={activeProductIndex === index}
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

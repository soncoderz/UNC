"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import { homeHeroSlides } from "@/data/uniconvtor";

/**
 * HeroSection - Banner chính trang chủ giống UNC Energy
 * Background xanh dương gradient với 3D cube illustration
 */
export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % homeHeroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="clone-home-hero" id="hero">
      <Link href="/solutions" className="clone-home-hero-slide" aria-label={t("home.solutionsTitle")}>
        <RemoteImage
          src={homeHeroSlides[activeSlide]}
          alt="UNC energy storage and inverter banner"
          fill
          priority
          sizes="100vw"
          className="clone-home-hero-image"
        />
        <div className="clone-home-hero-copy">
          <span>{t("home.globalDesign")}</span>
          <strong>{t("home.powerConverterLeader")}</strong>
          <em>{t("common.more")}</em>
        </div>
      </Link>

      <div className="hero-dots clone-hero-dots">
        {homeHeroSlides.map((slide, index) => (
          <button
            key={slide}
            type="button"
            aria-label={`Go to banner ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`hero-dot ${activeSlide === index ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

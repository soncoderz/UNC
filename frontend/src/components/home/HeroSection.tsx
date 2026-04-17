"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import { homeHeroMobileSlides, homeHeroSlides } from "@/data/uniconvtor";

/**
 * HeroSection - Banner chính trang chủ giống UNC Energy
 * Background xanh dương gradient với 3D cube illustration
 */
export default function HeroSection() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % homeHeroSlides.length);
    }, 7600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="home-banner" id="hero" aria-label={t("home.solutionsTitle")}>
      <div className="swiper-home pc">
        <div className="swiper-wrapper">
          {homeHeroSlides.map((slide, index) => (
            <Link
              key={slide}
              href="/solutions"
              className={`swiper-slide ${activeSlide === index ? "swiper-slide-active" : ""}`}
              aria-label={t("home.solutionsTitle")}
            >
              <RemoteImage
                src={slide}
                alt="UNC energy storage and inverter banner"
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </Link>
          ))}
        </div>
        <div className="swiper-pagination pagination-home pagination-home-home">
          {homeHeroSlides.map((slide, index) => (
            <button
              key={slide}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`swiper-pagination-bullet ${
                activeSlide === index ? "swiper-pagination-bullet-active" : ""
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="swiper-home wap">
        <div className="swiper-wrapper">
          {homeHeroMobileSlides.map((slide, index) => (
            <Link
              key={slide}
              href="/solutions"
              className={`swiper-slide ${activeSlide === index ? "swiper-slide-active" : ""}`}
              aria-label={t("home.solutionsTitle")}
            >
              <RemoteImage
                src={slide}
                alt="UNC energy storage and inverter banner"
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </Link>
          ))}
        </div>
        <div className="swiper-pagination pagination-home pagination-home-home">
          {homeHeroMobileSlides.map((slide, index) => (
            <button
              key={slide}
              type="button"
              aria-label={`Go to mobile slide ${index + 1}`}
              className={`swiper-pagination-bullet ${
                activeSlide === index ? "swiper-pagination-bullet-active" : ""
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

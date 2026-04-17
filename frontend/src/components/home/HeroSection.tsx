"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import { homeHeroSlides } from "@/data/uniconvtor";

/**
 * HeroSection - Banner chính trang chủ giống UNC Energy
 * Background xanh dương gradient với 3D cube illustration
 */
export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="clone-home-hero" id="hero">
      <Link href="/solutions" className="clone-home-hero-slide" aria-label={t("home.solutionsTitle")}>
        <RemoteImage
          src={homeHeroSlides[0]}
          alt="UNC energy storage and inverter banner"
          fill
          priority
          sizes="100vw"
          className="clone-home-hero-image"
        />
      </Link>
    </section>
  );
}

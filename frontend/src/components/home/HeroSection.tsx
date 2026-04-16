"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * HeroSection - Banner chính trang chủ giống UNC Energy
 * Background xanh dương gradient với 3D cube illustration
 */
export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero-section flex items-center" id="hero">
      {/* Light effects */}
      <div className="light-flare light-flare-1" />
      <div className="light-flare light-flare-2" />
      <div className="light-flare light-flare-3" />
      <div className="light-streak light-streak-1" />
      <div className="light-streak light-streak-2" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-white leading-tight mb-6">
              {t("home.globalDesign")}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-md">
              {t("home.powerConverterLeader")}
            </p>
            <Link href="/products" className="btn-orange">
              {t("common.more")}
            </Link>
          </div>

          {/* Right - 3D Cube Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/hero-banner.png"
              alt="UNC Energy - Global Design"
              width={600}
              height={450}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="hero-dots">
        <div className="hero-dot" />
        <div className="hero-dot active" />
        <div className="hero-dot" />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import { homeHeroMobileSlides, homeHeroSlides, homeHeroContent } from "@/data/uniconvtor";

export default function HeroSection() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % homeHeroSlides.length);
    }, 7600);
    return () => window.clearInterval(timer);
  }, []);

  const content = homeHeroContent[activeSlide];
  const isCenter = content.align === "center";

  return (
    <section className="relative w-full h-150 md:h-200 overflow-hidden bg-[#0a64bf] group unc-home-hero" aria-label={t("home.solutionsTitle")}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <RemoteImage
              src={homeHeroSlides[activeSlide]}
              alt={`Hero banner ${activeSlide + 1}`}
              fill
              className="object-cover object-center"
              priority={activeSlide === 0}
              sizes="100vw"
            />
          </div>
          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <RemoteImage
              src={homeHeroMobileSlides[activeSlide]}
              alt={`Hero mobile banner ${activeSlide + 1}`}
              fill
              className="object-cover object-center"
              priority={activeSlide === 0}
              sizes="100vw"
            />
          </div>

          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: isCenter
                ? "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)"
                : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${activeSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className={`absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 ${
            isCenter ? "items-center text-center" : "items-start text-left"
          }`}
        >
          <h1
            className="text-white font-extrabold leading-tight drop-shadow-lg"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              whiteSpace: "pre-line",
            }}
          >
            {t(content.titleKey)}
          </h1>

          <p
            className="mt-4 text-white/90 font-medium drop-shadow"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              maxWidth: "520px",
            }}
          >
            {t(content.subtitleKey)}
          </p>

          <Link
            href="/solutions"
            className="mt-8 inline-flex items-center justify-center px-10 py-3 rounded-full font-bold text-white uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0674fc 0%, #0a8fff 100%)",
              boxShadow: "0 4px 20px rgba(6,116,252,0.5)",
              letterSpacing: "0.15em",
            }}
          >
            {t("common.more")}
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Pagination / Dots */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-30 flex justify-center gap-2 md:gap-3">
        {homeHeroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className="h-1 cursor-pointer rounded-none relative overflow-hidden transition-all duration-300 w-10 sm:w-12 bg-white"
            aria-label={`Go to slide ${index + 1}`}
          >
            {activeSlide === index && (
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-[#0674fc]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7.6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

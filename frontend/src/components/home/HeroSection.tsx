"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { useLanguage } from "@/context/LanguageContext";
import { homeHeroMobileSlides, homeHeroSlides } from "@/data/uniconvtor";

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
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-[#0a64bf] group unc-home-hero" aria-label={t("home.solutionsTitle")}>
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
